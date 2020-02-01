const merge=require('webpack-merge')
const base=require('./webpack.base')
//merge（配置a，配置b）
module.exports = merge(base,{
    mode:'production',//打包后的代码在开发环境中 打包后的代码不会被压缩
})
