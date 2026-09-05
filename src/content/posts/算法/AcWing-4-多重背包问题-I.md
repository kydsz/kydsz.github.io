---
id: "AcWing-4-多重背包问题-I"
title: "dp"
excerpt: "多重背包两种写法：朴素三重循环枚举件数，以及二进制拆分转 01 背包。"
date: "2024-05-27"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 多重背包：朴素版三重循环枚举第 i 种物品取 k 件；优化版把 s 件二进制拆分打包后按 01 背包一维滚动求解。

## dp

### 朴素版

```c++
#include <bits/stdc++.h>

using namespace std;
const int N = 110;
int n, m, v[N], w[N], s[N];
int dp[N][N];

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) {
        cin >> v[i] >> w[i] >> s[i];
    }
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            for (int k = 0; k <= s[i]; ++k) {
                if (j >= k * v[i])
                    dp[i][j] = max(dp[i][j], dp[i - 1][j - k * v[i]] + k * w[i]);
            }
        }
    }
    cout << dp[n][m];
    return 0;
}
```

### 转成01背包

#include <iostream>
#include <algorithm>

using namespace std;

const int N = 25000;

int f[N], v[N], w[N];
int n, m;

int main(){
    cin >> n >> m;

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 25000;

int f[N], v[N], w[N];
int n, m;

int main(){
    cin >> n >> m;

    //将每种物品根据物件个数进行打包
    int cnt = 0;
    for(int i = 1; i <= n; i ++){
        int a, b, s;
        cin >> a >> b >> s;

        int k = 1;
        while(k <= s){
            cnt ++;
            v[cnt] = k * a;
            w[cnt] = k * b;
            s -= k;
            k *= 2;
        }
        if(s > 0){
            cnt ++;
            v[cnt] = s * a;
            w[cnt] = s * b;
        }

    }

    //多重背包转化为01背包问题
    for(int i = 1; i <= cnt; i ++){
        for(int j = m; j >= v[i]; j --){
            f[j] = max(f[j], f[j - v[i]] + w[i]);
        }
    }

    cout << f[m] << endl;

    return 0;
}
```
