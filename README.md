# xiao-zao-cli

## 安装

```$xslt
npm install -g xiao-zao-cli
// or
yarn global add xiao-zao-cli
```

## 使用

```$xslt
// 初始化
xiao-zao init

// 开发运行
xiao-zao start

// 打包
xiao-zao build
```

## 介绍

### 主要功能

- 开发时样式热加载
- 支持 Sass、Less 和 Stylus 样式预处理自动编译
- autoprefixer 前缀补全
- px -> rem 自动转换
- 部署构建时代码合并压缩

### 相关组件依赖

- [Zepto](http://zeptojs.com/) 默认引入

### 基础目录结构

很多预制的功能与目录结构相关，请确认项目包含以下文件和目录，否则可能执行失败。

```sh
.
├── package.json
└── src
    ├── css
    │   └── main.scss               # 引入的样式文件（在 main.js 中）
    ├── img                         # 图片 资源的目录
    ├── plugin                      # 音频 资源的目录（可选）
    ├── index.html                  # html 模板
    └── js
        └── main.js                 # 入口 js 文件
```

## 感谢

项目的灵感和某些 Webpack 的配置来自 [create-react-app](https://github.com/facebookincubator/create-react-app)、[elf](https://github.com/o2team/elf)

## 许可

MIT


[![npm](https://img.shields.io/npm/v/xiao-zao-cli.svg)](https://www.npmjs.com/package/xiao-zao-cli)
[![npm](https://img.shields.io/npm/dm/xiao-zao-cli.svg)](https://www.npmjs.com/package/xiao-zao-cli)
[![npm](https://img.shields.io/npm/dt/xiao-zao-cli.svg)](https://www.npmjs.com/package/xiao-zao-cli)
[![npm](https://img.shields.io/npm/l/xiao-zao-cli.svg)](https://github.com/syanbo/xiao-zao-cli/blob/master/LICENSE)
