---
id: "C代码-高精度阶乘和"
title: "高精度阶乘和"
excerpt: "高精度计算 1!+2!+…+n!：大数组存每位数字，逐项算阶乘并累加求和。"
date: "2024-03-21"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 高精度阶乘和：用数组按位存储大数，依次求 i 的阶乘并累加，计算 1!+2!+…+n!。

```c++
#include <iostream>
int n;
using namespace std;
int arr[100002] = {1,1},  sum[100000] = {1};

//求阶乘
void fact(int i){
    int k = 0;
    for (int j = 1; j <= arr[0]; ++j) {
        arr[j] = arr[j] * i + k;
        k = arr[j] / 10;
        arr[j]  = arr[j] % 10;
    }
    // 进位
    while (k){
        arr[0] += 1;
        arr[arr[0]] = k%10;
///*可以改成*/arr[++arr[0]] = k%10;
        k /= 10;
    }


}
//阶乘和
void add(){
    if (arr[0] > sum[0]){
        sum[0] = arr[0];
    }
    int k = 0;
    for (int i = 1; i <= sum[0]; ++i) {
        sum[i] = sum[i]  + arr[i] + k;
        k = sum[i] / 10;
        sum[i] %= 10;
    }
    if (k){
        sum[++sum[0]];
    }
}


int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        fact(i);
        add();
    }
    cout << endl;
    for (int z = sum[0]; z >= 1; --z) {
        cout << sum[z];
    }
    cout << endl;
    return 0;
}
```
