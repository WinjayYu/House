'use strict'

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const baseUrl = 'https://ylili.cn/zaja';
//const baseUrl = 'http://localhost:8080/zaja'

export default {

  //获取未审核经纪人
  getUnCheckAgentList:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/back/uncheckagents').save({},params)
  },

  //审核经纪人
  reviewOperation:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/back/reviewoperation').save({},params)
  },
  //经纪人/用户列表
  userList:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/back/userlist').save({},params)
  },
  //房屋列表
  houseList:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/back/houselist').save({},params)
  },
  //审核房源
  reviewHouse:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/back/reviewhouse').save({},params)
  },
  //登录
  login:(params) =>
  {
    Vue.http.options.emulateJSON = true;
    return Vue.resource(baseUrl + '/api/user/login').save({},params)
  }

}
