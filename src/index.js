//保证所有的js代码都可以转化为兼容版本的
document.addEventListener("click", ()=>{
    import('./click.js').then((res)=>{
        res.default()
    })
})
