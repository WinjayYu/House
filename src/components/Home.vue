<template>
	<el-row class="panel">

		<el-col :span="24" class="panel-left">
			<!--<el-col :span="4">-->
			<aside>
				<el-col>
					<img src="../assets/web_title.png" class="logo">
				</el-col>

				<h5 class="admin"><i class="fa fa-user" aria-hidden="true" style="margin-right:5px;"></i>欢迎您：Winjay</h5>

				<el-menu style="border-top: 1px solid #475669;" default-active="/echarts" class="el-menu-vertical-demo" @open="handleopen"
					@close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			</el-col>
			<!--</el-col>-->
			<!--<el-col :span="20" class="panel-c-c">-->
			<section class="panel-c-c">
				<el-row :span="24" class="panel-top">
					<!-- <el-col :span="20" style="font-size:20px;">
					</el-col> -->
					<el-row :span="4" :offset="20">
						<el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">
							<!--<i class="logout" v-on:click="logout"></i>-->
							<i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
						</el-tooltip>
						<el-tooltip class="item tip-logout" effect="dark" content="登录" placement="bottom" style="padding:0px;">
							<!--<i class="logout" v-on:click="logout"></i>-->
							<i class="fa  fa-sign-in" aria-hidden="true" v-on:click="login"></i>
						</el-tooltip>
					</el-row>

				</el-row>

				<div class="grid-content bg-purple-light panel-content">
					<el-col :span="24" style="margin-bottom:15px;">
						<strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
						<el-breadcrumb separator="/" style="float:right;">
							<el-breadcrumb-item :to="{ path: '/House' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
							<el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
						<!--<transition name="fade">-->
							<router-view></router-view>
						<!--</transition>-->
					</el-col>
				</div>
				<el-dialog title="登陆" v-model="detailVisible" :close-on-click-modal="false" style="width: 50%; margin-left:25%;padding:0px; ">
					<el-input
							placeholder="请输入手机号"
							v-model="input1">
					</el-input>
					</br></br>
					<el-input
							placeholder="请输入密码"
							v-model="input2">
					</el-input>
					</br></br>
					<el-button type="primary" style="">登录</el-button>
				</el-dialog>
			</section>
			<!--</el-col>-->

	</el-row>

</template>

<script>
  export default {
    data() {
      return {
		  detailVisible: false,
		  currentPathName:'图标',
		  currentPathNameParent:'数据报表',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
	watch: {
		'$route' (to, from) {//监听路由改变
			this.currentPathName=to.name;
			this.currentPathNameParent=to.matched[0].name;
		}
	},
    methods: {
      onSubmit() {
        console.log('submit!');
      },
			handleopen(){
				//console.log('handleopen');
			},
			handleclose(){
				//console.log('handleclose');
			},
            handleselect:function(a,b){
            },
			//退出登录
			logout:function(){
				var _this=this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					_this.$router.replace('/House');
				}).catch(() => {

				});


			},
			login:function () {
				this.detailVisible = true;
				/*his.$prompt('请输入邮箱', '登录', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					inputErrorMessage: '邮箱格式不正确'
				}).then(({value}) => {
					this.$message({
						type: 'success',
						message: '你的邮箱是: ' + value
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});*/
			}
    }
  }
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}

	.panel {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.panel-top {
		height: 60px;
		line-height: 60px;
		background: #fff;
		color: #c0ccda;
	}

	.panel-left {
		background: #1c2b36;
		position: absolute;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
		width: 250px
	}

	.panel-c-c {
		background: #f1f1f1;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05) inset;
		position: absolute;
		left: 250px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}

	.panel-content {
		right: 0px;
		top: 60px;
		bottom: 0px;
		overflow-y: auto;
		padding: 20px;
	}

	.logout {
		background: url(../assets/logout_36.png);
		background-size: contain;
		width: 20px;
		height: 20px;
		float: left;
	}

	.logo {
		width: auto;
		margin: 16.5px;
	}

	.tip-logout {
		float: right;
		margin-right: 20px;
		padding-top: 5px;
	}

	.tip-logout i {
		cursor: pointer;
	}

	.admin {
		color: #c0ccda;
		text-align: center;
		right: 0px;
		top: 60px;
		bottom: 0px;
	}
</style>
