---
id: "Renbat批量重命名工具"
title: "更详细的命令树（含子命令说明 + 标签）"
excerpt: "下面我给你生成一个更专业、更完整的版本，包含："
date: "2025-12-07"
readTime: "9 min"
tags: ["工具"]
emoji: "🛠️"
---

下面我给你生成一个**更专业、更完整的版本**，包含：

- **更详细的命令树（含注释、标签、简短说明）**
- **README 版本更完整的“子命令说明 + 标签（flags）”章节**
- **每个子命令的参数说明、用途、示例**

这是一个接近真实成熟 CLI 的文档结构（类似 Git、Cargo、ffmpeg）。

------

# ✅ **① 更详细的命令树（含子命令说明 + 标签）**

```
renbat                                     # 主程序
├── replace                                 # 正则替换文件名（强大、灵活）
│     ├── pattern (必填)                    # 正则匹配表达式
│     ├── replacement (必填)                # 替换文本，可包含模板变量
│     └── Flags
│           ├── --scope name|ext|full       # 替换范围，默认 name
│           └── --ignore-case               # 不区分大小写
│
├── full                                    # 修改完整文件名（name + ext）
│     └── <template>                        # 模板字符串
│
├── name                                    # 修改文件名部分（不含扩展名）
│     └── <template>
│
├── ext | extension                         # 修改扩展名
│     └── <new_extension>
│
├── addext                                  # 添加扩展名
│     └── <extension>
│
├── delext                                  # 删除扩展名
│
├── case                                    # 文件名大小写转换
│     ├── upper                             # ABC
│     ├── lower                             # abc
│     ├── title                             # Abc
│     ├── snake                             # abc_def
│     ├── kebab                             # abc-def
│     ├── camel                             # abcDef
│     └── pascal                            # AbcDef
│
├── number                                  # 添加序号
│     └── Flags
│           ├── --start <num>               # 默认 1
│           ├── --step <num>                # 默认 1
│           ├── --pad <digits>              # 补零位数
│           ├── --position prefix|suffix|replace
│           └── --sort name|mtime|size
│
├── tc                                      # 编码转换
│     └── Flags
│           ├── --from <charset>
│           └── --to <charset>
│
├── preview                                 # 预览任意命令
│     └── <subcommand> [args]
│
├── undo                                    # 撤销最近操作
│     └── [steps]                           # 支持多步，如 5
│
├── reset                                   # 重置到指定版本
│     └── <version-id>
│
├── log                                     # 查看操作日志
│     └── Flags
│           ├── --limit <n>
│           ├── --detail                    # 显示完整旧名与新名
│           └── --json                      # 输出 JSON
│
├── dellog                                  # 删除日志
│     └── Flags
│           ├── --all
│           ├── --days <n>                  # 删除 n 天前日志
│           └── --before <date>
│
├── find                                    # 文件过滤器（强建议加入）
│     └── Flags
│           ├── --name <pattern>
│           ├── --ext <ext>
│           ├── --regex <pattern>
│           ├── --min-size <size>
│           ├── --max-size <size>
│           ├── --mtime <expr>              # 时间过滤，如 "<2024-01-01"
│           └── --type file|dir
│
├── plugin                                  # 插件系统
│     ├── install <path>
│     ├── uninstall <plugin-name>
│     ├── list
│     └── init
│
└── config                                  # 配置系统与项目参数
      ├── set <key> <value>
      ├── get <key>
      ├── list
      └── reset

# 全局 Flags（所有子命令共享）
  -p, --path <path>                         # 指定路径
  -a, --all                                 # 包括目录与文件
  --hide                                    # 包含隐藏文件
  -r, --recursive                           # 递归处理文件夹
  --dry-run                                 # 不执行，只预览
  --sort name|mtime|ctime|size              # 排序
  --reverse                                 # 反向排序
  --conflict skip|overwrite|rename          # 冲突处理策略
  --no-log                                  # 不记录日志
  -y, --yes                                 # 自动确认
```

