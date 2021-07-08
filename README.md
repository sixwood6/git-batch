# git-batch

English | [简体中文](./doc/cndoc.md)

A batch Git tools

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

![xlsx config img](./xlsxconfig.png)

> If the configured project address does not end in `.git`, the program will automatically add.git