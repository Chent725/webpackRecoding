const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//自定义全局变量，需要引入webpack
const webpack = require('webpack')
//每次打包清空原出口文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'../dist'),//path必须是个绝对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        }),
        //自定义全局变量
        new webpack.DefinePlugin({
            // 在此构造函数中需要注意字符串需要经过转义，不能直接写
            DEV:JSON.stringify('development'),
            WANGCHUN:JSON.stringify({name:'heaven'})
        })
    ],
    optimization: {
        splitChunks: {chunks: "all"}
    }
}
