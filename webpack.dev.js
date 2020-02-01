//合并多个配置文件
const merge=require('webpack-merge')
const base=require('./webpack.base')

//merge（配置a，配置b）
module.exports = merge(base,{
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    devServer:{
        open:true, //配置好后自动打开
        port:3001, //该服务的端口号
    },
});
