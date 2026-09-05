---
id: "Dotcpp-握手问题"
title: "握手问题"
excerpt: "组合计数：43 人两两握手，另 7 人彼此不握手但与这 43 人各握一次，求总次数。"
date: "2024-04-18"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 组合计数：43 人两两握手 C(43,2)，另 7 人彼此不握手但与 43 人各握一次，总和即答案。

```c++
#include <iostream>
using namespace std;
bool state[1000][1000];
int main(){
    int ans = 0;
    for (int i = 1; i <= 43; ++i) {
        for (int j = 1; j <= 43; ++j) {
            if (i == j) continue;
            if (!state[i][j]){
                ans++;
                state[i][j] = true;
                state[j][i] = true;
            }
        }
    }
    cout << ans + 7 * 43;
    return 0;
}
```
