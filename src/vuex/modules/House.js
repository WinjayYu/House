import {
  POST_UNCHECK_HOUSE_LIST_SUCCESS,
  POST_UNCHECK_HOUSE_LIST_FAIL,
  POST_HOUSE_LIST_SUCCESS,
  POST_HOUSE_LIST_FAIL
} from '../mutation-types'
import Api from '../../api/api'
import { Message } from 'element-ui';

const state = {
  uncheckHouseList: [],
  uncheckHousePage:{},
  houseList: [],
  housePage:{}
}

// getters
const getters = {
  uncheckHouseList: state => state.uncheckHouseList,
  uncheckHousePage: state => state.uncheckHousePage,
  houseList: state => state.houseList,
  housePage: state => state.housePage
}

//actions
const actions = {

  uncheckHouseList({ commit }, params){
    Api.houseList(params).then(response => {
      if(response.data.status == 0)
      {
        commit(POST_UNCHECK_HOUSE_LIST_SUCCESS, response.data)
      }else {
      {
        Message.error(response.data.msg)
      }
    }
    }, err => {
      console.log(err)
      commit(POST_UNCHECK_HOUSE_LIST_FAIL, err)
    })
  },
  houseList({ commit }, params){
    Api.houseList(params).then(response => {
      if(response.data.status == 0)
      {
        commit(POST_HOUSE_LIST_SUCCESS, response.data)
      }else {
      {
        Message.error(response.data.msg)
      }
    }
    }, err => {
      console.log(err)
      commit(POST_HOUSE_LIST_FAIL, err)
    })
  },
  //审核操作
  reviewHouse({ commit,dispatch }, params){
      Api.reviewHouse(params).then(response => {
          if (response.data.status == 0) {
              Message.success("操作成功")
              let params = {
                  pageNum: 1,
                  pageSize: 50,
                  status: '10'
              }
              dispatch('uncheckHouseList', params)
          } else {
              {
                  Message.error(response.data.msg)
              }
          }
      }, err => {
          console.log(err)
      })
  }
}

const mutations = {
  [POST_UNCHECK_HOUSE_LIST_SUCCESS] (state, data) {
    state.uncheckHouseList = data.data.list
    state.uncheckHousePage = data.data.page
  },
  [POST_UNCHECK_HOUSE_LIST_FAIL] (state, err) {
    console.log(err)
  },
  [POST_HOUSE_LIST_SUCCESS] (state, data) {
    state.houseList = data.data.list
    state.housePage = data.data.page
  },
  [POST_HOUSE_LIST_FAIL] (state, err) {
    console.log(err)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
