---
id: ansible-kubespray-k8s
title: '用 Ansible + Kubespray 部署 Kubernetes：1 主 2 记录'
excerpt: '三台 Debian 13 云主机、1 主 2 从、containerd 运行时。SSH 认证、ansible-core 版本、内存断言、netaddr 缺失……报错和修法我都记下来了。'
date: '2026-08-25'
readTime: '12 min'
tags: ['云原生', '运维']
emoji: '🚀'
featured: true
---

用 Ansible + Kubespray 把三台 Debian 13 云主机拉成了一个 Kubernetes 集群：1 台 Master、2 台 Node，运行时用 containerd，版本 1.28+。

## 先补一点 Ansible 基础

Ansible 是基于 SSH 的自动化运维工具，目标节点上不用装 agent，只要它能 SSH 上去就能干活。它的做法是把想干的事用 YAML 写成 Playbook，描述成「期望状态」，跑多少遍结果都一样，这就是它幂等的原因。平时一条命令长这样：

```bash
ansible <主机组> -m <模块> -a "<参数>" -i <清单文件> -u <用户名>
```

- `-m` 指定模块：ping、shell、copy、apt、yum 这些；
- `-a` 是模块参数，`-i` 指定 inventory 主机清单文件；
- `-u` 指定用哪个用户登录，`-b` 相当于 sudo 提权。

Kubespray 就是一堆写好的 Playbook：kubeadm、containerd、网络插件、连系统参数调整都给你规划好了。配好 inventory 之后一个 `cluster.yml` 就能把集群拉起来，不用在三台机器上一台一台敲。

## 第一个坑：SSH 直接连不上

第一次跑，连第一个 task 都没走完就红了。报错长这样：

```text
fatal: [master01]: UNREACHABLE! => {
    "changed": false,
    "msg": "Failed to connect to the host via ssh: Permission denied (publickey,password).",
    "unreachable": true
}
```

Permission denied，原因其实很蠢：Ansible 默认拿你本机的用户名去登录目标机器，而服务器上压根没有这个用户。解决办法选一个就行：

- 命令行里显式写 `-u root`；
- 在 inventory 里给每台机器加 `ansible_user=root`。

我是在 inventory 里写的，顺便把控制机到三台机器的 SSH 免密都配好了——反正后面所有 playbook 都靠 SSH 干活，这一步躲不掉。用 `-k` 走密码交互也行，但对长时间跑的 playbook 不太方便，每跑一次都要输一遍。

## 第二个坑：ansible-core 版本不对

SSH 通了，又卡在版本上。Kubespray 对 ansible-core 的版本要求卡得很死，不在要求的区间里，某些 task 就会报一些莫名其妙的错误。别用系统里自带的旧版本，也别图新装最新的，按它的要求把版本钉死在虚拟环境里：

```bash
python -m venv ansible-venv
source ansible-venv/bin/activate
pip install ansible==11.13.0   # 对应 ansible-core 2.18.12
```

装好之后的操作都在这个虚拟环境里进行，也不会跟系统里其它 Python 包打架。

## 配 inventory，开跑

克隆 Kubespray 之后，把 sample 那份 inventory 复制一份改名 mycluster，IP 和分组按实际的改（下面 IP 已脱敏）：

```ini
[all]
master01 ansible_host=203.0.113.11
node01 ansible_host=203.0.113.12
node02 ansible_host=203.0.113.13

[kube_control_plane]
master01

[etcd]
master01

[kube_node]
node01
node02

[k8s_cluster:children]
kube_control_plane
kube_node
```

然后开跑：

```bash
ansible-playbook -i inventory/mycluster/inventory.ini cluster.yml -u root -b -v
```

`-v` 一定加上：不加的话，报错时你只看到一行 `FAILED`，根本不知道死在哪个 task 上；加了至少能看出是哪个角色、哪一步出的问题。

## 第三个坑：内存阈值断言失败

跑到 preinstall 的检查阶段，又红了。这次是被内存阈值断言拦住的：

```text
fatal: [master01]: FAILED! => {"assertion": "ansible_memtotal_mb >= minimal_master_memory_mb", "msg": "Memory minimum is 1700 MB"}
```

Kubespray 默认要求 Master 至少 1700MB、Node 至少 800MB 内存，我的 master 内存不够，直接在断言上被拦下来。阈值在 `group_vars/k8s_cluster/k8s-cluster.yml` 里，默认就是这两个值：

```yaml
minimal_master_memory_mb: 1700
minimal_node_memory_mb: 800
```

哪台机器内存不够就改哪个值。这里有个坑：值必须写纯数字。我第一版手滑写成了 `'1700'`——带引号，紧接着就报：

```text
TypeError: '>=' not supported between instances of 'str' and 'int'
```

YAML 里带引号就是字符串，字符串和整数没法比大小，这一个错又折腾了我十分钟。另外阈值也别调太低：这个断言只是在启动前拦住你，真正跑 kubelet 需要多少内存它管不了，该加还是得加。

顺带记两个在这之后踩到的点：

- netaddr 缺失：控制机上 `pip install netaddr` 就行，Kubespray 算网络段和子网要用它；
- 重试前先清理：所有节点上先 `kubeadm reset -f`，再把 `/etc/kubernetes/` 和 `/root/.kube/` 删干净，不然第二次跑 `cluster.yml` 会死在各种残留状态上，报错五花八门；
- 重跑之前先 `ansible all -m ping` 把所有机器探一遍，连得上再跑，省得跑一半才发现有台机器挂了。

## 验证集群

最后一步：

```bash
kubectl get nodes
kubectl get pods -n kube-system
```

所有节点 Ready、kube-system 下的核心 Pod 全部 Running，集群才算真正起来。到这一步我总算松了口气——回头看，前面那些报错其实每一个都在提示你「哪里不对」，只是第一次看到的时候大多没看懂。

> 别信什么「一键部署」——一键的背后，是一堆要你自己一行一行读的报错。
