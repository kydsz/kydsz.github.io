---
id: "AcWing-211-计算系数"
title: "快速幂， 逆元， 欧拉定理（费马小定理）"
excerpt: "计算 (ax+by)^k 展开后 x^n y^m 的系数，用快速幂和费马小定理逆元求模意义下的组合数。"
date: "2024-04-10"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 快速幂算 a^n·b^m，组合数 C(k,n) 用费马小定理求逆元递推得到，三者相乘取模即系数。

## 快速幂， 逆元， 欧拉定理（费马小定理）

```c++
#include <iostream>

using namespace std;

int a, b, k, n, m, ans;
int mod = 10007;

int qmi(int x, int power) {
    x %= mod;
    int res = 1;
    while (power) {
        if (power & 1) {
            res = res * x % mod;
        }
        x = x * x % mod;
        power >>= 1;
    }
    return res;
}

int main() {
    cin >> a >> b >> k >> n >> m;
    ans = qmi(a, n) * qmi(b, m) % mod;
    for (int i = 1, j = k; i <= n; ++i, j--) {
        ans = ans * j % mod;
        ans = ans * qmi(i, mod - 2) % mod;
    }
    cout << ans;
    return 0;
}
```
