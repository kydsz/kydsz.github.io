---
id: "AcWing-4956-冶炼金属"
title: "二分"
excerpt: "二分冶炼参数 v 的最小与最大值，使每组 a/v 均等于对应的 b。"
date: "2024-04-16"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 对 v 分别二分下界与上界：v 越大 a[i]/v 越小，按此单调性校验每组 a/v 是否落在约束区间内。

## 二分

```c++
#include <iostream>

using namespace std;
typedef long long ll;
ll n;
const int LEN =(int) 1e4+1;
ll arr[LEN][2];

bool check(ll num){
    for (int i = 0; i < n; ++i) {
        if (arr[i][0] / num > arr[i][1]) {
            return false;
        }
    }
    return true;
}

bool check2(ll num){
    for (int i = 0; i < n; ++i) {
        if (arr[i][0] / num < arr[i][1]) {
            return false;
        }
    }
    return true;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> arr[i][0] >> arr[i][1];
    }
    ll l = 1, r = arr[0][0], mid = 0, mixn = 0x7ffffffffff, maxn = -1;
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }

    cout << l << ' ';

    r = 1e9;
    while (l < r)
    {
        int mid = l + r + 1 >> 1;
        if (check2(mid)) l = mid;
        else r = mid - 1;
    }

    cout << l;
    return 0;
}
```
