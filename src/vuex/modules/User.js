import {
    POST_USER_LIST_SUCCESS,
    POST_USER_LIST_FAIL
} from '../mutation-types'
import Api from '../../api/api'
import {Message} from 'element-ui';

const state = {
    userList: [],
    userPage: {},
    user: {},
}

// getters
const getters = {
    userList: state => state.userList,
    userPage: state => state.userPage,
    userInfo: state => state.userInfo
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
    login ({commit}, params){
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
    },
    // 更新用户本地资料缓存
    updateUserLocalStorage: (state, data) => {
        switch (data.name) {
            case 'avatar':
                state.userInfo.avatar = data.value
                console.log(data.value);
                newData.avatar = data.value;
                window.localStorage.userInfo = JSON.stringify(newData);
                break;
            default:
                break;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
