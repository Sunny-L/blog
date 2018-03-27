import Index from './pages/Index'
import Posts from './pages/Posts'
import PostDetail from './pages/PostDetail'
import Tags from './pages/Tags'
import System from './pages/System'


export const getRouteConfig = () =>{
  return [{
    name: '首页',
    path: '/',
    component: Index,
  },{
    name: '文章',
    path: '/posts',
    component: Posts,
  },{
    name: '标签',
    path: '/tags',
    component: Tags,
  },{
    name: '系统',
    path: '/system',
    component: System,
  }]
}