---
id: "AcWing-503-借教室"
title: "差分， 二分"
excerpt: "差分 + 二分判断前 mid 张订单是否可行，找出第一张无法满足的订单。"
date: "2024-03-29"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 二分订单数 mid，差分数组给前 mid 张订单的区间 [s,t] 加需求 d，前缀和还原后与每日可用教室比对，超限即不可行。

## 差分， 二分

```c++
#include <iostream>
#include <cstring>

using namespace std;

typedef long long LL;

const int N = 1000010;

int n, m;
int a[N], cf[N];
int s[N], t[N], d[N];
LL b[N];

bool check(int mid)
{
    memset(b, 0, sizeof b);
    for (int i = 1; i <= mid; i ++ )
    {
        b[s[i]] += d[i];
        b[t[i] + 1] -= d[i];
    }

    for (int i = 1; i <= n; i ++ )
    {
        b[i] += b[i - 1];
        if (b[i] > a[i]) return false;
    }

    return true;
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        cf[i] = a[i] - a[i - 1];
    }
    for (int i = 1; i <= m; ++i) {
        cin >> d[i] >> s[i] >> t[i];
    }
    int l = 0, r = m;
    while (l < r)
    {
        int mid = (l + r + 1) >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }

    if (r == m) cout << 0 << endl;
    else cout << -1 << endl << r + 1 << endl;
    return 0;
}
```
