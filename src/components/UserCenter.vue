<template>
    <el-form ref="form" :model="form">
        <h2 style="margin-top:0">基本资料</h2>
        <el-form-item label="头像url">
            <el-input v-model="form.head" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="form.sex" label="10">男</el-radio>
            <el-radio class="radio" v-model="form.sex" label="20">女</el-radio>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.username" style="margin-left:15px; width:70%"></el-input>
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
                    id: '',
                    head: '',
                    username: '',
                    sex: ''
                }
            };
        },

        methods: {
            onSubmit: function () {
                Api.update(this.form).then(response => {
                    this.logining = false;
                    let _this = this;
                    if (response.data.status !== 0) {
                        this.$notify({
                            title: '错误',
                            message: "更新失败！",
                            type: 'error'
                        });
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
                        _this.$router.replace('/House');
                    }

                }).catch((e) => {
                    this.$notify({
                        title: '错误',
                        message: "出错了！",
                        type: 'error'
                    });
                });
            }
        },
        created() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                console.log(user.username +"-llll");
                this.form.id = user.id;
                this.form.username = user.username;
                this.form.head = user.head;
                this.form.sex = user.sex;
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