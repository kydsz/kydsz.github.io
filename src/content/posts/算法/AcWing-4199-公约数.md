---
id: "AcWing-4199-公约数"
title: "4199. 公约数"
excerpt: "求 a、b 在区间 [l,r] 内的最大公约数：先枚举 gcd 的所有约数再倒序查找。"
date: "2024-05-24"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 两数的公约数集合即 gcd(a,b) 的约数集合，枚举约数并排序，查询时倒序找出落在 [l,r] 内的最大值。

```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int a, b, q;

int gcd(int a1, int a2) {
    return a2 == 0 ? a1 : gcd(a2, a1 % a2);
}

vector<int> c;

void com() {
    int g = gcd(a, b);
    for (int i = 1; i * i <= g; ++i) {
        if (g % i == 0) {
            c.push_back(i);
            c.push_back(g / i);
        }
    }
    sort(c.begin(), c.end());
}

int check(int l, int r) {
    for (int i = (int) c.size() - 1; i >= 0; --i) {
        if (c[i] < l) break;
        else if (c[i] <= r) return c[i];
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin >> a >> b >> q;
    com();
    int l, r;
    while (q--) {
        cin >> l >> r;
        cout << check(l, r) << endl;
    }
    return 0;
}
```
