
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
        //输出文件夹
        path:path.resolve(__dirname,'bundle')
    }
};
