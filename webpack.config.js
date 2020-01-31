
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
//解析和处理vue的组件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    module: {
        rules: [
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
    devServer:{
        open:true, //配置好后自动打开
        port:3001, //该服务的端口号
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        })
    ],
    // resolve:{
    //     alias:{     //该文件有 template compiler
    //   如果根组件有template选项  则必须配置  alias
    //   如果根组件没有template选项  则不需要配置  alias
    //         'vue$':'vue/dist/vue.esm.js'
    //     }
    // }
}
/*
*   vue-loader   解析vue文件
*   vue-template-compiler 解析vue文件的结构
* */
