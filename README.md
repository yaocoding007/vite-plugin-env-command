<h2 align='center'><samp>vite-plugin-env-command</samp></h2>

<p align='center'>Expose environment variables by command argument to your client code in <samp>Vite.js</samp></p>


## Why? 🤔
当我们想去在不用的环境有不用的设置的时候
官方提供的.env .env.test 文件的形式 未免有点太繁琐了

一般不同的环境在打包的指令上会有所不用

我一般习惯这样做 `build:test` `build:pre`

这样就可以把指令上的参数 写到 process.env 上去区分

## Installation 💿

```
npm i -D vite-plugin-env-command # yarn add -D vite-plugin-env-command

```

## Usage 🚀

在vite.config.t中设置如下:

```js

import { defineConfig } from 'vite'

import CommandSetEnv, { getCommandArgv } from 'vite-plugin-env-command';

export default defineConfig({
  plugins: [
    CommandSetEnv({
        key: "APP_ENV",
    }),
  ],
})

```
在代码这样使用:

```js
const appMode = process.env.APP_ENV;
```