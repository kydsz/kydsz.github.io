---
id: "蓝桥杯官网-试题-B-双子数"
title: "试题 B 双子数"
excerpt: "欧拉筛出素数，枚举素数对使 p²·q² 落在指定区间，计数双子数。"
date: "2024-05-30"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 欧拉筛出素数，枚举素数对求 p²·q²，统计落在给定区间的个数。

```c++
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int N = 4830418;
bool vis[N];
vector<ll> prime;

void euler() {
    for (int i = 2; i <= N; ++i) {
        if (!vis[i]) {
            prime.push_back(i);
        }
        for (auto x: prime) {
            if (i * x > N) break;
            vis[i * x] = true;
            if (i % x == 0) break;
        }
    }
}

int main() {
    euler();
    ll ans = 0;
    for (int i = 0; i < prime.size(); i++) {
        //如果p^4爆了，p^2*q^2肯定要爆（longlong的范围大概是10^16）
        //必须要写这句，不然会超出long long范围，结果错误
        if (prime[i] * prime[i] * prime[i] * prime[i] > 23333333333333) break;
        for (int j = i + 1; j < prime.size(); j++) {
            if (prime[i] * prime[i] * prime[j] * prime[j] < 2333)
                continue;
            else if (prime[i] * prime[i] * prime[j] * prime[j] > 23333333333333)
                break;
            ans++;
        }
    }
    cout << ans;
    return 0;
}
```
