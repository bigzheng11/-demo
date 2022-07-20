import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '../views/UserManage'
import UserUpdate from '../views/UserUpdate'
import AddUser from '../views/AddUser'
import index from '../views/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '用户管理',
    component: index,
    show:true,
    children:[
      {
        path: '/userManage',
        name: '查询人员信息',
        component: UserManage
      },  {
        path: '/AddUser',
        name: '添加人员信息',
        component: AddUser
      }, 
    ]
  },
  {
    path: '/UserUpdate',
    name: '更新人员信息',
    component: UserUpdate,
    show:false

  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
