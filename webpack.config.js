const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //打包后的代码在开发环境中 打包后的代码不会被压缩
    mode: 'development',
    //入口配置
    entry: './src/index.js',
    //出口配置
    output: {
        //输出文件名
        filename: 'js/main.js',
        //输出文件夹
        path: path.resolve(__dirname, 'bundle')
    },
    plugins: [
        //必须配置打包后的文件名
        new MiniCssExtractPlugin({
            //生成css目录下的index文件
            filename: 'css/index.css',
        }),
        new OptimizeCSSAssetsPlugin(),
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
                //注意执行顺序，loader解析顺序是从下到上或者从右到左所以打包要写在展示之前
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    "postcss-loader"
                ]

            }
        ]
    }
};
