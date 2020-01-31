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
