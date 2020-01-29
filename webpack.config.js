const path = require('path');

module.exports = {
    //打包后的代码在开发环境中 打包后的代码不会被压缩
    mode: 'development',
    //入口配置
    entry: './src/index.js',
    //出口配置
    output: {
        //输出文件名
        filename: 'bundle.js',
        //输出文件夹
        path: path.resolve(__dirname, 'bundle')
    },
    module: {
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
                    },
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},//注意执行顺序，webpack解析顺序是从下到上或者从右到左所以打包要写在展示之前
                ]
            },
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
        ]
    }
};
