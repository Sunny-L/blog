import Index from '../pages/Index'
import Posts from '../pages/Posts'
import PostDetail from '../pages/PostDetail'
import System from '../pages/System'
import Tags from '../pages/Tags'

const router = [
    {
        name: '首页',
        path: '/home',
        component: Index
    }, {
        name: '文章',
        path: '/posts',
        component: Posts,
        routes: [
            {
                path: '/:id',
                component: PostDetail
            }
        ]
    }, {
        name: '标签',
        path: '/tags',
        component: Tags
    }, {
        name: '系统设置',
        path: '/system',
        component: System
    }
]

export function getRouteConfig(route, parent) {
    return route.reduce((curr, next) => {
        curr.push({
            path: parent ? parent.path + next.path : next.path,
            component: next.component
        })
        if(next.routes) curr = [...curr, ...getRouteConfig(next.routes, next)]
        return curr
    }, [])
}

export default router