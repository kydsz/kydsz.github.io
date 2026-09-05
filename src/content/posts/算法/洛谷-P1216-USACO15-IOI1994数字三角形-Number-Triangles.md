---
id: "洛谷-P1216-USACO15-IOI1994数字三角形-Number-Triangles"
title: "DP"
excerpt: "数字三角形：自底向上 DP，每格累加下方两格中的较大值，顶层即为最大路径和。"
date: "2024-03-21"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 数字三角形：自底向上递推，每格加上下方相邻两格中的较大值，顶格即从顶到底的最大路径和。

# DP

```c++
#include <algorithm>

using namespace std;


int r, arr[1010][1010];


int main() {
    cin >> r;
    for (int i = 0; i <= r; ++i) {
        for (int j = 0; j < i; ++j) {
            cin >> arr[i][j];
        }
    }
    for (int i = r - 1; i >= 0; --i) {
        for (int j = 0; j <= i; ++j) {
            arr[i][j] += max(arr[i + 1][j], arr[i + 1][j + 1]);
        }
    }
    cout << arr[0][0] << endl;

    return 0;

}
```
