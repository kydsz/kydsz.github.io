---
id: "C代码-全排列"
title: "全排列"
excerpt: "递归回溯枚举数组的全排列：交换当前位置与后面的元素，还原后再进入下一轮。"
date: "2024-12-29"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 全排列：递归回溯——把每个位置依次与后面元素交换，递归下一层后还原（swap 回溯），输出所有排列。

```c++
#include <iostream>

using namespace std;

void porm(int arr[],int len, int p, int q) {

    if (p == q) {
        for (int i = 0; i < len; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    for (int i = p; i < q; i++) {
        swap(arr[p], arr[i]);
        porm(arr, len, p + 1, q);
        swap(arr[p], arr[i]);
    }
}


int main() {
    int arr[] ={1, 2, 3};
    porm(arr, 3, 0, 3);
    return 0;
}
```
