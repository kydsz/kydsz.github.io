---
id: "docker"
title: "docker常用命令"
excerpt: "常用的 Docker 命令，涵盖容器、镜像、网络、卷等操作："
date: "2025-06-06"
readTime: "3 min"
tags: ["运维"]
emoji: "🐳"
---
## docker常用命令

常用的 Docker 命令，涵盖容器、镜像、网络、卷等操作：

---

### **1. 容器管理**
• 运行容器  

  ```bash
  docker run [OPTIONS] IMAGE [COMMAND]
  # 示例：
  docker run -d --name my_container -p 8080:80 nginx
  ```
  • `-d`：后台运行  

  • `--name`：指定容器名称  

  • `-p`：端口映射（主机端口:容器端口）  

  • `-v`：挂载卷（`主机目录:容器目录`）  

  • `-e`：设置环境变量（如 `-e MYSQL_ROOT_PASSWORD=123`）  


• 列出容器  

  ```bash
  docker ps          # 查看运行中的容器
  docker ps -a       # 查看所有容器（包括已停止的）
  ```

• 启动/停止/重启容器  

  ```bash
  docker start CONTAINER
  docker stop CONTAINER
  docker restart CONTAINER
  ```

• 进入容器  

  ```bash
  docker exec -it CONTAINER /bin/bash   # 交互式进入
  ```

• 删除容器  

  ```bash
  docker rm CONTAINER          # 删除已停止的容器
  docker rm -f CONTAINER       # 强制删除运行中的容器
  ```

• 查看容器日志  

  ```bash
  docker logs CONTAINER
  docker logs -f CONTAINER     # 实时跟踪日志
  ```

---

### **2. 镜像管理**
• 拉取镜像  

  ```bash
  docker pull IMAGE[:TAG]
  # 示例：
  docker pull ubuntu:20.04
  ```

• 列出镜像  

  ```bash
  docker images
  ```

• 构建镜像  

  ```bash
  docker build -t IMAGE_NAME Dockerfile路径
  # 示例：
  docker build -t my_app .
  ```

• 删除镜像  

  ```bash
  docker rmi IMAGE
  ```

• 清理无用镜像  

  ```bash
  docker image prune
  ```

---

### **3. 网络管理**
• 列出网络  

  ```bash
  docker network ls
  ```

• 创建自定义网络  

  ```bash
  docker network create NETWORK_NAME
  ```

• 连接容器到网络  

  ```bash
  docker network connect NETWORK_NAME CONTAINER
  ```

---

### **4. 数据卷管理**
• 列出卷  

  ```bash
  docker volume ls
  ```

• 创建卷  

  ```bash
  docker volume create VOLUME_NAME
  ```

• 删除卷  

  ```bash
  docker volume rm VOLUME_NAME
  ```

---

### **5. 系统管理**
• 查看 Docker 信息  

  ```bash
  docker info
  ```

• 查看资源使用情况  

  ```bash
  docker stats
  ```

• 清理无用资源  

  ```bash
  docker system prune      # 删除停止的容器、无用镜像和网络
  docker system prune -a   # 删除所有未使用的镜像
  ```

---

### **6. Docker Compose（常用命令）**
• 启动服务  

  ```bash
  docker-compose up -d
  ```

• 停止服务  

  ```bash
  docker-compose down
  ```

• 查看服务状态  

  ```bash
  docker-compose ps
  ```

---

### **常用场景示例**
1. 运行 MySQL 容器  
   ```bash
   docker run -d --name mysql_db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 mysql:8.0
   ```

2. 备份容器数据到宿主机  
   ```bash
   docker cp CONTAINER:/path/in/container /host/path
   ```

3. 更新容器配置后重启  
   ```bash
   docker stop CONTAINER && docker rm CONTAINER
   docker run ...（新参数）
   ```

---
