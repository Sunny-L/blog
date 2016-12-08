<style>
</style>
<template>
    <header>
        <div class="logo"></div>
        <div class="info">{{username}} / <a href="/admin/logout">退出</a></div>
    </header>
</template>
<script>
    export default {
        data(){
            return{
                username:'Sunny-L'
            }
        },
        methods: {
            logout(){
                fetch('/admin/logout')
                    .then(res => res.json())
                    .then(data => {
                        location.href = '/admin/login'
                    })
            },
        }
    }
</script>
