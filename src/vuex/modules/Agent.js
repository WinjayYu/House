import {
  POST_AGENT_LIST_SUCCESS,
  POST_AGENT_LIST_FAIL
} from '../mutation-types'
import Api from '../../api/api'
import { Message } from 'element-ui';

const state = {
  agentList: [],
  agentPage:{}
}

// getters
const getters = {
  agentList: state => state.agentList,
  agentPage: state => state.agentPage
}

//actions
const actions = {
  //待审核经纪人列表
   agentList({ commit }, params){
    Api.userList(params).then(response => {
      if(response.data.status == 0)
      {
commit(POST_AGENT_LIST_SUCCESS, response.data)
    }else {
      {
        Message.error(response.data.msg)
      }
    }

    }, err => {
      console.log(err)
      commit(POST_AGENT_LIST_FAIL, err)
    })
  },
}

const mutations = {
  [POST_AGENT_LIST_SUCCESS] (state, data) {
    state.agentList = data.data.list
    state.agentPage = data.data.page
    console.log(state.agents)
  },
  [POST_AGENT_LIST_FAIL] (state, err) {
    console.log(err)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
