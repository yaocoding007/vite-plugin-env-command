<h2 align='center'><samp>vite-plugin-env-command</samp></h2>

<p align='center'>在<samp>Vite.js</samp>项目中获取package.json中scripts里指令上的参数(build:test->test)添加到环境变量中 </p>


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

### Options 🎁

```js

/**
 * 获取指令上的参数
 * 
 * @example  yarn start -> undefined
 * @example  yarn start:staging -> 'staging'
*/
getCommandArgv()


/****——————————————————————————**/

interface Options {
  /**
   * 设置在 process.env上的key
   * 可选参数 默认值是 APP_ENV
  */
  key?: 'string'
  /**
   * 指令上为设置参数时的默认值 
   * 可选参数 默认值是 dev
   * @example yarn start -> 'dev'
  */
  defaultEnv?: 'string'
}

SetEnvByCommandArg(options?:Options)

```


## Usage 🚀

在vite.config.ts中设置如下:

```js

import { defineConfig } from 'vite'

import SetEnvByCommandArg, { getCommandArgv } from 'vite-plugin-env-command';

export default defineConfig({
  plugins: [
    SetEnvByCommandArg({
        key: "APP_ENV",
    }),
  ],
})

```
在package.json设置指令
```
"scripts": {
  "start": "vite",
  "start:staging": "vite",
  "start:prod": "vite",
  "build": "tsc && vite build",
  "build:test": "tsc && vite build",
  "build:staging": "tsc && vite build",
  "build:prod": "tsc && vite build",
}
```



在代码里这样获取参数:

```js
// 这样就可以取到指令":"后的参数了 
// yarn build:staging 
// appMode === 'staging'
const appMode = process.env.APP_ENV;
```