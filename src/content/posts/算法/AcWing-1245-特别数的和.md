---
id: "AcWing-1245-特别数的和"
title: "1245. 特别数的和"
excerpt: "统计 1 到 n 中数位含有 2、0、1、9 的所有数字之和。"
date: "2024-05-01"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 枚举 1~n 每个数，逐位检查是否含 2、0、1、9，命中即累加进答案。

```c++
#include<iostream>
using namespace std;
int n, ans = 0;
int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        int t = i;
        while (t) {
            if (t % 10 == 2 || t % 10 == 0 || t % 10 == 1 || t % 10 == 9 ) {
                ans += i;
                break;
            }
            t /= 10;
        }
    }
    cout << ans;
    return 0;
}
```
