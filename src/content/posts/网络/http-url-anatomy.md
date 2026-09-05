---
id: http-url-anatomy
title: '一个 HTTP URL 里都藏了什么'
excerpt: 'scheme、userinfo、host、port、path、query、fragment——把 URL 拆成七段，每一段该不该有、什么时候能省略，一次说清。'
date: '2024-11-30'
readTime: '5 min'
tags: ['网络']
emoji: '🌐'
---

每天都在写 URL，但真要说出它的完整结构，很多人会漏掉一两段。一个完整的 HTTP URL 最多由七个部分组成：

```text
https://username:password@www.example.com:8080/search?q=HTTP&lang=zh#section2
```

## 逐段拆解

- 协议（scheme）：http:// 或 https://，必需；
- 用户信息（userinfo）：username:password@，可选——出于安全考虑，现代 Web 已不推荐在 URL 里带凭据；
- 主机名（host）：域名或 IP，必需；
- 端口（port）：:8080，可选——默认端口 80（HTTP）/ 443（HTTPS）可省略；
- 路径（path）：/search，必需，至少要有根路径 /；
- 查询字符串（query）：?q=HTTP&lang=zh，可选，向服务器传递参数；
- 片段（fragment）：#section2，可选，只由浏览器处理，不会发给服务器。

## 必需与可选

- 必需：协议、主机名、路径（至少是 /）；
- 可选：用户信息、端口、查询字符串、片段标识符。

> URL 是给机器读的坐标——每一段都对应一次寻址决策。