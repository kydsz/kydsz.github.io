---
id: docker-debian
title: 'Debian 安装 Docker 与日常命令速查'
excerpt: '官方 APT 源安装 Docker Engine 的标准五步走，加上我自己最常用的容器、镜像、网络、卷操作命令，一篇备查。'
date: '2025-06-07'
readTime: '6 min'
tags: ['运维', '工具']
emoji: '🐳'
---

Debian 上别图省事装系统源自带的 docker.io，走官方 APT 源装 docker-ce 才是正路，版本新、更新快。流程五步：清旧版 → 装依赖 → 加 GPG 密钥 → 加软件源 → 安装验证。

## 官方源安装

```bash
# 1. 卸载旧版本（如有）
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. 安装依赖工具
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
```

```bash
# 3. 添加官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```bash
# 4. 设置官方软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
# 5. 安装并验证
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo docker run hello-world
```

## 容器管理

```bash
docker run -d --name my_container -p 8080:80 nginx
docker ps -a          # 所有容器（含已停止）
docker exec -it CONTAINER /bin/bash
docker logs -f CONTAINER   # 实时跟踪日志
```

- -d 后台运行，-p 端口映射（主机:容器），-v 挂载卷，-e 环境变量；
- start / stop / restart 控制生命周期；
- rm 删除已停止容器，rm -f 强删运行中的容器。

## 镜像与清理

```bash
docker pull ubuntu:20.04
docker build -t my_app .
docker image prune     # 清理悬空镜像
docker system prune -a # 大扫除：未使用镜像全删
```

## Compose 与常用场景

```bash
docker-compose up -d
docker-compose down
docker-compose ps
```

- 跑一个 MySQL：docker run -d --name mysql_db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 mysql:8.0；
- 容器内文件备份到宿主机：docker cp CONTAINER:/path /host/path；
- 改完容器配置：stop → rm → 用新参数重新 run。

> docker system prune 是免费的磁盘，也是危险的按钮。