import Vue from 'vue'
import VueRouter from 'vue-router'
import path from 'path'
import vHeader from './components/public/Header.vue'
import vNav from './components/public/Nav.vue'
import Index from './components/Index.vue'
import Posts from './components/Posts.vue'
import PostsDetail from './components/PostsDetail.vue'
import Tags from './components/Tags.vue'
import System from './components/System.vue'
import Login from './components/Login.vue'

require('./main.css')


Vue.use(VueRouter)

const router = new VueRouter({
    //   mode: 'hashbang',
    //   base: path.join(__dirname,'src'),
    base: 'admin',
    routes: [{
        path: '/',
        component: Index,
    }, {
        path: '/posts',
        component: Posts
    }, {
        path: '/posts/detail/:id',
        component: PostsDetail
    }, {
        path: '/posts/add',
        component: PostsDetail
    }, {
        path: '/tags',
        component: Tags
    }, {
        path: '/system',
        component: System
    }, {
        path: '/login',
        component: Login
    }],
    linkActiveClass: 'active'
})

router.afterEach(transition => {
    setTimeout(function() {
        var pageView = new IScroll('.page-view', {
            mouseWheel: true,
            scrollbars: true
        })
    }, 2000)
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
    router,
    components: {
        vHeader,
        vNav,
    },
    template: `
    <div id="app">
      <div id="app-container">
        <vNav></vNaV>
        <div class="main-container">
            <vHeader></vHeader>
            <transition name="fade">
            <router-view class="view"></router-view>
            </transition>
        </div>
      </div>
    </div>
  `
}).$mount('#app-top')


export {
    router
}