<template>

    <section>
        <!--列表-->
            <el-table :data="list.length !== 0 ? list : myorderList" highlight-current-row v-loading="listLoading" border style="width: 100%;top: 0px;
        		bottom: 0px;" :height="height">
                <!--<el-table-column prop="id" label="房屋ID" width="80">
                </el-table-column>-->
                <el-table-column prop="code" label="订单号" width="200">
                </el-table-column>
                <el-table-column prop="house.price" label="价格/万" width="100">
                </el-table-column>
                <el-table-column prop="house.commission" label="佣金/元" width="150">
                </el-table-column>

                <el-table-column prop="house.floor" label="楼层" width="110">
                </el-table-column>
                <el-table-column  label="房源" width="240"> <!-- prop="house.title" -->
                    <template scope="scope">
                       <div slot="reference" class="name-wrpper">
                           <div @click="showDetail(scope.$index, scope.row)">
                                <el-tag>{{scope.row.house.title}}</el-tag>
                           </div>
                       </div>
                    </template>
                </el-table-column>
                <el-table-column prop="house.agent.username" label="经纪人" width="120">
                </el-table-column>
                <el-table-column prop="addTime" label="购买时间" width="120">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80" :formatter="formatStatus" >
                </el-table-column>
            </el-table>

        <!--房源详情界面-->
        <el-dialog :title="house.title" v-model="houseDetailVisible" :close-on-click-modal="false" >
            <el-form :model="house" label-width="150px">
                <div v-for="src in house.imgs">
                    <img :src="src"></img>
                </div>

                <br />

                <el-form :inline="true" :model="house">
                    <el-button v-for="tag in house.tags" type="info" size="small">{{ tag }}</el-button>
                </el-form>

                <br />

                <el-row type="flex" justify="center">
                    <el-col :span="6">
                        <h1>价格：{{ house.price }}万</h1>
                    </el-col>
                    <el-col :span="6">
                        <h1>面积：{{ house.area }}m²</h1>
                    </el-col>
                    <el-col :span="6">
                        <h1>佣金：{{ house.commission }}元</h1>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="6">
                        <p>户型：{{ house.layout }}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>装修：{{ house.renovation }}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>楼层：{{ house.floor }}</p>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="6">
                        <p>朝向：{{ house.orientation }}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>用途：{{ house.purpose }}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>发布：{{ house.year }}</p>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                <el-col :span="21">
                    <el-collapse v-for="(val, key, index) in house.feature" v-model="activeName" accordion>
                        <el-collapse-item :title="formatFeature(key)" :name="index">
                            <div>{{ val.replace(/.$/, '。') }}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="21">
                        <p style="font-weight: bold;">小区：{{ house.community ? house.community.name : '' }}</p>
                    </el-col>
                </el-row>


                <div class="amap-wrapper">
                    <el-amap vid="amap" :zoom="15" :center="location">
                        <el-amap-marker :position="location" :visible="true" :draggable="false"></el-amap-marker>
                    </el-amap>
                </div>

                <el-row type="flex" justify="center">
                    <el-col :span="21">
                        <p style="font-weight: bold;">经纪人信息</p>
                    </el-col>
                </el-row>

                <el-row type="flex" gutter="10" justify="center">
                    <el-col :span="2">
                        <img :src="house.agent ? house.agent.head : '' " style="border-radius:50%;margin: 10px 0px 0px;">
                    </el-col>
                    <el-col :span="3">
                        <p style="font-weight: bold;margin-top:20px;">{{ house.agent ? house.agent.username : '' }}</p>
                    </el-col>
                    <el-col :span="16">
                        <p style="font-weight: bold;margin-top:20px;">{{ house.agent ? house.agent.mobile : '' }}</p>
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

        computed: {
            ...mapGetters({
                list: 'orderList',
                myorderList: 'myorderList'
            })
        },
        created() {
            var _this = this;
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if (user.type.toString() === '10') {
                    let params = {
                        userId: user.id,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                    this.$store.dispatch('orderList', params);
                } else if (user.type.toString() === '20') {
                    let params = {
                        agentId: user.id,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                    this.$store.dispatch('myorderList', params);
                }


            }else {
                this.$notify({
                    title: '提示',
                    message: "查看订单请先登录！",
                    type: 'error'
                });
                setTimeout(function(){_this.$router.push('/login')}, 3000);
            }
        },

        data() {
            return {

                currentPage: 1,
                pageSize: 50,
                pageNum: 1,
                height: window.screen.availHeight - 280,
                activeName: 0,
                result: [],
                userId: 0,


                editLoading: false,
//                btnEditText: '通 过',

                listLoading: false,
                houseDetailVisible: false,
                house: {},
                location: [0, 0]
            }
        },

        methods: {
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
            showDetail (index, row) {
                this.house = row.house;
                this.house.imgs = JSON.parse(row.house.imgs);
                this.house.tags = row.house.tags.split("|");
                this.location = [row.house.community.longitude, row.house.community.latitude];
                if (row.house.feature.length > 0) {
                    this.house.feature = JSON.parse(row.house.feature);
                }
                this.houseDetailVisible = true;
            },
            formatStatus (row, column) {
                if (row.status == "10") {
                    return '未接单';
                } else if (row.status == "20") {
                    return '待支付';
                } else if (row.status == "30") {
                    return '房屋交接中';
                } else if (row.status == "40") {
                    return '用户待确认';
                } else if (row.status == "50") {
                    return '待评价';
                } else if (row.status == "60") {
                    return '已完成';
                } else if (row.status == "70") {
                    return '关闭';
                }
                return '未知';

            },

            //显示新增界面
            handleSearch: function() {

            },

            //页面切换
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
//                let params = {
//                    pageNum: this.currentPage,
//                    pageSize: this.pageSize
//                }
//                this.$store.dispatch('houseList', params)
            }
        },
        mounted() {
            this.currentPathName = this.$route.name;
            this.currentPathNameParent = this.$route.matched[0].name;


        },
        updated() {
            if (this.list.length === 0) {
                this.result = this.myorderList;
            } else {
                this.result = this.list;
            }
        }
    }

</script>


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
