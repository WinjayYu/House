<template>

    <section>
        <!--&lt;!&ndash;工具条&ndash;&gt;-->
        <!--<el-col :span="24" class="toolbar">-->
            <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
                <!--<el-form-item>-->
                    <!--<el-input v-model="mobile" placeholder="手机号"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button @click="handleSearch">查询</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-col>-->

        <!--列表-->
        <template>
            <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;top: 0px;
        		bottom: 0px;" :height="height">
                <!--<el-table-column prop="id" label="房屋ID" width="80">
                </el-table-column>-->
                <el-table-column prop="code" label="订单号" width="180">
                </el-table-column>
                <el-table-column prop="price" label="价格/万" width="100">
                </el-table-column>
                <el-table-column prop="commission" label="佣金" width="150">
                </el-table-column>

                <el-table-column prop="floor" label="楼层" width="110">
                </el-table-column>
                <el-table-column prop="house" label="房源" width="120">
                </el-table-column>
                <el-table-column prop="agent" label="经纪人" width="120">
                </el-table-column>
                <el-table-column prop="addtime" label="购买时间" width="120">
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

        <!--&lt;!&ndash;分页&ndash;&gt;-->
        <!--<el-col :span="24" class="toolbar" style="padding-bottom:10px;">-->
            <!--<el-pagination :current-page="this.currentPage" :page-size="this.pageSize" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" style="float:right">-->
            <!--</el-pagination>-->
        <!--</el-col>-->

        <!--&lt;!&ndash;详情界面&ndash;&gt;
        <el-dialog :title="house.title" v-model="houseDetailVisible" :close-on-click-modal="false" >
            <el-form :model="house" label-width="150px">
                <div v-for="src in house.imgs">
                    <img :src="src"></img>
                </div>

                </br>

                <el-form :inline="true" :model="house">
                    <el-button v-for="tag in house.tags" type="info" size="small">{{ tag }}</el-button>
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
        </el-dialog>-->


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
            list: 'orderList'
        }),
        created() {
            var user = sessionStorage.getItem('user');
            console.log(user);
            if (user) {
                user = JSON.parse(user);
                console.log(user.id);
                let params = {
                    userId: user.id
                }
                this.$store.dispatch('orderList', params)
            }
//           this.$store.dispatch('orderList', params)
        },

        data() {
            return {

                currentPage: 1,
                pageSize: 50,
                height: window.screen.availHeight - 280,
                activeName: 0,

                userId: 0,

                houseDetailVisible: false, //编辑界面显是否显示
                /*order: {
                    id: '',
                    code: '',
                    price: '',
                    commission: '',
                    floor: '',
                    discount: 0,
                    house: {},
                    agent: {},
                    addTime: '',
                    status: ''
                },*/

                editLoading: false,
//                btnEditText: '通 过',

                listLoading: false
            }
        },
        methods: {

            formatStatus: function(row, column) {
                if (row.status == "10") {
                    return '';
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

//            //显示编辑界面
//            review(row) {
//                this.order.id = row.id;
//                this.order.code = row.code;
////                this.house.tags = row.tags.split("|");
//                this.order.price = row.price;
//                this.order.status = row.status;
//                this.order.commission = row.commission;
//                this.order.floor = row.floor;
//                this.order.discount = row.discount;
//                this.order.house = row.house;
//                this.order.agent = row.agent;
////                if (row.feature.length > 0) {
////                    this.house.feature = JSON.parse(row.feature);
////                }
////                this.location = [row.community.longitude, row.community.latitude];
//                this.houseDetailVisible = true;
//            },
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
            this.currentPath = this.$route.path;
            this.currentPathName = this.$route.name;
            this.currentPathNameParent = this.$route.matched[0].name;

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
