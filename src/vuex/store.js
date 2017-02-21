import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import UnCheckAgent from './modules/UnCheckAgent'
import Agent from './modules/Agent'
import User from './modules/User'
import House from './modules/House'
import Order from './modules/Order'


Vue.use(Vuex)


// 创建 store 实例
export default new Vuex.Store({
    modules: {
      UnCheckAgent,
      Agent,
      User,
      House,
      Order
    },
    actions,
    getters
  })
