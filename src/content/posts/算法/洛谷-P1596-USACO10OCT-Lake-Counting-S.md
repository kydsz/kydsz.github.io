---
id: "洛谷-P1596-USACO10OCT-Lake-Counting-S"
title: "BFS"
excerpt: "湖计数：BFS 八个方向扩展相邻水格，统计互不相连的水洼连通块数量。"
date: "2023-12-28"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 数水洼：遍历网格，遇到未访问的 'W' 即从该点 BFS 沿 8 个方向标记整片水洼，每触发一次计数加一。

# BFS

```c++
#include<iostream>
#include<queue>
#define MAX 1010
using namespace std;

typedef struct _Node{
    int x, y;
}Node;
queue<Node> qu;
char map[MAX][MAX];
int state[MAX][MAX];
int dx[8] = {1,1,0,-1,-1,-1,0,1};
int dy[8] = {0,1,1,1,0,-1,-1,-1};
int n, m;


void bfs(int x, int y) {
    state[x][y] = 1;
    Node temp;
    temp.x = x;
    temp.y = y;
    qu.push(temp);
    while (!qu.empty()){
        for (int i = 0; i < 8; ++i) {
            int tx = qu.front().x + dx[i];
            int ty = qu.front().y + dy[i];

            if (tx < 0 || ty < 0 || tx >= n || ty >= m || state[tx][ty] == 1) continue;
            if (map[tx][ty] == '.') continue;
            state[tx][ty] = 1;
            temp.x = tx;
            temp.y = ty;
            qu.push(temp);
        }
        qu.pop();
    }
}


int main(){
    int res = 0;
    cin >> n >> m;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            cin >> map[i][j];

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            if (map[i][j] == '.') continue;
            if (state[i][j] == 0) {
                bfs(i,j);
                res++;
            }
        }
    }
    cout << res;
    return 0;
}


```
