<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm card-box loginform">
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

        </el-form-item>
        <el-form-item label="身份证正面">
            <el-input v-model="ruleForm2.img1"></el-input>
        </el-form-item>
        <el-form-item label="身份证反面">
            <el-input v-model="ruleForm2.img2" ></el-input>
            </el-form-item>

        <el-form-item >
            <el-button type="primary"  @click.native.prevent="handleSubmit2" :loading="register" class="reg">注册</el-button>
            <el-button @click.native.prevent="handleReset2" class="reset">重置</el-button>
        </el-form-item>
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
                    checkPass: ''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    checkPass: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                    ],
                    img1: [
                        { required: true, message: '请输入身份证url', trigger: 'blur' },
                    ],
                    img2: [
                        { required: true, message: '请输入身份证url', trigger: 'blur' },
                    ],

                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this=this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        if(this.ruleForm2.pass !== this.ruleForm2.checkPass){
                            this.$notify({
                                title: '错误',
                                message: "密码不一致！",
                                type: 'error'
                            });
                            return;
                        }
                        this.logining = true;
                        var loginParams = { mobile: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                        Api.register(loginParams).then(response => {
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
