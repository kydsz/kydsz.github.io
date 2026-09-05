---
id: "C代码-质数筛"
title: "素数筛-欧拉筛"
excerpt: "三种素数判定/筛法：欧拉筛 O(n)、埃氏筛 O(n log log n)、试除法 O(√n)。"
date: "2025-04-11"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 三种素数方法：欧拉筛（线性 O(n)）、埃氏筛（O(n log log n)）、试除法（O(√n)）。

## 素数筛-欧拉筛

```c++
//欧拉筛函数
int Euler_sieve(int n)
{
    int i,j,k;
    k=0;//保存素数的个数
    memset(vis,0,sizeof(int)*maxn);//初始化数组
    for(i=2;i<=n;i++)
    {
        if(vis[i]==0)//i是素数，则存起来
            prime[k++]=i;
        for(j=0;j<k;j++)//进行倍增，用i去乘以i之前(包括i)的素数
        {
            if(i*prime[j]>n)//倍增结果超出范围，退出
                break;

            vis[ i*prime[j] ]=1;//将倍增结果进行标记

            if(i%prime[j]==0)//i是前面某个素数的倍数时，也需要退出
                break;
        }
    }
    return k;
}
```





## 埃氏筛

### **时间复杂度O( N\* log(logN) )**

```c++
//埃氏素数筛函数
int Eratosthenes_sieve(int n)
{
    int i,j,k;
    k=0;
    memset(vis,0,sizeof(int)*maxn);
    vis[0]=vis[1]=1;
    for(i=2;i<=n;i++)
    {
        if(vis[i]==0)
        {
            prime[k++]=i;
            for(j=i;i*j<=n;j++)//仅仅是这里，把j=2改为j=i
                vis[i*j]=1;
        }
    }
    return k;
}
```



## 试除法

### **时间复杂度O(sqrt(n))**

```c++
int IsPrime(int n)
{
    int i;
    if(n<2||(n!=2&&n%2==0))//n小于2或者n是不等于2的偶数，必然非素数
        return 0;
    else//这里n都是奇数
    {//这里使用上面刚提到的写法，用i代替开根号的过程
        for(i=3;i*i<=n;i+=2)//这里注意循环条件
        {//2必然不是因子，从3开始，每次递增2，直到sqrt(n)为止
            if(n%i==0)
                return 0;
        }
        return 1;
    }
}
```
