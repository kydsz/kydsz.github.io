---
id: "AcWing-3703-括号的匹配"
title: "栈括号的匹配"
excerpt: "用栈检查括号序列，要求嵌套时外层优先级不得低于内层（< ( [ {）。"
date: "2025-03-20"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 栈匹配括号：右括号须与栈顶配对，左括号入栈前要求其优先级高于栈顶（< ( [ { 逐级递增），不满足即非法。

## 栈匹配括号

```c++
#include <iostream>
#include <stack>

using namespace std;
int n;

int main() {
    cin >> n;
    stack<char> s;
    int map[150];
    int compare[150];

    compare[60] = 1;
    compare[40] = 2;
    compare[91] = 3;
    compare[123] = 4;

    map[62] = '<';
    map[41] = '(';
    map[93] = '[';
    map[125] = '{';
    while (n--) {
        string t;
        cin >> t;
        int com;
        for (const auto c: t) {
            if (c == '{' || c == '[' || c == '(' || c == '<') {
                if (s.empty()) {
                    s.push(c);
                    com = compare[c];
                } else if (com >= compare[c]) {
                    s.push(c);
                    com = compare[c];
                } else break;
            } else {
                if (s.empty()) {
                    s.push(c);
                    break;
                }
                if ((map[c] == s.top())) {
                    s.pop();
                    if (!s.empty()) {
                        com = compare[s.top()];
                    }
                }
            }
        }
        if (s.empty()) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }

        while (!s.empty()) {
            s.pop();
        }
    }
    return 0;
}
```





## 手搓栈

```c++
#include <iostream>

using namespace std;

typedef struct _stack {
    char data[110];
    int top;
} stack;

void init(stack &s) {
    s.top = -1;
}

bool empty(stack &s) {
    return s.top == -1;
}

void push(stack &s, char x) {
    s.data[++s.top] = x;
}

void pop(stack &s) {
    s.top--;
}

char top(stack &s) {
    return s.data[s.top];
}


int n;

int main() {
    cin >> n;
    stack s;
    init(s);

    int map[150];
    int compare[150];

    compare[60] = 1;
    compare[40] = 2;
    compare[91] = 3;
    compare[123] = 4;

    map[62] = '<';
    map[41] = '(';
    map[93] = '[';
    map[125] = '{';
    while (n--) {
        string t;
        cin >> t;
        int com;
        for (const auto c: t) {
            if (c == '{' || c == '[' || c == '(' || c == '<') {
                if (empty(s)) {
                    push(s, c);
                    com = compare[c];
                } else if (com >= compare[c]) {
                    push(s, c);
                    com = compare[c];
                } else break;
            } else {
                if (empty(s)) {
                    push(s, c);
                    break;
                }
                if ((map[c] == top(s))) {
                    pop(s);
                    if (!empty(s)) {
                        com = compare[top(s)];
                    }
                }
            }
        }
        if (empty(s)) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }

        while (!empty(s)) {
            pop(s);
        }
    }
    return 0;
}
```
