<template>
    <el-form ref="form" :model="form">
        <h2 style="margin-top:0">基本资料</h2>
        <div class="form-group imgUploadBox">


            <div class="input-group">
                <div class="input-group-addon">
                    <form action="" class="imgUploadForm" method="post" enctype="multipart/form-data">
                        <span class="btn btn-default btn-file" >
                             <input id="image" type="file" v-on:click="imageUpload">
                        </span>
                    </form>
                    <div>
                        <img  :src="form.img"  style="width: 40%; margin-left: 80px; border-radius:50%" />
                    </div>
                </div>
            </div>
            <label for="image" style="margin-left: 30%">更改图像</label>
            <!--<el-form-item label="头像url">-->
                <!--<el-input v-model="form.head" style="width:70%"></el-input>-->
            <!--</el-form-item>-->
        </div>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="form.sex" label="10">男</el-radio>
            <el-radio class="radio" v-model="form.sex" label="20">女</el-radio>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.username" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item>
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
                    sex: '',
                    img:''
                }
            };
        },

        methods: {

            imageUpload: function (e) {
                console.log(e.target.files[0]);
                if(e.target.files[0]) {
                    var formData = new FormData();
                    formData.append("userId", this.form.id);
                    formData.append("image", e.target.files[0]);
                    let params = {
                        userId: this.form.id,
                        image: e.target.files[0]
                    }
                    Api.head(formData).then(response => {
                        let _this = this;
                        if (response.data.status !== 0) {
                            this.$notify({
                                title: '错误',
                                message: "更新失败！",
                                type: 'error'
                            });
                        } else {
                            this.$notify({
                                        title: "success!"
                                    }
                            )
                        }
                    }).catch((e) => {

                    });
                }
            },

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
                this.form.img = user.head;
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
    .btn-file {
        position: relative;
        overflow: hidden;
        color: #73ccff;
    }
    .btn-file input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: #73ccff;
        cursor: inherit;
        display: block;

    }

</style>