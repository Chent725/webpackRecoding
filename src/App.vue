<template>
    <div>
        {{msg}}
        <button @click="handleClick">按钮</button>
    </div>
</template>

<script>
    export default {
        methods:{
            handleClick(){
                console.log(this.msg)
            }
        },
        data(){
            return {
                msg:'我是根组件的数据'
            }
        }
    }
</script>

<style >

</style>
