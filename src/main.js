import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import '../theme/index.css'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'
// 引入vue-amap
import AMap from 'vue-amap';

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import UserCenter from './components/UserCenter.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import UnCheckAgent from './components/UserManager/UnCheckAgent.vue'
import Agent from './components/UserManager/Agent.vue'
import User from './components/UserManager/User.vue'
import UnCheckHouse from './components/HouseManager/UnCheckHouse.vue'
import House from './components/HouseManager/House.vue'
import echarts from './components/charts/echarts.vue'
import OrderList from './components/OrderManager/OrderList.vue'
import PublishHouse from './components/HouseManager/PublishHouse.vue'
import RegisterAgent from './components/RegisterAgent.vue'
import test from './components/test.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德的key
    key: '976f222215748be4c19cce3568c4fdac',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

const routes = [
    {
        path: '/login',
        component: Login,
        hidden: true//不显示在导航中
    },
    {
        path: '/register',
        component: Register,
        hidden: true//不显示在导航中
    },
    {
        path: '/registerAgent',
        component: RegisterAgent,
        hidden: true//不显示在导航中
    },
    {
        path: '/userCenter',
        component: UserCenter,
        hidden: true//不显示在导航中
    },
    //{ path: '/main', component: Main },*/
    /*{
     path: '/',
     component: Home,
     name: '',
     iconCls: 'fa fa-bar-chart',
     leaf: true,//只有一个节点
     children: [
     { path: '/echarts', component: echarts, name: '数据统计' }
     ]
     },*/
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-university',
        leaf: true,
        children: [
            /* { path: '/UnCheckHouse', component: UnCheckHouse, name: '房源审核' },*/
            {path: '/House', component: House, name: '房源列表'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user-o',//图标样式class
        leaf: true,
        children: [
            //{ path: '/main', component: Main },
            /*{ path: '/UnCheckAgent', component: UnCheckAgent, name: '经纪人审核' },*/
            {path: '/Agent', component: Agent, name: '经纪人'},
            /* { path: '/User', component: User, name: '普通用户' },*/
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa  fa-send-o',
        leaf: true,//只有一个节点
        children: [
            {path: '/OrderList', component: OrderList, name: '我的订单'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            {path: '/PublishHouse', component: PublishHouse, name: '发布房源'}
        ]
    },
    {
        path: '/test',
        component: test,
        hidden: true//不显示在导航中
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: {App}
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
