import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminHome from '../views/AdminHome.vue'
import KindAdd from '../components/kind/KindAdd'
import KindList from '../components/kind/KindList'
import Home from '../views/Home'
import Index from '../components/Index'
import Lost from '../components/Lost'
import Found from '../components/Found'
import Claim from '../components/Claim'
import Publish from '../components/Publish'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/index',
        children: [
            { path: '/index', component: Index },
            { path: '/lost', component: Lost },
            { path: '/found', component: Found },
            { path: '/publish', component: Publish },
            { path: '/claim', component: Claim }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/admin',
        component: AdminHome,
        children: [
            { path: '/kind/add', component: KindAdd },
            { path: '/kind/list', component: KindList }
        ]
    }
]

const router = new VueRouter({
        routes,
        mode: 'history'
    })
    //路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next('/login')
    }
})
export default router