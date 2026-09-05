---
id: "AcWing-4889-空调II"
title: "dfs 二进制枚举"
excerpt: "二进制枚举空调开关组合，差分数组模拟降温，求满足所有牛温度要求的最小费用。"
date: "2025-03-31"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 二进制枚举 2^M 种空调开关组合，差分数组累加各区间降温量，校验每头牛覆盖区间达标后取最小费用。

## dfs 二进制枚举 

### 二进制mei'j

```c++
#include <iostream>
#include <cstring>
using namespace std;
int N, M;

struct cow {
    int s, t, c;
} cow[110];

struct air {
    int a, b, p, m;
} air[110];

int diff[110];

int main() {
    cin >> N >> M;
    for (int i = 1; i <= N; i++) {
        cin >> cow[i].s >> cow[i].t >> cow[i].c;
    }
    for (int i = 1; i <= M; i++) {
        cin >> air[i].a >> air[i].b >> air[i].p >> air[i].m;
    }
    int ans = 0x7FFFFFFF;
    // 0 - 1023
    for (int i = 0; i < 1 << M; i++) {
        memset(diff, 0, sizeof(diff)); //初始化差分数组
        int sum = 0;
        for (int j = 0; j < M; j++) {
            if ((i >> j) & 1) {
                diff[air[j + 1].a] += air[j + 1].p;
                diff[air[j + 1].b + 1] -= air[j + 1].p;
                sum += air[j + 1].m;
            }
        }
        

        // 还原差分数组
        for (int j = 1; j <= 100; j++) {
            diff[j] += diff[j - 1];
        }
        bool ok = true;
        for (int j = 1; j <= N; j++) {
            for (int k = cow[j].s; k <= cow[j].t; k++) {
                if (diff[k] < cow[j].c) {
                    ok = false;
                    break;
                }
            }
        }
        if (ok) {
            ans = min(ans, sum);
        }
    }
    cout << ans << endl;
    return 0;
}

```
