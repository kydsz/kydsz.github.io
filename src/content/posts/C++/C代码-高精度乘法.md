---
id: "C代码-高精度乘法"
title: "高精度乘法"
excerpt: "高精度大数乘法：按位竖式累加进位，用 vector 倒序存储，去尾零后输出。"
date: "2025-04-11"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 高精度乘法：把两个大数逐位相乘、进位累加（O(n²)），vector 倒序存数字，最后去掉前导零输出。

```c++
#include <bits/stdc++.h>
using namespace std;

vector <int> mul(vector <int> &A, vector <int> &B) {
	vector <int> C(A.size() + B.size(), 0);
	for (int i = 0; i < A.size(); i ++) {
		for (int j = 0; j < B.size(); j ++) {
			C[i + j] += A[i] * B[j];
			C[i + j + 1] += C[i + j] / 10;
			C[i + j] %= 10;
		}
	}
	//去除尾0 
	while (C.size() > 1 && C.back() == 0) C.pop_back();
	return C;
}

// 应用部分
vector <int> A,B,C;
string CA,CB; // 字符串存储
int main() {
	cin >> CA >> CB;
	for (int i = CA.size() - 1; i >= 0; i--) A.push_back(CA[i] - '0');
	for (int i = CB.size() - 1; i >= 0; i--) B.push_back(CB[i] - '0');
	C = mul(A,B);
	for (int i = C.size() - 1; i >= 0; i--) cout << C[i];
	cout << endl;
	return 0;
}
```
