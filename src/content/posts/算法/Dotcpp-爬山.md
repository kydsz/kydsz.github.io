---
id: "Dotcpp-爬山"
title: "优先队列"
excerpt: "优先队列贪心：每次取最高峰操作，开方 p 次、减半 q 次，最后求高度总和。"
date: "2024-04-19"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 大根堆每次取最高峰，先执行 p 次开方、再 q 次减半，操作后重新入堆，最后累加全部高度。

## 优先队列 

### 	83 分

```c++
#include<iostream>
#include<algorithm>
#include <cmath>
#include <queue>

using namespace std;
int n, p, q;
int main() {
    priority_queue<int> fq;
    int ans = 0;
    cin >> n >> p >> q;
    for (int i = 0; i < n; ++i) {
        int a;
        cin >> a;
        fq.push(a);
    }
    while (p--) {
        int a = fq.top();
        a = sqrt(a);
        fq.pop();
        fq.push(a);
    }
    while (q--) {
        int a = fq.top();
        a = a / 2;
        fq.pop();
        fq.push(a);
    }
    while (!fq.empty()) {
        ans += fq.top();
        fq.pop();
    }
    cout << ans;
    return 0;
}
```
