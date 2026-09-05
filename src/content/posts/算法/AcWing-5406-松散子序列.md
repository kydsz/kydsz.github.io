---
id: "AcWing-5406-松散子序列"
title: "状态机dp"
excerpt: "状态机 DP：dp[i][0/1] 表示第 i 位不选/选的最大价值，相邻字符不能同时选。"
date: "2024-05-24"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 状态机 DP 两状态：不选继承前一位最大值，选则取前一位不选的值加本字符价值，保证不取相邻字符。

## 状态机dp

```c++
#include <bits/stdc++.h>

using namespace std;
string s;
int dp[1000010][2];

int main() {
    cin >> s;
    dp[0][1] = s[1] - 'a' + 1; // 初始化选
    for (int i = 0; i < s.length(); ++i) {
        dp[i][0] = max(dp[i - 1][0], dp[i - 1][1]); // 不选
        dp[i][1] = dp[i - 1][0] + s[i] - 'a' + 1; // xuan
    }
    cout << max(dp[s.length() - 1][0], dp[s.length() - 1][1]);
    return 0;
}
```
