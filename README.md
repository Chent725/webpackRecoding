# webpack

## 1、概念

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

## 2、打包准备

### 初始化项目

```js
npm init -y
```

### 在开发环境中安装webpack，如果是4.0以上版本还需安装webpack-cli

```
npm webpack webpack-cli -D
查看webpack版本号
npx webpack -v
```

### 打包

```js
npx webpack <打包文件>
默认打包在dust目录下main.js且是压缩版本的
```

### 自定义配置

package.json

```js
{
  "name": "day1",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    //自定义配置命令，npm run build ===npx webpack
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}

```

在文件夹中创建webpack.config.js

```js

const path=require('path');

module.exports={
    //打包后的代码在开发环境中 打包后的代码不会被压缩
    mode:'development',
    //入口配置
    entry:'./src/index.js',
    //出口配置
    output:{
        //输出文件名
        filename:'bundle.js',
        //输出文件夹,输出到当前文件目录下的bundle目录中
        path:path.resolve(__dirname,'bundle')
    }
};

```

### url-loader 图片打包

   这个loader可以把图片解析成base64位格式的字符串

*       解析成base64格式字符串 可以减少网络请求（只针对小图片）

需要配置loader

首先安装图片处理

```js
npm i url-loader -D
```

限制图片大小，小于8192字节的解析成babel64，超于8192字节的仍旧打包为图片

如果需要处理的图片名字和打包前名字一致，需要添加空位符，使用空位符需要先安装

```js
npm i file-loader -D
```

```js
rules: [
            {
                test: /\.(gif|png|jpg)$/,//匹配到(文件类型)结尾
                use:[
                    {
                        loader: 'url-loader', //在使用url-loader时可以进行的配置
                        options: {
                            limit: 8192,//小于8K将图片解析成base64 大于8K则处理成图片
                            name: '[name].[ext]'//设置打包后文件的名字[文件名][后缀]
                        }
                    }
                ]
            }
        ]
```

### css-loader    css打包

css-loader可以处理css文件  并解析css代码

首先安装css处理和读取处理

```js
npm i css-loader style-loader -D
```

注意执行顺序，webpack解析顺序是从下到上或者从右到左所以打包要写在展示之前

```js
{
    test:/\.css$/,
        use:[
            {loader: "style-loader"}, //这个loader生成style标签 并把style标签插入到head标签后面
            {loader: "css-loader"},//注意执行顺序，webpack解析顺序是从下到上或者从右到左所以打包要写在展示之前
        ]
},
```

### less-loader less打包

 这个loader可以处理less文件  并解析less代码

```js
npm i less-loader -D
```

```js
{
    test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }]
}
```

