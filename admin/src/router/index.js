import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
    import ('../views/Login.vue')
const Register = () =>
    import ('../views/Register.vue')
const AdminHome = () =>
    import ('../views/AdminHome.vue')
const KindList = () =>
    import ('../components/kind/KindList')
const UserList = () =>
    import ('../components/user/UserList')
const LostList = () =>
    import ('../components/LostList')
const FoundList = () =>
    import ('../components/FoundList')
const LostDetail = () =>
    import ('../components/lostDetail')
const FoundDetail = () =>
    import ('../components/foundDetail')
const ChangeAdd = () =>
    import ('../components/change/ChangeAdd')
const ChangeList = () =>
    import ('../components/change/ChangeList')
const Goods = () =>
    import ('../views/Goods.vue')
const Home = () =>
    import ('../views/Home')
const Index = () =>
    import ('../components/Index')
const Lost = () =>
    import ('../components/Lost')
const Found = () =>
    import ('../components/Found')
const LostHistory = () =>
    import ('../components/LostHistory')
const FoundHistory = () =>
    import ('../components/FoundHistory')
const Publish = () =>
    import ('../components/Publish')
const EditThank = () =>
    import ('../components/EditThank')
const ClaimList = () =>
    import ('../components/ClaimList')
const ThankList = () =>
    import ('../components/ThankList')

import { Message } from 'element-ui';

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
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
            { path: '/goods', component: Goods },
            { path: '/thankList', component: ThankList }
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
            { path: '/change/add', component: ChangeAdd },
            { path: '/change/list', component: ChangeList },
            { path: '/thank/list', component: EditThank },
            { path: '/claim/list', component: ClaimList },

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
    const isLogin = localStorage.getItem('eleToken') ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        if (to.path == '/publish' && !isLogin) {
            Message({
                type: 'warning',
                message: '请您先登录!'
            })
            next('/login')
        } else {
            next()
        }
    }
})
export default router