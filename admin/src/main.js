import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
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
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
    preLoad: 1,
    loading: require('./assets/default.png')
})
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$event = new Vue();
import {
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Form,
    FormItem,
    Input,
    Button,
    Menu,
    MenuItem,
    Submenu,
    Avatar,
    Row,
    Card,
    Table,
    TableColumn,
    Select,
    Option,
    Divider,
    Pagination,
    Dialog,
    DatePicker,
    Col,
    Upload,
    Link,
    Tabs,
    TabPane,
    MessageBox,
    Message,
    MenuItemGroup,
    Carousel,
    CarouselItem
} from "element-ui";
Vue.use(Container).use(Header).use(TableColumn).use(Main).use(Aside).use(Footer).use(Dropdown).use(DropdownItem).use(DropdownMenu).use(Form).use(FormItem).use(Input).use(Button).use(Menu).use(MenuItem).use(Submenu)
    .use(Avatar).use(Row).use(Card).use(Table).use(Select).use(Option).use(Divider)
    .use(Pagination).use(Dialog).use(DatePicker).use(Col).use(Upload)
    .use(Link).use(Tabs).use(TabPane).use(MenuItemGroup).use(Carousel).use(CarouselItem);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')