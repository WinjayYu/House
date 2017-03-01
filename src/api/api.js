'use strict'

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

//export const baseUrl = 'http://ylili.cn/zaja';
const baseUrl = 'http://localhost:8080/zaja'

export default {

    //获取未审核经纪人
    getUnCheckAgentList: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/back/uncheckagents').save({}, params)
    },

    //审核经纪人 a
    reviewOperation: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/back/reviewoperation').save({}, params)
    },
    //经纪人/用户列表
    userList: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/back/userlist').save({}, params)
    },
    //房屋列表
    houseList: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/back/houselist').save({}, params)
    },
    //审核房源
    reviewHouse: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/back/reviewhouse').save({}, params)
    },
    //登录
    login: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/user/login').save({}, params)
    },

    //注册
    register: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/user/register').save({}, params)

    },
    orderList: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/order/listorder').save({}, params)

    },
    headUpload: (file) => {
        Vue.http.options.emulateJSON = true;
        Vue.http.options.emulateHTTP = true;
        Vue.http.post(baseUrl + "/api/user/head", file).then(function (result) {
            let response = result.data;
            // console.log(response)
            if (parseInt(response.msg) === 1) {
                resolve(response.data);
                console.log("suss");
            } else {
                reject(response.code)
                console.log("err")
            }
        }, function (error) {
            reject(error)
            console.log("err!")
        }).catch((e) => {

        });
    },

    update: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/user/update').save({}, params)

    },
    publishHouse: (params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/agent/publishhouse').save({}, params)

    },
    RegisterAgent:(params) => {
        Vue.http.options.emulateJSON = true;
        return Vue.resource(baseUrl + '/api/agent/register').save({}, params)
    }
}
