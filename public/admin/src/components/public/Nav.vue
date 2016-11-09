<style scoped>
    nav {
        width: 90px;
        background: #000;
        padding-top: 100px;
    }
    
    nav .item {
        color: #fff;
        text-align: center;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
    
    nav .item a {
        color: #fff
    }
    
    nav .item a:hover,
    nav .item a.active {
        color: #0068d9
    }
</style>
<template>
    <nav>
        <div class="item">
            <router-link to="/" exact>首页</router-link>
        </div>
        <div class="item">
            <router-link to="/posts">文章</router-link>
        </div>
        <div class="item">
            <router-link to="/tags">标签</router-link>
        </div>
        <div class="item">
            <router-link to="/system">系统</router-link>
        </div>
    </nav>
</template>