# git-batch ![](https://img.shields.io/npm/v/git-batch.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)

A batch Git tools

English | [简体中文](./doc/cndoc.md)


## install

```shell
npm install -g git-batch
```

## batch clone

```shell
mkdir targetDiar

cd targetDiar
```


### use `.json` config file
```shell
git-batch clone xxx.json
```

**format-1**  

```json
[
  "https://github.com/angular/angular",
  "https://github.com/facebook/react.git",
  "https://github.com/vuejs/vue-next"
]
```

**format-2**  

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

### use `.xlsx` config file
```shell
git-batch clone xxx.xlsx
```
1. Set the header for the first row.
2. Set repository url in any column, the column header string must contain `repositoryUrl` or `仓库地址`.

![xlsx config img](https://github.com/siegaii/git-batch/blob/main/doc/xlsxconfig.png?raw=true)

> If the configured project address does not end in `.git`, the program will automatically add.git