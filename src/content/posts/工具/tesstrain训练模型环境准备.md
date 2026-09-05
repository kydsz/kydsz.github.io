---
id: "tesstrain训练模型环境准备"
title: "Linux 下训练自定义验证码模型（关键步骤笔记）"
excerpt: "在 Linux 下用 tesstrain 训练自定义验证码模型的关键步骤笔记"
date: "2025-09-11"
readTime: "3 min"
tags: ["工具"]
emoji: "🛠️"
---
**在 Linux 下用 tesstrain 训练自定义验证码模型的关键步骤笔记**

------

# Linux 下训练自定义验证码模型（关键步骤笔记）

## 1️⃣ 系统准备

- 安装必要工具：

```bash
sudo apt update
sudo apt install tesseract-ocr tesseract-ocr-eng build-essential git wget
```

- 升级 Make 到 4.4（如果默认版本太低）：

```bash
# 下载源码
wget --no-check-certificate https://ftp.gnu.org/gnu/make/make-4.4.tar.gz
tar -xzvf make-4.4.tar.gz
cd make-4.4
./configure --prefix=/usr/local
make -j$(nproc)
sudo make install
```

- 确认版本：

```bash
make --version  # 应显示 4.4
```

------

## 2️⃣ 准备验证码训练数据

- 图片放在 `/home/user/captchas`
- 每张图片对应 `.gt.txt`，文件内容是图片上的文本：

```bash
cd /home/user/captchas
for f in *.jpg; do
  name="${f%.*}"
  echo -n "$name" > "${name}.gt.txt"
done
```

- 生成训练文本：

```bash
ls *.jpg | sed 's/\.jpg$//' > training_text.txt
```

------

## 3️⃣ 配置 Tesseract 模型路径

- 系统基础英文模型路径：

```
/usr/share/tesseract-ocr/tessdata/eng.traineddata
```

- 设置环境变量：

```bash
export TESSDATA_PREFIX=/usr/share/tesseract-ocr
```

------

## 4️⃣ 处理 Makefile 默认路径问题

- Makefile 默认会找：

```
~/tesstrain/usr/share/tessdata/eng.traineddata
```

- 解决方法：

```bash
mkdir -p ~/tesstrain/usr/share/tessdata
cp /usr/share/tesseract-ocr/tessdata/eng.traineddata ~/tesstrain/usr/share/tessdata/
```

------

## 5️⃣ 创建 ground-truth 文件夹

- Makefile 期望 `${OUTPUT_DIR}-ground-truth/*.gt.txt`：

```bash
mkdir -p ~/tesstrain_output-ground-truth
cd /home/user/captchas
for f in *.gt.txt; do
  ln -s $(pwd)/$f ~/tesstrain_output-ground-truth/
done
```

------

## 6️⃣ 开始训练

```bash
cd ~/tesstrain
make training MODEL_NAME=captcha \
  START_MODEL=eng \
  MAX_ITERATIONS=500 \
  PSM=7 \
  DATA_DIR=/home/user/captchas \
  OUTPUT_DIR=~/tesstrain_output
```

### 训练流程关键点：

1. **combine_tessdata**：从基础英文模型生成初始训练文件
   - 输出 `.config`, `.unicharset`, `.inttemp` 等
2. **unicharset_extractor**：分析 `.gt.txt`，生成 `my.unicharset`
3. **mftraining / cntraining / psm / shape / dawg** 等步骤：根据训练数据生成最终 `.traineddata`
4. 输出文件：

```
~/tesstrain_output/captcha.traineddata
```

------

## 7️⃣ 注意事项

- **不要用 root** 执行 make，普通用户即可
- 确认 Make 4.4 优先：

```bash
export PATH=/usr/local/bin:$PATH
```

- `START_MODEL` 只能写模型名称（`eng`），不要写绝对路径
- `.gt.txt` 文件必须和图片一一对应
