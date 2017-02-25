/**
 * Created by billyu on 2017/2/19.
 */
import Api from '../../api/api'
import {Message} from 'element-ui';

const state = {
    orderList: []
}

const getters = {
    orderList: state => state.orderList //不要花括号

}

const actions = {
    orderList({commit}, params){
        Api.orderList(params).then(response => {
                if (response.data.status === 0) {
                    commit('ORDERlIST', response.data);
                } else {
                    Message.error(response.data.msg)
                }
            }
            ,
            error => {
                console.log("出错了");
            }
        ).catch((e) => {

        });
    }
}


const mutations = {
    ORDERlIST (state, data) {
        state.orderList = data.data.list
        // console.log(state.orderList)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}