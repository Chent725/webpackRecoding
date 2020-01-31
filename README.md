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
  "main": a.js,a.jspts": {
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
    entry:inde1x.inde1x.js配置
    output:{
        //输出文件名
        filename:'bundle.js',
        //输出文件夹,输出到当前文件目录下的bundle目录中
        path:path.resolve(__dirname,'bundle')
    }
};

```

### url-loader 处理图片

把图片解析成base64位格式的字符串

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

### css-loader   处理css

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

### less-loader 处理less

处理less文件  并解析less代码

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

### postcss-loader 处理css兼容

使用 [PostCSS](http://postcss.org/) 加载和处理兼容 CSS/less/sass文件

该loader需和autoprefixer配合使用

```js
npm i -D postcss-loader autoprefixer
```

添加 `postcss.config.js`:

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

In [webpack](https://webpack.js.org/) 

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
}
```

### MiniCssExtractPlugin 压缩css为独立文件

该插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件

首先，安装`mini-css-extract-plugin`：

```bash
npm install --save-dev mini-css-extract-plugin
```

**webpack.config.js**

```js
plugins: [
        //必须配置打包后的文件名
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //该插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    }
```

### optimize-css-assets-webpack-plugin 压缩css

```
npm install --save-dev optimize-css-assets-webpack-plugin
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

**webpack.config.js**

```js
plugins: [
        //必须配置打包后的文件名
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new OptimizeCSSAssetsPlugin()
    ],
```

### HtmlWebpackPlugin 自动创建html并且引入css/js外链

安装

```bash
npm install --save-dev html-webpack-plugin
```

使用

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/template.html",
            minify:{
                //压缩空格
                collapseWhitespace: true,
                //删除注释
                removeComments: true,
                //删除冗余属性
                removeRedundantAttributes: true,
                //删除script的src属性
                removeScriptTypeAttributes: true,
                // 删除link的ref属性
                removeStyleLinkTypeAttributes: true,
                //使用短文档类型
                useShortDoctype: true
            }
        })
    ],
```

### filename

不仅可以配置文件名也可以配置文件存储路径

```js
new MiniCssExtractPlugin({
    //生成css目录下的index文件
    filename: 'css/index.css',
}),
```

### 多页打包

配置多入口

```js
  entry: {
        a:'./src/a.js',
        b:index.jindex.js  },
```

配置多出口、多页面

```js
    //配置多个出口配置
    output: {
        //输出文件名
        filename: 'js/[name].js',
        //输出文件夹
        path: path.resolve(__dirname, 'bundle')
    },
    plugins: [
        //必须配置打包后的文件名
        new MiniCssExtractPlugin({
            //生成多个css目录下的css文件
            filename: 'css/[name].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new HtmlWebpackPlugin({
            filename: "a.html",
            template: "src/template.html",
            minify:{
                //压缩空格
                collapseWhitespace: true,
                //删除注释
                removeComments: true,
                //删除冗余属性
                removeRedundantAttributes: true,
                //删除script的src属性
                removeScriptTypeAttributes: true,
                // 删除link的ref属性
                removeStyleLinkTypeAttributes: true,
                //使用短文档类型
                useShortDoctype: true
            },
            chunks: ['a']
        }),
        //配置多个页面
        new HtmlWebpackPlugin({
            filename: "b.html",
            template: "src/template.html",
            minify:{
                //压缩空格
                collapseWhitespace: true,
                //删除注释
                removeComments: true,
                //删除冗余属性
                removeRedundantAttributes: true,
                //删除script的src属性
                removeScriptTypeAttributes: true,
                // 删除link的ref属性
                removeStyleLinkTypeAttributes: true,
                //使用短文档类型
                useShortDoctype: true
            },
            //块，引入对应的链接
            chunks: ['b']
        })
    ],
```

### webpack-dev-server 解决开发环境的跨域问题

安装

```js
npm i webpack-dev-server 
```

in webpack.config.js

3001端口向6000端口发起axios请求

```js
 devServer:{
        open:true, //配置好后自动打开
        port:3001, //该服务的端口号
        contentBase:'./bundle',//开启的服务能够访问bundle目录下的资源
        proxy:{
            '/api':{
                target:'http://localhost:6000',//api开头的路径就转发
                pathRewrite:{'^/api':'/'},    //路径重写
            },
        }
    },
```

创造跨域问题

```js
import axios from 'axios'

axios.get('/api/user')
axios.get('/api/home')
axios.get('/api/lala')
```

6000端口

```js
const express = require('express')

const app = express()


app.get('/user',(req,res)=>{

    res.send({name:'我是user的数据'})
})

app.get('/home',(req,res)=>{
    res.send({name:'我是home的数据'})
})

app.get('/lala',(req,res)=>{
    res.send({name:'我是lala的数据'})
})

app.listen(6000,()=>{
    console.log('6000端口运行了')
})

```

### webpack-dev-server 配置仿造数据和接口

以便再开发过程中，模拟接口和数据，和后台同步进行，避免拉进度。

`devServer.before`

in webpack.config.js

必须像后台一样传入app

```js
devServer:{
        open:true, //配置好后自动打开
        port:3001, //该服务的端口号
        contentBase:'./bundle',//开启的服务能够访问bundle目录下的资源
        proxy:{
            '/api':{
                target:'http://localhost:3001',//api开头的路径就转发,仿造接口，此处同源
                pathRewrite:{'^/api':'/'},    //路径重写
            },
        },
        before (app) { //必须像后台一样传入app
            app.get('/api/user',(req,res)=>{
                res.send(data.user)
            })

            app.get('/api/home',(req,res)=>{
                res.send(data.home)
            })

            app.get('/api/lala',(req,res)=>{
                res.send(data.lala)
            })
        }
    },
```

in data.json

```json
{
  "user":{
    "name":"我是user的数据"
  },
  "home":{
    "name":"我是home的数据"
  },
  "lala":{
    "name":"我是lala的数据"
  }
}

```

