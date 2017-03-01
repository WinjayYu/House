<template>
    <el-form ref="publishHouse" :model="publishHouse" :rules="img" class="publish">
        <el-form-item label="标题">
            <el-input v-model="publishHouse.title" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="图片1">
            <el-input v-model="img.img1" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="图片2">
            <el-input v-model="img.img2" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="图片3">
            <el-input v-model="img.img3" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="图片4">
            <el-input v-model="img.img4" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="图片5">
            <el-input v-model="img.img5" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="标签">
            <el-input v-model="publishHouse.tags" placeholder="多个标签用'|'分隔,如:地铁房|学区房" style="width:70%"></el-input>
        </el-form-item>

        <el-form-item label="价格">
            <el-input v-model="publishHouse.price" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="面积">
            <el-input v-model="publishHouse.area" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="样式">
            <el-radio class="radio" v-model="publishHouse.layout" label="1室1厅1卫">1室1厅1卫</el-radio>
            <el-radio class="radio" v-model="publishHouse.layout" label="2室1厅1卫">2室1厅1卫</el-radio>
            <el-radio class="radio" v-model="publishHouse.layout" label="3室1厅1卫">3室1厅1卫</el-radio>
            <el-radio class="radio" v-model="publishHouse.layout" label="2室1厅2卫">2室1厅2卫</el-radio>
        </el-form-item>
        <el-form-item label="年限">
            <el-input v-model="publishHouse.year" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="装修程度">
            <el-input v-model="publishHouse.renovation" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="朝向">
            <el-input v-model="publishHouse.orientation" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
            <el-input v-model="publishHouse.floor" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="特色">
            <el-input v-model="publishHouse.feature" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="城市">
            <el-input v-model="publishHouse.city" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>
        <el-form-item label="小区">
            <el-input v-model="publishHouse.community.title" style="margin-left:15px; width:70%"></el-input>
        </el-form-item>

            <el-button type="primary" @click="onSubmit">立即发布</el-button>
            <el-button>取消</el-button>
        </el-form-item>

    </el-form>

</template>


<script>
    import Vue from 'vue'
    import {baseUrl} from '../../api/api'
    import Api from '../../api/api'
    export default {
        data() {
            return {
                img:{
                  img1:'',
                  img2:'',
                  img3:'',
                  img4:'',
                  img5:'',
                },
                publishHouse: {
                    title: '',
                    imgs: [],
                    tags: [],
                    price: 0,
                    area: 0,
                    layout: '',
                    type: '',
                    status: '',
                    year: '',
                    renovation: '',
                    orientation: '',
                    floor: '',
                    purpose: '',
                    commission: 0,
                    feature: '',
                    city: '',
                    community: {},
                    agent: {}
                },
                rules2: {
                    img1: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    img2: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    img3: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    img4: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    img5: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            onSubmit: function () {
                let arrImg = new Array(this.img.img1, this.img.img2, this.img.img3, this.img.img4, this.img.img5);
                this.publishHouse.imgs = arrImg;
                Api.publishHouse(this.publishHouse).then(response => {
                    let _this = this;
                    if (response.data.status !== 0) {
                        this.$notify({
                            title: '错误',
                            message: "发布失败！",
                            type: 'error'
                        });
                    } else {
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
        width: 60%;
        padding: 35px 35px 15px 35px;
        /*margin:  100px 0 0 300px;*/
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        border-radius: 5px;
        margin: 120px auto;
    }
    .publish {
        top: 0;
        margin-top: 0;
    }
</style>