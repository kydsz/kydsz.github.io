---
id: "AcWing-3377-约数的个数"
title: "3377. 约数的个数"
excerpt: "枚举 i 到 sqrt(x) 统计约数个数，i 与 x/i 成对计入。"
date: "2024-05-30"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 对 x 枚举 i 到 sqrt(x)，x 整除 i 时 i 与 x/i 成对计入答案，避免重复统计平方因子。

```c++
#include <bits/stdc++.h>
using namespace std;
int n, x;
int main() {
    ios::sync_with_stdio(false);
    cin >> n;
    while (n--){
        cin >> x;
        int ans = 0;
        for (int i = 1; i * i <= x; ++i) {
            if (x % i == 0) {
                ans++;
                if (x / i != i) ans++;
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```
