---
id: django-nginx-deploy
title: 'Django 项目部署上线：virtualenv、Nginx 与 HTTPS'
excerpt: '从虚拟环境到 Nginx 反向代理，再到 Certbot 一键上 HTTPS——记录我第一次把 Django 项目完整部署到 Debian 服务器的全过程。'
date: '2025-06-07'
readTime: '8 min'
tags: ['后端', '运维']
emoji: '🛠️'
---

这是我第一台云服务器上的实战记录：把 Django 项目从零部署到 Debian，跑通静态资源、反向代理和 HTTPS 全流程。每一步都是当时边查边试踩出来的。

## 虚拟环境与依赖

```bash
sudo apt install python3-virtualenv
virtualenv env
source env/bin/activate
pip install django
```

用 Git 把代码拉到服务器，进入项目目录先跑 python manage.py runserver 0.0.0.0:8000 验证项目本身没问题，再谈部署。

## 静态文件归拢

settings.py 里把 STATIC_ROOT 指向一个 Nginx 有权限读的目录——别放 /root 下，会 403。然后统一收集：

```python
STATIC_URL = "/static/"
STATIC_ROOT = "/home/static/"
```

```bash
python manage.py collectstatic
```

## Nginx 反向代理

删掉 sites-enabled/default，新建自己的配置：静态资源用 alias 直出，动态请求 proxy_pass 给 8000 端口的 Django：

```nginx
server {
    server_name yourdomain.com;

    location /static/ {
        alias /home/static/;
        expires 30d;
        add_header Cache-Control "public";
    }

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

- nginx -t 检查语法，看到 successful 再动手；
- systemctl reload nginx 平滑重载，不断连接；
- ufw allow 80/tcp 和 443/tcp，防火墙别忘了放行。

## HTTPS：Certbot 一把梭

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run
```

Certbot 会自动改 Nginx 配置并处理证书续期。再加一条 301，把 HTTP 全部重定向到 HTTPS，部署就完整了。前提：域名已解析到服务器 IP、80/443 端口已开放。

> 部署，就是把「在我机器上能跑」变成「在谁的机器上都能跑」的第一步。