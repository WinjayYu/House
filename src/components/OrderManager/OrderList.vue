<template>

    <section>
        <!--列表-->
            <el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;top: 0px;
        		bottom: 0px;" :height="height">
                <!--<el-table-column prop="id" label="房屋ID" width="80">
                </el-table-column>-->
                <el-table-column prop="code" label="订单号" width="200">
                </el-table-column>
                <el-table-column prop="price" label="价格/万" width="100">
                </el-table-column>
                <el-table-column prop="commission" label="佣金/元" width="150">
                </el-table-column>

                <el-table-column prop="floor" label="楼层" width="110">
                </el-table-column>
                <el-table-column  prop="house.title" label="房源" width="120">
                </el-table-column>
                <el-table-column prop="agent.username" label="经纪人" width="120">
                </el-table-column>
                <el-table-column prop="addTime" label="购买时间" width="120">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80" :formatter="formatStatus" fixed="right">
                </el-table-column>

                <el-table-column inline-template :context="_self" label="操作" width="80" fixed="right">
                <span>
					      <el-button type="info" size="small" @click="review(row)">查看</el-button>
				        </span>
                </el-table-column>
            </el-table>
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
            if (user) {
                user = JSON.parse(user);
                let params = {
                    userId: user.id,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
                this.$store.dispatch('orderList', params)
            }else {
                this.$notify({
                    title: '提示',
                    message: "查看订单请先登录！",
                    type: 'error'
                });
            }
        },

        data() {
            return {

                currentPage: 1,
                pageSize: 50,
                pageNum: 1,
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
