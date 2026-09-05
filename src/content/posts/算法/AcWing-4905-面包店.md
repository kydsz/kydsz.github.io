---
id: "AcWing-4905-面包店"
title: "二分"
excerpt: "二分最小总操作次数，把约束化为关于 x 的线性不等式判断可行性。"
date: "2025-03-31"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 二分总减少次数 mid，设 tc 减少 x 次、tm 减少 mid-x 次，把每项约束化为 x 的线性不等式求交集，非空则可行。

## 二分

## 不等式

```c++
#include <iostream>
#include <cmath>

using namespace std;
typedef long long ll;
ll n, tc, tm;
ll a[120], b[120], c[120];

bool check(ll mid) {
    ll minx = max(0ll, mid - tm + 1);
    ll maxx = min(mid, tc - 1);
    if (minx > maxx) return false;
    for (int i = 0; i < n; i++) {
        ll l = b[i] - a[i];
        ll r = c[i] - a[i] * tc - b[i] * tm + mid * b[i];
        if (l > 0) {
            maxx = min(maxx, (ll) floor((double) r / l));
        }
        if (l < 0) {
            minx = max(minx, (ll) ceil((double) r / l));
        } else if (r < 0) return false;
    }
    return minx <= maxx;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cin >> n >> tc >> tm;
        for (int i = 0; i < n; i++) {
            cin >> a[i] >> b[i] >> c[i];
        }
        ll l = 0, r = tc + tm - 2, mid;
        while (l < r) {
            mid = (l + r) >> 1;
            if (check(mid)) {
                r = mid;
            } else
                l = mid + 1;
        }
        cout << l << endl;
    }
    return 0;
}
```
