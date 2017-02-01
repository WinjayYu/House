<style scoped>

.toolbar .el-form-item {
    margin-bottom: 10px;
}

.toolbar {
    background: #fff;
    padding: 10px 10px 0px 10px;
}

img {
    width: 100%;
    height: auto;
    max-width: 100%;
}

</style>

<template>

<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </el-col>

    <!--列表-->
    <template>
        <el-table :data="agents" highlight-current-row v-loading="listLoading" border style="width: 100%;">
            <el-table-column prop="id" label="用户ID" width="100">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="idcard" label="身份证" width="200">
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="180">
            </el-table-column>
            <el-table-column prop="companyCode" label="营业执照">
            </el-table-column>
            <el-table-column inline-template :context="_self" label="操作" width="80">
                <span>
					<el-button type="info" size="small" @click="handleEdit(row)">查看</el-button>
				</span>
            </el-table-column>
        </el-table>
    </template>

    <!--分页-->
    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
        <el-pagination :current-page="this.currentPage" :page-size="this.pageSize" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :total="page.totalNum" style="float:right">
        </el-pagination>
    </el-col>

    <!--详情界面-->
    <el-dialog :title="infoFormTtile" v-model="infoFormVisible" :close-on-click-modal="false">
        <el-form :model="infoForm" label-width="150px">
            <el-form-item label="手机号：">
                {{ infoForm.mobile }}
            </el-form-item>
            <el-form-item label="身份证：">
                {{ infoForm.idcard }}
            </el-form-item>
            <el-form-item label="身份证正面照片：">
                <img :src="infoForm.positive" alt="">
            </el-form-item>
            <el-form-item label="身份证反面照片：">
                <img :src="infoForm.negative" alt="">
            </el-form-item>
            <el-form-item label="公司名称：">
                {{ infoForm.companyName }}
            </el-form-item>
            <el-form-item label="公司营业执照：">
                {{ infoForm.companyCode }}
            </el-form-item>
            <el-form-item label="公司营业执照照片：">
                <img :src="infoForm.companyPic" alt="">
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="reviewReject">拒 绝</el-button>
            <el-button type="primary" @click.native="reviewPass" :loading="editLoading">{{btnEditText}}</el-button>
        </div>
    </el-dialog>
    <!--确认页面-->
    <el-dialog title="实名填入" v-model="sureFormVisible">
        <el-form>
            <el-form-item label="真实姓名：" label-width="150px">
                <el-input v-model="username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别：" label-width="150px">
                <el-radio-group v-model="sex">
                    <el-radio label="10">男</el-radio>
                    <el-radio label="20">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="sureFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="surePass">确 定</el-button>
        </div>
    </el-dialog>


</section>

</template>

<script>

import util from '../../common/util'
import NProgress from 'nprogress'
import {
    mapGetters, mapActions
}
from 'vuex'

export default {
    computed: mapGetters({
        agents: 'uncheckAgents',
        page: 'uncheckPage'
    }),
    created() {
        let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
        }
        this.$store.dispatch('getUnCheckAgentList', params)
    },

    data() {
        return {

            currentPage: 1,
            pageSize: 50,

            mobile: '',
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            sex: '10',
            username: '',

            infoFormVisible: false, //编辑界面显是否显示
            infoFormTtile: '详细资料', //编辑界面标题
            sureFormVisible: false, //真实姓名页面
            //编辑界面数据
            infoForm: {
                id: 0,
                mobile: '',
                idcard: -1,
                companyName: 0,
                companyCode: '',
                positive: '',
                negative: '',
                companyPic: ''
            },
            editLoading: false,
            btnEditText: '通 过',

            listLoading: false
        }
    },
    methods: {

        //显示编辑界面
        handleEdit: function(row) {
            this.infoFormVisible = true;
            this.infoFormTtile = '申请信息';
            this.infoForm.id = row.id;
            this.infoForm.mobile = row.mobile;
            this.infoForm.idcard = row.idcard;
            this.infoForm.companyName = row.companyName;
            this.infoForm.companyCode = row.companyCode;
            this.infoForm.positive = row.positive;
            this.infoForm.negative = row.negative;
            this.infoForm.companyPic = row.companyPic;
        },
        //审核通过
        reviewPass() {
            this.infoFormVisible = false;
            this.sureFormVisible = true;
        },

        surePass() {

            if (this.username == '') {
                this.$message.error('请输入实名');
                return;
            }

            let params = {
                userId: this.infoForm.id,
                type: 0,
                username: this.username,
                sex: this.sex
            }
            this.$store.dispatch('reviewOperation', params)
            this.sureFormVisible = false;
        },
        reviewReject() {

            this.infoFormVisible = false;
            this.$prompt('感谢您申请【ZAJA】经纪人，【内容编辑部分】，期待您的再次提交。', '被拒理由', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({
                value
            }) => {
                let params = {
                    userId: this.infoForm.id,
                    type: 1,
                    refusemsg: value
                }
                this.$store.dispatch('reviewOperation', params)
                this.sureFormVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        //显示新增界面
        handleSearch: function() {
            var _this = this;

            this.infoFormVisible = true;
            this.infoFormTtile = '新增';

            this.infoForm.id = 0;
            this.infoForm.name = '';
            this.infoForm.sex = 1;
            this.infoForm.age = 0;
            this.infoForm.birth = '';
            this.infoForm.addr = '';
        },

        //页面切换
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            let params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }
            this.$store.dispatch('getUnCheckAgentList', params)
        }
    }
}

</script>
