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
.amap-wrapper {
    margin: 0px 40px 0;
    width: auto;
    height: 250px;
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
        <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;top: 0px;
        		bottom: 0px;" :height="height">
            <!--<el-table-column prop="id" label="房屋ID" width="80">
            </el-table-column>-->
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="area" label="面积/m²" width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格/万" width="100">
            </el-table-column>
            <el-table-column prop="tags" label="标签" width="150">
            </el-table-column>
            <el-table-column label="小区" width="150">
                <template scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <!--<p>小区ID: {{ scope.row.community.uid }}</p>-->
                        <p>地址: {{ scope.row.community.address }}</p>
                        <p>城市: {{ scope.row.community.city }}</p>
                        <p>纬度: {{ scope.row.community.latitude }}</p>
                        <p>经度: {{ scope.row.community.longitude }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.community.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="layout" label="户型" width="110">
            </el-table-column>
            <el-table-column prop="orientation" label="朝向" width="120">
            </el-table-column>
            <el-table-column prop="renovation" label="装修" width="120">
            </el-table-column>
            <el-table-column prop="floor" label="楼层" width="120">
            </el-table-column>
            <el-table-column prop="purpose" label="用途" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80" :formatter="formatStatus" fixed="right">
            </el-table-column>

            <el-table-column inline-template :context="_self" label="操作" width="80" fixed="right">
                <span>
					      <el-button type="info" size="small" @click="review(row)">查看</el-button>
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
    <el-dialog :title="house.title" v-model="houseDetailVisible" :close-on-click-modal="false" >
        <el-form :model="house" label-width="150px">
            <div v-for="src in house.imgs">
                <img :src="src"></img>
            </div>

            </br>

            <el-form :inline="true" :model="house">
                <el-button v-for="tag in house.tags" t ype="info" size="small">{{ tag }}</el-button>
            </el-form>

            </br>

            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <h1>价格：{{ house.price }}万</h1></div>
                </el-col>
                <el-col :span="6">
                    <h1>面积：{{ house.area }}m²</h1></div>
                </el-col>
                <el-col :span="6">
                    <h1>佣金：{{ house.commission }}元</h1></div>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <p>户型：{{ house.layout }}</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <p>装修：{{ house.renovation }}</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <p>楼层：{{ house.floor }}</p>
                    </div>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <p>朝向：{{ house.orientation }}</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <p>用途：{{ house.purpose }}</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <p>发布：{{ house.year }}</p>
                    </div>
                </el-col>
            </el-row>

            </br>
            <el-row type="flex" justify="center">
                <el-col :span="21">
                    <el-collapse v-for="(val, key, index) in house.feature" v-model="activeName" accordion>
                        <el-collapse-item :title="formatFeature(key)" :name="index">
                            <div>{{ val }}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>

            </br>
            <el-row type="flex" justify="center">
                <el-col :span="21">
                    <p style="font-weight: bold;">小区：{{ house.community.name }}</p>
                </el-col>
            </el-row>


            <div class="amap-wrapper">
                <el-amap vid="amap" :zoom="15" :center="this.location">
                    <el-amap-marker :position="this.location" :visible="true" :draggable="false"></el-amap-marker>
                </el-amap>
            </div>

            <el-row type="flex" justify="center">
                <el-col :span="21">
                    <p style="font-weight: bold;">经纪人信息</p>
                </el-col>
            </el-row>

            <el-row type="flex" gutter="10" justify="center">
                <el-col :span="2">
                    <img :src="house.agent.head" style="border-radius:50%;margin: 10px 0px 0px;">
                </el-col>
                <el-col :span="3">
                    <p style="font-weight: bold;margin-top:20px;">{{ house.agent.username }}</p>
                </el-col>
                <el-col :span="16">
                    <p style="font-weight: bold;margin-top:20px;">{{ house.agent.mobile }}</p>
                </el-col>
            </el-row>

        </el-form>
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
        list: 'houseList',
        page: 'housePage'
    }),
    created() {
        let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
        }
        this.$store.dispatch('houseList', params)
    },

    data() {
        return {

            currentPage: 1,
            pageSize: 50,
            mobile: '',
            height: window.screen.availHeight - 280,
            activeName: 0,

            houseDetailVisible: false, //编辑界面显是否显示

            location: [0, 0],
            house: {
                id: 0,
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
                feature: {},
                city: '',
                community: {},
                agent: {}
            },

            editLoading: false,
            btnEditText: '通 过',

            listLoading: false
        }
    },
    methods: {

        formatStatus: function(row, column) {
            if (row.status == "10") {
                return '待审核';
            } else if (row.status == "20") {
                return '驳回';
            } else if (row.status == "30") {
                return '上架';
            } else if (row.status == "40") {
                return '下架';
            } else if (row.status == "50") {
                return '交接中';
            } else if (row.status == "60") {
                return '已关闭';
            } else if (row.status == "99") {
                return '删除';
            }
            return '未知';

        },

        formatFeature(feature) {
            if (feature == 'core') {
                return '核心卖点';
            } else if (feature == 'traffic') {
                return '交通出行';
            } else if (feature == 'ownership') {
                return '权属抵押';
            } else if (feature == 'introduce') {
                return '户型介绍';
            } else if (feature == 'around') {
                return '周边配套';
            }
        },

        //显示编辑界面
        review(row) {
            this.house.imgs = JSON.parse(row.imgs);
            this.house.title = row.title;
            this.house.tags = row.tags.split("|");
            this.house.price = row.price;
            this.house.area = row.area;
            this.house.layout = row.layout;
            this.house.type = row.type;
            this.house.status = row.status;
            this.house.year = row.year;
            this.house.renovation = row.renovation;
            this.house.orientation = row.orientation;
            this.house.floor = row.floor;
            this.house.purpose = row.purpose;
            this.house.commission = row.commission;
            if (row.feature.length > 0) {
                this.house.feature = JSON.parse(row.feature);
            }
            this.house.city = row.city;
            this.house.community = row.community;
            this.house.agent = row.agent;
            this.location = [row.community.longitude, row.community.latitude];
            this.houseDetailVisible = true;
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
            this.$store.dispatch('houseList', params)
        }
    }
}

</script>
