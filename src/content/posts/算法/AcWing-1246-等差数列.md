---
id: "AcWing-1246-等差数列"
title: "暴力"
excerpt: "求最短等差数列的项数：公差为排序后所有相邻差值的最大公约数，项数 = (末项-首项)/d + 1。"
date: "2024-05-24"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 排序后所有相邻差值的最大公约数即最大公差 d，最短项数 = (末项 - 首项) / d + 1，d 为 0 时输出 n。

## 暴力 

```c++
#include<iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int n, ans = 0x7fffffff;
ll arr[100010];
int main() {
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }
    sort(arr, arr + n);

    for (ll i = arr[1] - arr[0]; i >= 1; --i) {
        int len = 1;
        bool  p = true;
        ll t = arr[0];
        ll index = 1;
        while (true) {
            t += i;
            if (index == n) {
                break;
            } else if (t > arr[index]) {
                p = false;
                break;
            } else if (t == arr[index]) {
                index++;
            }
            len++;
        }
        if (p) {
            ans = min(ans, len);
        }
    }
    cout << ans;
    return 0;
}
```



## 100%

```c++
#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;
int n;
ll arr[100010];

ll gcd(ll a, ll b) {
    return b == 0 ? a: gcd(b, a % b);
}

int main() {
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }
    sort(arr, arr + n);

    ll d = 0;
    for (int i = 1; i < n; ++i) {
        d = gcd(d, arr[i] - arr[i-1]);
    }

    if (d == 0) {
        cout << n;
        return 0;
    }

    // 公式An=a1+ (n-1)d ， 所以 n = (An - a1) / d + 1
    cout << (arr[n - 1] - arr[0]) / d + 1;
    return 0;
}
```



```c++
#include <iostream>
#include <cstdio>
#include <algorithm>

using namespace std;

const int N = 1e5 + 10;

int n;
int a[N];

int gcd(int a, int b)
{
    return b ? gcd(b, a % b) : a;
}

int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i ++ ) scanf("%d", &a[i]);

    sort(a, a + n);

    int x = a[0], y = a[n - 1];

    int d = 0;  //0与任意数的最大公约数都是其本身
    for (int i = 0; i < n - 1; i ++ )
        d = gcd(d, a[i + 1] - a[i]);

    if (!d) printf("%d\n", n);  //公差为0的情况
    // 公式An=a1+ (n-1)d ， 所以 n = (An - a1) / d + 1
    else printf("%d\n", (y - x) / d + 1);

    return 0;
}

/*
作者：QAQ_ning
链接：https://www.acwing.com/solution/content/45256/
来源：AcWing
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
/*
```
