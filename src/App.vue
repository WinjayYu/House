<template>
	<div id="app">
		<!--<transition name="bounce">-->
			<router-view></router-view>
		<!--</transition>-->
	</div>
</template>

<script>

	export default {
		name: 'app',
		components: {
		},
		created: function () {
			this.$router.replace('/House')
		}
	}
</script>

<style>
	@import "../node_modules/font-awesome/css/font-awesome.min.css";
	@import "../node_modules/flex.css/dist/flex.css";
	.bounce-enter-active {
		animation: bounce-in .5s;
	}

	.bounce-leave-active {
		animation: bounce-out .2s;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(0);
		}
	}



	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}


	body {
		/*background-color: #324057;*/
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
		background: #f1f1f1;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.headdiv {
		width: 100px;
		height: 100px;
		box-shadow: 0 0 8px 2px #999;
		border-radius: 75px;
		overflow: hidden;
		position: relative;
		cursor: pointer;
		margin: 10px auto;
		/*height: 128px;*/
		/*width: 128px;*/
		/*overflow: hidden;*/
		/*border: 4px solid #97a8be;*/
		/*position: relative;*/
		/*border-radius: 50%;*/
		/*margin: 0px auto 10px;*/
	}

	.headimg {
		width: 100%;
		height: 100%;
		/*width: 300px;*/
		/*position: absolute;*/
		/*left: -80px;*/
		/*top: -40px;*/
	}



</style>
