---
id: "AcWing-01背包问题"
title: "DP"
excerpt: "01 背包：dp[i][j] 表示前 i 个物品在容量 j 下的最大价值，状态转移取不取第 i 个物品的最大值。"
date: "2024-04-06"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 01 背包：f[i][j] 表示前 i 个物品在容量 j 下的最大价值，对每个物品决策取或不取（取则耗 v[i] 体积加 w[i] 价值）。

# DP 

## 状态转移方程

``` c++
#include<bits/stdc++.h>

using namespace std;

const int MAXN = 1005;
int v[MAXN];    // 体积
int w[MAXN];    // 价值
int f[MAXN][MAXN];  // f[i][j], j体积下前i个物品的最大价值

int main() {
    int n, m;
    cin >> n >> m;
    for(int i = 1; i <= n; i++)
        cin >> v[i] >> w[i];

    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= m; j++)
        {
            //  当前背包容量j装不进第i个物品，则价值等于前i-1个物品
            if(j < v[i])
                f[i][j] = f[i - 1][j];
                // 能装，需进行决策是否选择第i个物品
            else
                f[i][j] = max(f[i - 1][j], f[i - 1][j - v[i]] + w[i]);
        }

    cout << f[n][m] << endl;

    return 0;
}
```
