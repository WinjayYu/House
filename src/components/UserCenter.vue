<template>
    <el-form ref="form" :model="form">
        <el-form-item label="头像url">
            <el-input v-model="form.head" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="form.sex" label="10">男</el-radio>
            <el-radio class="radio" v-model="form.sex" label="20">女</el-radio>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.nickname" style="width:30%"></el-input>
        </el-form-item>

            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>

</template>


<script>
    import Vue from 'vue'
    import {baseUrl} from '../api/api'
    import Api from '../api/api'
    export default {
        data() {
            return {
                form: {
                    head: '',
                    nickname: '',
                    sex:''
                }
            };
        },

        methods: {
           upload(e){
               var file = e.target.files[0];
               console.log(file);
               var user =  sessionStorage.getItem('user');
               this.id = user.id;
               let params = {
                   id : user.id,
                   image : file
               }
               Vue.http.post("http://localhost:8080/zaja/api/user/head", params).then(function (result) {
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
           }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                console.log(user.username +"-llll");
                this.form.username = user.username;
                this.form.head = user.head;
                this.form.sex = user.sex;
                console.log(form + "dv");
            }
        }
    }
</script>

<style scoped>

    .el-form {
        width: 300px;
        padding: 35px 35px 15px 35px;
        /*margin:  100px 0 0 300px;*/
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
        border-radius: 5px;
        margin: 120px auto;
    }
</style>