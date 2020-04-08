import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../public/iconfont/iconfont.css'
import * as echarts from 'echarts/lib/echarts';
// 引入 echarts 主模块。
import 'echarts/lib/echarts'
// 引入柱形图
import 'echarts/lib/chart/bar'
//// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')