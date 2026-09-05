---
id: "AcWing-4658-质因数个数"
title: "质因数分解"
excerpt: "试除法分解 n，统计不同质因数的个数。"
date: "2024-05-24"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 从 2 试除到 sqrt(n)，找到因子后除尽该因子并计数，剩余 n>1 时再补一个质因数。

## 质因数分解

```c++
#include <bits/stdc++.h>

using namespace std;
long long n;

int main() {
    ios::sync_with_stdio(false);
    cin >> n;
    long long ans = 0;
    for (long long i = 2; i * i<= n; ++i) {
        if (n % i == 0) {
            ans++;
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    if (n > 1) ans++;
    cout << ans;
    return 0;
}
```
