import {
  POST_UNCHECK_AGENT_SUCCESS,
  POST_UNCHECK_AGENT_FAIL
} from '../mutation-types'
import Api from '../../api/api'
import { Message } from 'element-ui';

const state = {
  uncheckAgents: [],
  uncheckPage:{}
}

// getters
const getters = {
  uncheckAgents: state => state.uncheckAgents,
  uncheckPage: state => state.uncheckPage
}

//actions
const actions = {
  //待审核经纪人列表
   getUnCheckAgentList({ commit }, params){
    Api.getUnCheckAgentList(params).then(response => {
      if(response.data.status == 0)
      {
      commit(POST_UNCHECK_AGENT_SUCCESS, response.data)
    }else {
      {
        Message.error(response.data.msg)
      }
    }
    }, err => {
      console.log(err)
      commit(POST_UNCHECK_AGENT_FAIL, err)
    })
  },

// 审核经纪人
  reviewOperation({ commit, dispatch }, params,callback){
   Api.reviewOperation(params).then(response => {
     if(response.data.status == 0)
     {
        Message.success("操作成功")
        let params = {
            pageNum: 1,
            pageSize: 50,
            status: '10'
        }
        dispatch('getUnCheckAgentList', params)
     }else{
        Message.error("操作失败")
     }
   }, err => {
     console.log(err)
   })
 }

}

const mutations = {
  [POST_UNCHECK_AGENT_SUCCESS] (state, data) {
    state.uncheckAgents = data.data.list
    state.uncheckPage = data.data.page
  },
  [POST_UNCHECK_AGENT_FAIL] (state, err) {
    console.log(err)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
