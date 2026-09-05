---
id: "Dotcpp-好数"
title: "好数"
excerpt: "枚举 1~n，判断每位数字的奇偶性是否与位号一致（奇数位奇、偶数位偶）。"
date: "2025-04-10"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 逐位检查：个位起第 j 位数字的奇偶性须与 j 一致，全部满足才算好数，枚举 1~n 计数。

```c++
#include <iostream>

using namespace std;
typedef long long ll;
ll n;

ll len(ll x) {
    ll ans = 0;
    while (x) {
        ans++;
        x /= 10;
    }
    return ans;
}

ll jio(ll x) {
    return x % 2;
}

bool solve(ll i) {
    ll num = i;
    for (int j = 1; j <= len(i); ++j) {
        if (jio(num%10) != jio(j)) return false;
        num /= 10;
    }
    return true;
}

int main() {
    cin >> n;
    ll ans = 0;
    for (ll i = 1; i <= n; ++i) {
        if (solve(i)){
            ans++;
        }

    }

    cout << ans;
    return 0;
}
```

### 2025-4-11

```c++
#include<iostream>

using namespace std;

#define  long long int

bool isOdd(int num) {
    return num % 2 != 0;
}

bool check(int n) {
    bool wei = true;
    while (n) {
        int num = n % 10;
        if (isOdd(num) != wei) {
            return false;
        }
        wei = !wei;
        n /= 10;
    }

    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, ans = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (check(i)) {
            ans++;
        }
    }
    cout << ans << endl;

    return 0;
}
```