------

# ✅ **② README**

------

# Renbat

### *跨平台批量重命名命令行工具*

Renbat 是一个高性能、跨平台、可回滚、可扩展的批量重命名 CLI 工具。

支持：

✔ Windows
 ✔ macOS
 ✔ Linux

------

# 📌 目录

1. 功能说明
2. 安装
3. 快速使用
4. 子命令详解
5. 模板系统
6. 文件过滤器
7. 日志与回滚
8. 插件系统
9. 配置系统

------

# ✨ 功能概览

- 支持正则替换、模板重命名、扩展名处理
- 序号功能（带补零、排序控制）
- 文件名大小写转换
- 编码转换（GBK → UTF-8）
- 多级预览（preview / --dry-run）
- 日志记录 + 回滚（undo/reset）
- 插件系统（模板变量/规则扩展）
- 跨平台，单文件可执行

------

# 🚀 安装

```bash

```

------

# 🔥 快速上手

### 预览替换

```
renbat preview replace "IMG_" "Photo_"
```

### 执行替换

```
renbat replace "IMG_" "Photo_"
```

### 添加序号

```
renbat number --start 1 --pad 3
```

------

# 🧩 子命令详解（最重要部分）

以下为每个子命令的详细结构、作用与示例。

------

## **1. replace — 正则替换**

使用正则表达式搜索并替换文件名。

```
renbat replace <pattern> <replacement>
```

**Flags：**

| Flag            | 用途       | 默认  |
| --------------- | ---------- | ----- |
| `--scope name`   | ext        | full |
| `--ignore-case` | 忽略大小写 | false |

**示例：**

```
renbat replace "v(\d+)" "version-$1"
renbat replace --scope full "IMG_(\d+)\.jpg" "Photo_$1.png"
```

------

## **2. full — 修改完整文件名**

```
renbat full "<template>"
```

示例：

```
renbat full "{date:YYYYMMDD}_{index}"
```

------

## **3. name — 修改文件名部分（不改扩展名）**

```
renbat name "<template>"
```

示例：

```
renbat name "{name:snake}_{index:pad3}"
```

------

## **4. ext / extension — 修改扩展名**

```
renbat ext "jpg"
```

示例：

```
renbat ext png
```

------

## **5. addext — 添加扩展名**

```
renbat addext "bak"
```

------

## **6. delext — 删除扩展名**

```
renbat delext
```

------

## **7. case — 文件名大小写处理**

```
renbat case <mode>
```

模式支持：

- upper
- lower
- title
- snake
- kebab
- camel
- pascal

示例：

```
renbat case snake
```

------

## **8. number — 添加序号**

```
renbat number --start 1 --pad 3 --position prefix
```

**支持 Flags：**

| Flag              | 功能         |
| ----------------- | ------------ |
| `--start <n>`     | 起始序号     |
| `--step <n>`      | 递增步长     |
| `--pad <digits>`  | 序号补零位数 |
| `--position prefix` | suffix       |
| `--sort name`       | mtime        |

------

## **9. tc — 编码转换**

```
renbat tc --from gbk --to utf8
```

------

## **10. preview — 预览操作**

```
renbat preview <subcommand> [...]
```

示例：

```
renbat preview replace "A" "B"
```

------

## **11. undo — 撤销操作**

```
renbat undo
renbat undo 5
```

------

## **12. reset — 重置到某版本**

```
renbat reset 20241201_231500
```

------

## **13. log — 查看操作日志**

```
renbat log --limit 20
```

------

## **14. dellog — 删除日志**

```
renbat dellog --all
```

------

## **15. find — 文件筛选器（可作为前置过滤器）**

```
renbat find --ext jpg --name "*backup*"
```

可与其他命令组合：

```
renbat find --ext txt | renbat replace " " "_"
```

------

