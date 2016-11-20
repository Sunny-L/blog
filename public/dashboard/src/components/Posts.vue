<style scoped>

</style>
<template>
    <div class="page-view page-system">
        <section>
            <h2 class="section-header">文章管理</h2>
            <router-link :to="{path:'posts/add'}">新增</router-link>
            <div class="section-body">
                <div class="card" v-for="(item,index) in items">
                    <div class="card-header">
                        <div class="operation">
                            <router-link :to="{path:'posts/detail/'+item._id}">编辑</router-link>
                        </div>
                        <div class="flex flex-center">
                            <h4>{{item.title}}</h4>
                            <span>
                                {{item.last_update_time}} | 
                                <span v-if="item.is_publish" class="color-blue">已发布</span>
                                <span v-else class="color-green">未发布</span>
                            </span>
                        </div>
                    </div>
                    <div class="card-body">{{item.introduce}}</div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import timeago from 'timeago.js'
    export default {
        data() {
            return {
                items: []
            }
        },
        mounted: function() {
            fetch('/admin/posts',{
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 0) {
                        data.info.posts.forEach(item => {
                            item.create_time = timeago().format(new Date(item.create_time), 'zh_CN')
                            item.last_update_time = timeago().format(new Date(item.last_update_time), 'zh_CN')
                        })
                        this.items = data.info.posts
                    }
                })
        },
    }
</script>