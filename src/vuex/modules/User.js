import {
    POST_USER_LIST_SUCCESS,
    POST_USER_LIST_FAIL
} from '../mutation-types'
import Api from '../../api/api'
import {Message} from 'element-ui';

const state = {
    userList: [],
    userPage: {},
    user: {}
}

// getters
const getters = {
    userList: state => state.userList,
    userPage: state => state.userPage
}

//actions
const actions = {
    userList({commit}, params){
        Api.userList(params).then(response => {
            if (response.data.status == 0) {
                commit(POST_USER_LIST_SUCCESS, response.data)
            } else {
                {
                    Message.error(response.data.msg)
                }
            }

        }, err => {
            console.log(err)
            commit(POST_USER_LIST_FAIL, err)
        })
    },
    user({commit}, params){
        Api.login(params).then(response => {
            if (response.data.status === 0) {
                commit(response.data);
            } else {
                {
                    Message.error(response.data.msg)
                }
            }
        }, err => {
            console.log(err)
            commit(POST_USER_LIST_FAIL, err)
        })
    }
}

const mutations = {
    [POST_USER_LIST_SUCCESS] (state, data) {
        state.userList = data.data.list
        state.userPage = data.data.page
    },
    [POST_USER_LIST_FAIL] (state, err) {
        console.log(err)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
