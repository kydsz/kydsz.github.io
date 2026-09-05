---
id: "C代码-kmp"
title: "kmp"
excerpt: "KMP 字符串匹配：先构造模式串的 next 数组，失配时按 next 跳转，线性时间在主串中查找子串。"
date: "2024-05-20"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> KMP 字符串匹配：先构造模式串的 next 数组（最长相等前后缀），匹配失败时按 next 跳转，全程线性 O(n+m)。

```c++
#include <iostream>
#include <vector>

using namespace std;

vector<int> build_next(string s){
    vector<int> Next;
    Next.push_back(0);
    int prefix_len = 0;
    int i = 1;
    for (int j = 0; j < s.length()-1; ++j) {
        if (s[i] == s[prefix_len]){
            // 匹配成功
            ++prefix_len;
            ++i;
            Next.push_back(prefix_len);
        } else {
            // 匹配失败
            if (prefix_len == 0){
                Next.push_back(0);
                ++i;
            } else {
                // 查看是否还有更短的前后缀
                prefix_len = Next[prefix_len - 1];
            }
        }
    }
    return Next;
}


int kmp(string str, string patt){
    vector<int> next_kmp = build_next(patt);
    int i = 0;
    int j = 0;
    while (i < patt.length()){
        if (str[i] == patt[j]){
            ++i;
            ++j;
        } else if (j > 0){
            j = next_kmp[j-1];
            ++i;
        } else{
            ++i;
        }

    }
    return i-j;
}



int main() {
    string s, t;
    s = "aa";
    t = "a";
    cout << kmp(s, t);
    return 0;
}
```
