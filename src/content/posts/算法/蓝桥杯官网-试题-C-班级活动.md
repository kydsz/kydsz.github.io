---
id: "蓝桥杯官网-试题-C-班级活动"
title: "统计"
excerpt: "统计 id 出现次数，多于 2 与不足 2 的差额抵消，输出最少调整次数。"
date: "2024-05-30"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> map 统计各 id 人数，多余与不足两类的差额抵消后折半即最少改动。

# 统计

```c++
#include <iostream>
#include <map>
using namespace std;

map<int, int> dict;
int n;
int sum1 = 0, sum2 = 0;

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int a;
        cin >> a;
        dict[a]++;
    }

    for (int i = 1; i <= n; i++) {
        if (dict[i] >= 2) {
            sum1 += (dict[i] - 2);
        } else {
            sum2 += dict[i];
        }
    }

    if (sum1 > sum2) {
        cout << sum1 << "\n";
    } else {
        cout << sum1 + (sum2 - sum1) / 2 << "\n";
    }
    return 0;
}
```

先把每个 𝑖𝑑 的人数统计好，然后 𝑖𝑑 的数量有两种情况：

- 𝑖𝑑 数比二小。
- 𝑖𝑑 数大于等于二。
