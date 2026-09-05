---
id: "AcWing-2559-数正方形"
title: "找规律"
excerpt: "按边长找规律统计 n×n 网格中平放与斜放正方形的总数。"
date: "2024-05-01"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 按边长 i 找规律：平放正方形 (n-i)² 个、斜放 (n-i)²·(i-1) 个，O(n) 累加取模。

## 找规律

```c++
#include <iostream>
using namespace std;

long n, mol = 1e9 + 7;
int main() {
    cin >> n;
    long z = 0, x = 0; // z为平放的正方形数量和， x为斜的正方形数量和
    // 平放的规律：比如n = 4, 边长为1的正方形数量为 （4-1）* （4-1）， 边长为2的数量为 （4-2）* （4-2），边长3的为（4-3）* （4-3）
    // 斜放的规律：n = 2 斜放正方形数量为0， n = 3 为 1。 n = 4 为 2。也就是n-2 ,即正方形的边长-1
    for (long i = 1; i < n; ++i) {
        // 累加边长为(n-i)平放和斜放正方形的数量
        z += (n - i) * (n - i) % mol;
        x += (n - i) * (n - i) * (i-1) %mol;
    }
    cout << (z + x) %mol;
    return 0;
}
```
