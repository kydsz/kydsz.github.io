---
id: "C代码-贪吃蛇"
title: "贪吃蛇"
excerpt: "基于 EasyX 图形库的贪吃蛇小游戏：方向键控制蛇移动、随机刷食物、撞墙/撞自己判定游戏结束。"
date: "2024-01-13"
readTime: "1 min"
tags: ["C++"]
emoji: "🔧"
---
> 基于 EasyX 图形库的贪吃蛇：方向键控制蛇移动、吃食物变长、撞墙或撞身即结束。

```c++
#include <graphics.h>
#include <conio.h>
#include <time.h>
#include <iostream>
#include <windows.h>
using namespace std;

// 常量，变量， 结构体
#define xLen 800
#define yLen 600
int gameSpeed = 50;
bool capslock = false;
struct SNAKE{
    int x[xLen * yLen];
    int y[xLen * yLen];
    int node;  // 蛇长度
    bool die = false;
}snake;

struct FOOD{
    int x,y;
    bool yes = true;
}food;




// 初始化
void initGame(){
    // 设置随机数种子
    srand(time(NULL));
    food.yes = true; // 确保每次新的开始都会刷新食物

    // 蛇风格
    setlinecolor(RED);


    //    初始蛇,下标0为蛇头
    snake.x[0] = 100;
    snake.y[0] = 100;
    snake.x[1] = 90;
    snake.y[1] = 100;
    snake.x[2] = 80;
    snake.y[2] = 100;
    snake.node = 3;
    snake.die = false;

    //    切换大写
    if (!(GetKeyState(VK_CAPITAL) & 0x0001)) {
        // 如果 Caps Lock 当前未被激活，模拟按下 Caps Lock 键来激活大写锁定
        capslock = true;
        keybd_event(VK_CAPITAL, 0x45, KEYEVENTF_EXTENDEDKEY | 0, 0);
        keybd_event(VK_CAPITAL, 0x45, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0);
    }
}


static void playGame(){
    char key, tend = 'd';  // 初始方向
    int h_x, h_y; // 存储蛇头坐标



    while (true){
        while (!kbhit()) {
            // 判断是否撞墙
            if (snake.x[0] < 10 || snake.x[0] > xLen-10|| snake.y[0] < 10 || snake.y[0] > yLen-10) {
                snake.die = true;
                break;
            }
            // 生成食物
            if (food.yes) {
                food.x = rand() % xLen - 10;
                food.y = rand() % yLen - 10;
                // 保证为整格
                while (food.x % 10 != 0 || food.x < 10) ++food.x;
                while (food.y % 10 != 0 || food.y < 10) ++food.y;
                food.yes = false;
            }
            cleardevice();
            // 显示食物
            setfillcolor(GREEN);
            fillrectangle(food.x - 5,food.y + 5,food.x + 5,food.y - 5);
            //    显示蛇
            for (int i = 0; i < snake.node; ++i) {
                i == 0 ? setfillcolor(RED): setfillcolor(WHITE);
                fillrectangle(snake.x[i] - 5, snake.y[i] + 5, snake.x[i] + 5, snake.y[i] - 5);
            }

            // 吃食物
            if (snake.x[0] == food.x && snake.y[0] == food.y) {
                snake.node++;
                for (int i = snake.node - 1; i > 0; --i) {
                    snake.x[i] = snake.x[i-1];
                    snake.y[i] = snake.y[i-1];
                }
                // 添加食物到蛇头部
                snake.x[0] = food.x;
                snake.y[0] = food.y;
                // 重新生成食物
                food.yes = true;
            }


            h_x = snake.x[0];
            h_y = snake.y[0];
            Sleep(gameSpeed);
            switch (tend) {
                case 'd': {
                    snake.x[0] += 10;
                    break;
                }
                case 'a': {
                    snake.x[0] -= 10;
                    break;
                }
                case 'w': {
                    snake.y[0] -= 10;
                    break;
                }
                case 's': {
                    snake.y[0] += 10;
                    break;
                }
            }
            for (int i = snake.node - 1; i > 1; --i) {
                snake.x[i] = snake.x[i-1];
                snake.y[i] = snake.y[i-1];
            }
            snake.x[1] = h_x;
            snake.y[1] = h_y;

        }
        if (snake.die) {  // 蛇死亡
            break;
        }

        key = getch();

        // Esc退出，Esc对应ASCII表值为27
        if (key == 27) return;

        // 按下空格暂停
        if (key == ' ')
            while (true){
                outtextxy(xLen/2-50, yLen/2,"游戏已暂停");
                key = getch();
                if (key == 27) return;
                if (key == ' ') break;
            }

        // 换方向
        if ( (key == 'a' || key == 'A') && tend != 'd') {
            tend = 'a';
        } else if ( (key == 'd' || key == 'D') && tend != 'a') {
            tend = 'd';
        } else if ( (key == 'w' || key == 'W') && tend != 's') {
            tend = 'w';
        } else if ( (key == 's' || key == 'S') && tend != 'w') {
            tend = 's';
        }

    }
}



bool printScore(){
    char F[100];
    sprintf(F, "得分：%d", snake.node-3);
    outtextxy(20, 60,F);
    outtextxy(20, 30,"1.结束, 2.继续");
    char key;
    while (true) {
        key = getch();
        if (key == 27) {
            return true;
        }
        if (key == '1') {
            return true;
        } else if (key == '2') {
            return false;
        }
    }
}


void closeGame(){
    outtextxy(0, 0, "Game over!");

    getch();
    // 关闭窗口
    closegraph();

    // 关闭大写
    if (capslock) {
        // 如果 Caps Lock 当前未被激活，模拟按下 Caps Lock 键来激活大写锁定
        keybd_event(VK_CAPITAL, 0x45, KEYEVENTF_EXTENDEDKEY | 0, 0);
        keybd_event(VK_CAPITAL, 0x45, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0);
    }
}
int main() {
    int i = 0;
    initgraph(xLen, yLen);

    while (true) {
        initGame();
        playGame();
        if (printScore()) break;
    }
    closeGame();
    return 0;
}
```
