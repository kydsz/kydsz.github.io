---
id: "dp"
title: "动态规划四步法"
excerpt: "动态规划四步法笔记，附常用位运算技巧：取位、改位、去最低位 1、枚举子集等。"
date: "2024-05-28"
readTime: "1 min"
tags: ["算法"]
emoji: "💻"
---
> 动态规划按四步拆解：确定子问题、定义状态、写转移方程、避免重复求解，末尾附常用位运算技巧，可配合状态压缩 DP 使用。

### 做动态规划的题一般分为四个步骤：确定子问题—>定义状态—>转移方程—>避免重复求解

### *𝐹𝑢𝑡𝑢𝑟𝑒 𝑛𝑒𝑣𝑒𝑟 ℎ𝑎𝑠 𝑡𝑜 𝑑𝑜 𝑤𝑖𝑡ℎ 𝑝𝑎𝑠𝑡 𝑡𝑖𝑚𝑒 ,𝑏𝑢𝑡 𝑝𝑟𝑒𝑠𝑒𝑛𝑡 𝑑𝑜𝑒𝑠.*

### *现在决定未来，未来与过去无关*



### 位运算

1.取出x的第i位:

```cpp
int main()
{
    y = (x>>(i-1))&1;
    return 0;
}
```

2.将x第i位取反:

```cpp
int main()
{
    x ^= (1<<(i-1));
    return 0;
}
```

3.将x第i位变为1：

```cpp
int main()
{
    x |= (1<<(i-1));
    return 0;
}
```

4.将x第i位变为0：

```cpp
int main()
{
    x &= (~(1<<(i-1)));
    return 0;
}
```

5.将x最靠右的1去掉：

```cpp
int main()
{
    x = x&(x-1);
    return 0;
}
```

6.取出x最靠右的1:

```cpp
int main()
{
    y = x&(-x);
    return 0;
}
```

7.判断是否有两个连续的一：

```cpp
int main()
{
    if(x&(x<<1)) cout<<"YES";
    return 0;
}
```

8.枚举子集：

```cpp
int main()
{
    for( int x = sta ; x ;  x = ( ( x - 1 )&sta) )
      cout<<x;
    return 0;
}
```
