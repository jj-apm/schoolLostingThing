import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminHome from '../views/AdminHome.vue'
import KindList from '../components/kind/KindList'
import UserList from '../components/user/UserList'
import LostList from '../components/LostList'
import FoundList from '../components/FoundList'
import LostDetail from '../components/lostDetail'
import FoundDetail from '../components/foundDetail'
import Transaction from '../views/Transaction.vue'
import Home from '../views/Home'
import Index from '../components/Index'
import Lost from '../components/Lost'
import Found from '../components/Found'
import LostHistory from '../components/LostHistory'
import FoundHistory from '../components/FoundHistory'
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
            { path: '/lostHistory', component: LostHistory },
            { path: '/foundHistory', component: FoundHistory },
            { path: '/transaction', component: Transaction },
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
            { path: '/kind/list', component: KindList },
            { path: '/users/list', component: UserList },
            { path: '/lost/list', component: LostList },
            { path: '/found/list', component: FoundList },
        ]
    },
    {
        path: '/lostDetail',
        component: LostDetail
    },
    {
        path: '/foundDetail',
        component: FoundDetail
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