## **16. plugin — 插件管理**

```
renbat plugin install ./md5.js
renbat plugin list
```

------

## **17. config — 配置系统**

```
renbat config set preview.auto true
```

------

# 🧱 全局 Flags（所有命令适用）

| Flag                | 功能         |
| ------------------- | ------------ |
| `-p, --path <path>` | 指定路径     |
| `-a, --all`         | 包括文件夹   |
| `--hide`            | 包括隐藏文件 |
| `-r, --recursive`   | 递归目录     |
| `--dry-run`         | 仅预览       |
| `--sort name`       | mtime        |
| `--reverse`         | 反转排序     |
| `--conflict skip`   | overwrite    |
| `--no-log`          | 不记录日志   |
| `-y, --yes`         | 自动确认     |

------





# go

```csharp
renbat/
├── cmd/                        # CLI 层（Cobra）
│     ├── root.go               # 根命令
│     ├── replace.go            # replace 子命令
│     ├── full.go               # full 子命令
│     ├── name.go               # name 子命令
│     ├── ext.go                # ext 子命令
│     ├── addext.go             # addext 子命令
│     ├── delext.go             # delext 子命令
│     ├── case.go               # case 子命令
│     ├── number.go             # number 子命令
│     ├── tc.go                 # tc 子命令
│     ├── preview.go            # preview 子命令
│     ├── undo.go               # undo 子命令
│     ├── reset.go              # reset 子命令
│     ├── log.go                # log 子命令
│     ├── dellog.go             # dellog 子命令
│     ├── find.go               # find 子命令
│     ├── plugin.go             # plugin 子命令
│     └── config.go             # config 子命令
│
├── internal/                   # 核心逻辑
│     ├── fs/                   # 文件系统操作模块
│     │     ├── scanner.go      # 扫描器（递归、过滤器）
│     │     └── renamer.go      # 重命名执行器
│     │
│     ├── engine/               # 重命名引擎（参数 -> 结果）
│     │     ├── template.go     # 模板引擎（解析 {name}, {date}, {index}）
│     │     ├── regex.go        # 正则替换模块
│     │     ├── caseconv.go     # 大小写模块
│     │     ├── number.go       # 数字编号模块
│     │     ├── extension.go    # 扩展名规则
│     │     └── encode.go       # 编码转换
│     │
│     ├── history/              # 日志与回滚
│     │     ├── log.go          # 操作日志记录
│     │     ├── undo.go         # 回滚实现
│     │     └── storage.go      # 日志存储（JSON/TXT）
│     │
│     ├── config/               # 配置管理（Viper）
│     │     ├── config.go
│     │     └── default.go
│     │
│     ├── plugin/               # 插件系统（JS/Python/Lua）
│     │     ├── loader.go
│     │     ├── registry.go
│     │     └── vm_js.go        # JavaScript 插件
│     │
│     └── util/                 # 工具函数
│           ├── filter.go       # name/ext/regex 过滤器
│           ├── checksum.go     # md5/sha1 template
│           ├── validate.go
│           └── path.go
│
├── pkg/
│     └── renbat/               # SDK（供插件引用）
│
├── tests/                      # 单元测试
│     ├── replace_test.go
│     ├── template_test.go
│     ├── number_test.go
│     ├── case_test.go
│     ├── encode_test.go
│     └── scanner_test.go
│
├── build/
│     ├── release.sh            # 构建脚本
│     ├── cross-build.sh        # 交叉编译 Win/Mac/Linux
│     ├── package/              # 打包配置
│     │     ├── brew.rb
│     │     ├── scoop.json
│     │     └── deb/
│
├── scripts/                    # 辅助脚本
│     ├── gen-docs.go           # 自动生成 CLI 文档
│     └── update-readme.sh
│
├── .github/workflows/
│     └── build.yml             # CI/CD（Go Build + Test + Release）
│
├── go.mod
├── go.sum
└── main.go

```
