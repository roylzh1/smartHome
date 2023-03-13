<template>
	<view class="backGround"></view>
	<view class="content">
		<h1 class="title">我的</h1>
		<view  class="user-login">
			<view  class="form">
				<view  class="item" style="margin-top: 10px;">
					<view class="item-name" >用户名</view>
					<input type="text" placeholder="请填写用户名" />
				</view >
				<view  class="item">
					<view class="item-name">密码</view>
					<input type="text" placeholder="请填写密码" />
				</view >
			</view >
			<div class="login-btn">{{loginBtn}}</div>
			<div class="register" @click="LoginOrReg">没有账号?点击注册</div>
		</view>
		<tab-bar selected="3"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import {
		useAccountStore
	} from '@/store/account.js';
	import {
		onMounted,
		ref
	} from "vue";
	const account = useAccountStore();
	const isLogin = ref(false);
	const loginBtn = ref("登录");
	onMounted(() => {
		console.log(account.account)
		uni.getStorage({
			key: 'test',
			success(res) {
				console.log('获取成功', res.data);
				isLogin.value = true;
			}
		})
	});
	const LoginOrReg = ()=>{
		if(loginBtn.value == "登录") loginBtn.value="注册";
		else
		loginBtn.value="登录";
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		z-index: 2;
		background-color: #ffffff;
	}

	.title {
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		color: #fff;
	}

	.backGround {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url("/static/images/tour-1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 70%;
		z-index: 1;
	}

	.user-login {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		height: 200px;
		width: 70%;
		background-color: rgba(255,255,255,.9);
		border-radius: 20px;
		z-index: 2;
		margin: 30rpx;
		font-size: 13px;
	}
	.form .item input{
				width:140px;
				font-size:12px;
				border:0;
				border-bottom:2px solid #fff;
				padding:5px 10px;
				background:#ffffff00;
				color:#fff;
			}
	.item-name{
		margin-left: 10px;
		font-weight: 600;
	}		
	.login-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10px;
		margin-top: 20px;
		height: 30px;
		width: 50px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 600;
		background-color: rgba(240,214,105,1);
	}
	.register{
		position: absolute;
		bottom: 0;
		right: 10px;
		font-size: 10px;
		color: #838383;
	}
</style>
