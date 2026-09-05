---
id: "C代码-st表"
title: "st表"
excerpt: "区间最大值：O(n²) 预处理所有区间，之后每次查询 O(1) 输出子数组最大值。"
date: "2024-05-24"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 区间最大值：用二维表预存每个区间 [l, r] 的最大值（O(n²) 预处理），随后每次查询 O(1) 直接输出。

```c++
#include <bits/stdc++.h>

using namespace std;
int n, m;
int main() {
    ios::sync_with_stdio(false);
    cin >> n >> m;
    vector<int> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }
    vector<vector<int>> ans(n, vector<int>(n, 0));
    for (int i = 0; i < n; ++i) {
        for (int j = i; j < n; ++j) {
            if (i == j) { ans[i][j] = arr[i]; }
            else { ans[i][j] = max(ans[i][j - 1], arr[j]); }
        }
    }
    int l, r;
    while (m--) {
        cin >> l >> r;
        cout << ans[l][r] << endl;
    }
    return 0;
}
```
