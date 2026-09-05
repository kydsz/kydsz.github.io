---
id: git-undo
title: 'Git 撤销操作速查：从工作区到远程'
excerpt: 'checkout、reset --soft/--mixed/--hard、revert、amend——按「改到哪一步了」对号入座，撤销再也不会心慌。'
date: '2025-06-08'
readTime: '4 min'
tags: ['工具']
emoji: '🌿'
---

撤销操作的恐惧来自「不知道自己会丢掉什么」。其实按修改所处的阶段对号入座，每条命令的后果就都清晰了。

## 还没 add（工作区）

```bash
git checkout -- <file>   # 撤销指定文件的修改
git checkout .           # 撤销所有文件的修改
```

## 已 add 未 commit（暂存区）

```bash
git reset HEAD <file>    # 从暂存区撤回工作区
git reset HEAD .         # 全部撤回
```

## 已 commit 未 push（本地提交）

```bash
git reset --soft HEAD^   # 保留在暂存区
git reset --mixed HEAD^  # 退回工作区（默认）
git reset --hard HEAD^   # 彻底丢弃，慎用
```

## 已 push（远程提交）

```bash
git revert <commit-id>   # 生成一条反向提交
git push
```

已推送的提交不要用 reset 改写历史，用 revert 生成一条「反向提交」，对协作者友好，历史也完整可查。

## 顺手记两条

```bash
git commit --amend       # 修改最后一次提交
git rebase -i HEAD~3     # 交互式变基：编辑/合并/删除提交
```

> reset 改写历史，revert 面向未来——分清这两句，撤销就不会闯祸。