<template>
    <el-form ref="user" :model="user">
        <h2 style="margin-top:0">基本资料</h2>
        <!--<div class="form-group imgUploadBox">-->


            <!--<div class="input-group">-->
                <!--<div class="input-group-addon">-->
                    <!--<form action="" class="imgUploadForm" method="post" enctype="multipart/form-data">-->
                        <!--<span class="btn btn-default btn-file" >-->
                             <!--<input id="image" type="file" v-on:click="imageUpload">-->
                        <!--</span>-->
                    <!--</form>-->
                    <!--<div class="headdiv">-->
                        <!--<img class="headimg" :src="form.img"  />-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<label class="head" for="image" >更改头像</label>-->
            <!--&lt;!&ndash;<el-form-item label="头像url">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-input v-model="form.head" style="width:70%"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--</div>-->
        <my-upload
                field="image"
                ki="jfvj"
                v-model="show"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                :width="250"
                :height="250"
                :url="updateAvatarUrl"
                :params="{userId: user.id}"
                img-format="png"
                class="avatar_clip"
        ></my-upload>
        <div class="avatar" @click="toggleShow">
            <img :src="user.head">
            <i class="el-icon-edit mask"></i>
        </div>

        <el-form-item label="性别">
            <el-radio class="radio" v-model="user.sex" label="10">男</el-radio>
            <el-radio class="radio" v-model="user.sex" label="20">女</el-radio>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="user.username" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="goHome">取消</el-button>
        </el-form-item>
    </el-form>

</template>


<script>
    import Vue from 'vue';
    import {baseUrl} from '../api/api';
    import Api from '../api/api';
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        components: {
            'my-upload': myUpload
        },
        data() {
            return {
                user: {},
                show: false,
                updateAvatarUrl: baseUrl + '/api/user/head'
            };
        },
        created() {
            var _user = sessionStorage.getItem('user');
            if (_user) {
                _user = JSON.parse(_user);
                this.user = _user;
            }
        },
        computed: {
            ...mapGetters({
                userInfo: 'userInfo'
            }),

            getHeaders () {
                return {
                    'userId': this.user.id,
                }
            },

        },
        methods: {
            goHome () {
              this.$router.push("/House");
            },
            toggleShow () {
                this.show = !this.show
            },
            cropSuccess (imgDataUrl, field) {
                this.imgDataUrl = imgDataUrl
            },
            cropUploadSuccess (jsonData, field) {
                console.log(JSON.stringify(jsonData) + "jsondata");
                if (jsonData.status.toString() === '0') {
                    this.user.head = jsonData.data.remotePath;
                    sessionStorage.setItem('user',JSON.stringify(this.user));
                } else {
                    this.$notify({
                        title: '错误',
                        message: "上传失败！",
                        type: 'error'
                    });
                }
            },
            cropUploadFail (status, field) {
                if (status === 403) {
                    this.$notify({
                        title: '错误',
                        message: "上传失败！",
                        type: 'error'
                    });
                }
            },
            imageUpload: function (e) {
                console.log(e.target.files[0]);
                if(e.target.files[0]) {
                    var formData = new FormData();
                    formData.append("userId", this.user.id);
                    formData.append("image", e.target.files[0]);
                    let params = {
                        userId: this.user.id,
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
                var _user1 = this.user;
                if (_user1.hasOwnProperty("addTime")) {
                    delete _user1.addTime;
                }
                console.log(_user1);
                Api.update(this.user).then(response => {
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
        }
//        created() {
//            var user = sessionStorage.getItem('user');
//            if (user) {
//                user = JSON.parse(user);
//                console.log(user.username +"-llll");
//                this.form.id = user.id;
//                this.form.username = user.username;
//                this.form.head = user.head;
//                this.form.sex = user.sex;
//                this.form.img = user.head;
//            }
//        }
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
    .head {
        display: block;
        color: #fff;
        background-color: #20a0ff;
        border: 1px solid #c0ccda;
        font-size: 14px;
        padding: 5px;
        border-radius: 4px;
        text-align: center;
        width: 40%;
        margin: 0px auto;
    }

    .headdiv {
        height: 128px;
        width: 128px;
        overflow: hidden;
        border: 4px solid #97a8be;
        position: relative;
        border-radius: 50%;
        margin: 0px auto 10px;
    }

    .headimg {
        width: 300px;
        position: absolute;
        left: -80px;
        top: -50px;
    }

    .avatar {
        width: 150px;
        height: 150px;
        -webkit-box-shadow: 0 0 8px 2px #999;
        box-shadow: 0 0 8px 2px #999;
        border-radius: 75px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }

    .avatar:hover .mask {
        display: block;
    }

    .avatar .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        line-height: 150px;
        text-align: center;
        font-size: 20px;
        display: none;
    }

    .avatar img{
        width: 100%;
        height: 100%;
    }

    .avatar {
        margin: 10px auto;
    }

    .avatar_clip.vue-image-crop-upload .vicp-wrap {
        max-width: 600px;
        width: 80%;
    }

</style>