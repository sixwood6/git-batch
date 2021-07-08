# git-batch ![](https://img.shields.io/npm/v/git-batch.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)

[English](../README.md) | 简体中文

这是一个可以批量操作 git 的命令行工具 

## 安装

```shell
npm install -g git-batch
```

## 批量克隆

使用 clone 指令可以批量批量克隆 git 仓库，配置文件支持 `.json` 和 `.xlsx` 格式文件

```shell
mkdir targetDiar

cd targetDiar
```


### 使用 `.json` 配置文件
```shell
git-batch clone xxx.json
```

**格式1**  

```json
[
  "https://github.com/angular/angular",
  "https://github.com/facebook/react.git",
  "https://github.com/vuejs/vue-next"
]
```

**格式2**  

```json
[
  {
    "url": "https://github.com/angular/angular"
  },
  {
    "url": "https://github.com/facebook/react.git"
  },
  {
    "url": "https://github.com/vuejs/vue-next"
  }
]
```

### 使用 `.xlsx` 配置文件
```shell
git-batch clone xxx.xlsx
```
1. 为第一行设置表头
2. 在任意列设置 仓库地址表头（字符串中需要包含`仓库地址` 或者 `repositoryUrl`）字符串用于标记仓库地址列的位置

![xlsx config img](https://github.com/siegaii/git-batch/blob/main/doc/xlsxconfig.png?raw=true)

> 若配置的项目地址中不以 `.git`结尾会自动补全