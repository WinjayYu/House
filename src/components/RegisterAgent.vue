<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left"
             class="demo-ruleForm card-box loginform">
        <div align="center">
            <img src="../assets/logo.png" class="title"/>
        </div>

        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="idcard">
            <el-input id="idcrad" type="text" v-model="ruleForm2.idcard" auto-complete="off"  placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面">
            <input id="positive" type="file" v-on:change="upload('positive', $event)"/>
        </el-form-item>

        <el-form-item label="身份证反面">
            <input id="negative" type="file" v-on:change="upload('negative', $event)"/>
        </el-form-item>
        <el-form-item label="营业执照">
            <input id="companyPic" type="file" v-on:change="upload('companyPic', $event)"/>
        </el-form-item>

        <el-form-item prop="companyName">
            <el-input type="text" v-model="ruleForm2.companyName" auto-complete="off" placeholder="公司名字"></el-input>
        </el-form-item>
        <el-form-item prop="companyCode">
            <el-input type="text" v-model="ruleForm2.companyCode" auto-complete="off" placeholder="公司代码"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit2" :loading="register" class="reg">注册
        </el-button>
        <el-button type="primary" size="mini" @click="backHome">回到首页</el-button>
        <el-button @click="backHome" >重置</el-button>

    </el-form>
</template>

<script>
    import Api from '../api/api'
    export default {
        data() {
            return {
                ruleForm2: {
                    img1: '',
                    img2: '',
                    account: '',
                    pass: '',
                    checkPass: '',
                    idcard: '',
                    positive: '',
                    negative: '',
                    companyName: '',
                    companyCode: '',
                    companyPic: '',
                    idcard:'',
                    companyPic:''

                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ],
                    checkPass: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                    ],
                    companyName: [
                        {required: true, message: '请输入公司名字', trigger: 'blur'},
                    ],
                    companyCode: [
                        {required: true, message: '请输入公司代码', trigger: 'blur'},
                    ],

                },
                checked: true
            };
        },
        methods: {
            backHome() {
                this.$router.replace('/House');
            },
            upload: function (id, e) {
//                console.log(e.target.files[0]);
                switch (id) {
                    case 'positive':
                        this.ruleForm2.positive = e.target.files[0];
                        break;
                    case 'negative':
                        this.ruleForm2.negative = e.target.files[0];
                        break;
                    case 'companyPic':
                        this.ruleForm2.companyPic = e.target.files[0];
                        break;
                }
//                this.ruleForm2.agentMaterial.id = e.target.files[0];
                console.log(this.ruleForm2.positive);
            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        if (this.ruleForm2.pass !== this.ruleForm2.checkPass) {
                            this.$notify({
                                title: '错误',
                                message: "密码不一致！",
                                type: 'error'
                            });
                            return;
                        }
                        this.logining = true;
//                        var loginParams = {
//                            mobile: this.ruleForm2.account,
//                            password: this.ruleForm2.checkPass,
//                            agentMaterial: this.ruleForm2.agentMaterial
//                        };

                        var formData = new FormData();
                                formData.append("mobile", this.ruleForm2.account);
                                formData.append("password", this.ruleForm2.pass);
                                formData.append("positiveFile", this.ruleForm2.positive);
                                formData.append("negativeFile", this.ruleForm2.negative);
                                formData.append("companyName", this.ruleForm2.companyName);
                                formData.append("companyCode", this.ruleForm2.companyCode);
                                formData.append("idcard", this.ruleForm2.idcard);
                                formData.append("companyPicFile", this.ruleForm2.companyPic);
                                Api.RegisterAgent(formData).then(response => {
                                    this.logining = false;
                                    if (response.data.status !== 0) {
                                        this.$notify({
                                            title: '错误',
                                            message: "系统出错，请稍后再试！",
                                            type: 'error'
                                        });
                                    } else {
                                        sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
//                      console.log("---"+response.data.data.user.username);
//                      console.log(response.data.status);
                                        _this.$router.replace('/House');
                                    }

                                }).catch((e) => {
                                    this.$notify({
                                        title: '错误',
                                        message: "系统出错，请稍后再试！",
                                        type: 'error'
                                    });
                                });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .card-box {
        padding: 20px;
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin-bottom: 20px;
        background-color: #fff;
        margin: 120px auto;
        width: 200px;
        height: 120%;
        /*border: 2px solid #8492A6;*/
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .loginform {
        width: 300px;
        padding: 35px 35px 15px 35px;
    }

    .reset {
        /*margin: 0 0 20px 245px ;*/
        margin-left: 5px;
        display: inline;
        float: left;
    }

    .reg {
        width: 78%;
        margin-left: 0px;
        display: inline;
        float: left;
    }

    .idcard {
        width: 200px;
    }
</style>
