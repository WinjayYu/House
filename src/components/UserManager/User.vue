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
        <el-table :data="users" highlight-current-row v-loading="listLoading" border style="width: 100%;top: 0px;
        		bottom: 0px;" :height="height">
            <el-table-column label="头像" width="80">
                <template scope="scope">
                    <img :src="scope.row.head" style="border-radius:50%;margin: 10px 0px 0px;">
                </template>
            </el-table-column>
            <el-table-column prop="id" label="用户ID" width="80">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="130">
            </el-table-column>
            <el-table-column prop="nickname" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="formatSex"  width="80">
            </el-table-column>
            <el-table-column prop="addTime" label="注册时间"  >
            </el-table-column>

            <el-table-column inline-template :context="_self" label="操作" width="80">
                <span>
					<el-button type="info" size="small" @click="handleEdit(row)">拉黑</el-button>
				</span>
            </el-table-column>
        </el-table>
    </template>

    <!--分页-->
    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
        <el-pagination :current-page="this.currentPage" :page-size="this.pageSize" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :total="page.totalNum" style="float:right">
        </el-pagination>
    </el-col>


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
        users: 'userList',
        page: 'userPage'
    }),
    created() {
        let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            type: '10'
        }
        this.$store.dispatch('userList', params)
    },

    data() {
        return {

            currentPage: 1,
            pageSize: 50,
            mobile: '',
            height:window.screen.availHeight - 280,


            infoFormVisible: false, //编辑界面显是否显示
            infoFormTtile: '详细资料', //编辑界面标题
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
        //性别显示转换
        formatSex: function(row, column) {
            return row.sex == '10' ? '男' : row.sex == '20' ? '女' : '未知';
        },

        //显示编辑界面
        handleEdit: function(row) {

        },
        //显示新增界面
        handleSearch: function() {

        },

        //页面切换
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            let params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }
            this.$store.dispatch('userList', params)
        }
    }
}

</script>
