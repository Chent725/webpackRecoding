//依赖vue
import Vue from 'vue'
import App from './App.vue'

const vm = new Vue({
    //选择runtime 构建方式
    render:h=>h(App)
}).$mount('#app')
