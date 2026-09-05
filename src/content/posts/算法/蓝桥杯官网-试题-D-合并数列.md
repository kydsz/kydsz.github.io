---
id: "蓝桥杯官网-试题-D-合并数列"
title: "试题 D 合并数列"
excerpt: "双队列贪心比较队首，较小者与后一个数合并，求最少合并次数。"
date: "2024-05-30"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 双队列比较队首，较小数并入下一个元素，统计使两序列相同的最少合并次数。

 **注意**：**相邻的两个数**合并为一个新数

```c++
#include<bits/stdc++.h>

using namespace std;

int n, m, ans;
int tp1, tp2;
queue<int> q1, q2;

int main() {
    cin >> n >> m;
    for (int i = 1, x; i <= n; i++) cin >> x, q1.push(x);
    for (int i = 1, x; i <= m; i++) cin >> x, q2.push(x);

    while (!q1.empty()) {
        tp1 = q1.front();
        tp2 = q2.front();
        if (tp1 == tp2) q1.pop(), q2.pop();
        else if (tp1 < tp2) q1.pop(), q1.front() += tp1, ans++;
        else q2.pop(), q2.front() += tp2, ans++;
    }
    cout << ans << endl;
    return 0;
}

```
