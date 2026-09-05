---
id: "AcWing-3245地铁修建"
title: "克鲁斯卡尔"
excerpt: "求 1 到 n 连通的最短工期：Kruskal 按边权升序加边，答案即首次连通时的最大边权。"
date: "2024-03-22"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> Kruskal 按施工时间升序加边并并查集合并，当 1 与 n 首次连通时，当前边权即最小化的最长工期。

# 克鲁斯卡尔

``` c++
#include<iostream>
#include <algorithm>

const int MAXSIZE = 1000010;
using namespace std;
int n, m, ans = 0;
typedef struct _edge {
    int a, b, t;
} edge;
edge way[MAXSIZE];
int F[MAXSIZE];

void initF() {
    for (int i = 0; i < n; ++i) {
        F[i] = i;
    }
}

int findF(int x){
    return F[x] == x ? F[x] : F[x] = findF(F[x]);
}

bool cmp(edge a, edge b) {
    return a.t < b.t;
}

void kruskal() {
    sort(way, way + m, cmp);
    for (int i = 0; i < m; ++i) {
        int x = findF(way[i].a);
        int y = findF(way[i].b);
        if (x == y) continue;
        ans = max(ans, way[i].t);
        F[x] = y;
        if (findF(1) == findF(n)) return; // 判断整个图是否联通
    }
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; ++i) {
        cin >> way[i].a >> way[i].b >> way[i].t;
    }
    initF();
    kruskal();
    cout << ans << endl;
    return 0;
}
```
