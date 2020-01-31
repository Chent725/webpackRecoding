
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data=require('./data.json')
const path = require('path')
module.exports = {
    mode:'development',//打包后的代码在开发环境中 打包后的代码不会被压缩
    entry:'./src/index.js',
    output:{        //打包后文件的输入地址
        filename:'js/main.js',
        path:path.join(__dirname,'bundle'),//path必须是个绝对路径
    },
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
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/template.html'
        })
    ]
}
