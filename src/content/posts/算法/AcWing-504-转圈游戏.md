---
id: "AcWing-504-转圈游戏"
title: "快速幂 数学"
excerpt: "用快速幂求 10^k mod n，最终位置 = (x + 10^k × m) mod n。"
date: "2024-04-06"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---

> 每轮所有人整体移动 m 位共 10^k 轮，答案 (x + m·10^k) mod n，10^k 用快速幂取模。

# 快速幂	数学

```c++
#include <iostream>
#include <cmath>
using namespace std;
int n, m, k, x;
long long quickPow(long long x, long long n, long long mol){
	long long ans = 1;
    while(n){
        if(n&1){
            ans = (ans * x) % mol;
        }
        x = (x * x) % mol;
        n >>= 1;
    }
    return ans;
}

int main(){
	cin >> n >> m >> k >> x;
    /*
    x号小盆友初始位置是x所以从x开始加运动了10*次，
    每次运动x个单位+10*xm所有的小盆友围成了一个周长n
    单位的圈mod n所以全公式就是(x+ 10^k × m) mod n
    */
	cout << (x + quickPow(10, k, n) * m) % n; 
	return 0;
} 
```
