<template>
	<view class="backGround"></view>
	<view class="user-content">
		<h1 class="title">账户</h1>
		<view class="user-login" v-if="!isLogin">
			<view class="form" v-if="loginBtn == '登录'">
				<view class="item" style="margin-top: 10px;">
					<view class="item-name">用户名</view>
					<input v-model="name" type="text" placeholder="请填写用户名" />
				</view>
				<view class="item">
					<view class="item-name">密码</view>
					<input v-model="password" type="text" placeholder="请填写密码" />
				</view>
			</view>
			<view class="form" v-if="loginBtn == '注册'">
				<view class="item" style="margin-top: 10px;">
					<view class="item-name">用户名</view>
					<input v-model="regInfo.name" type="text" placeholder="请填写用户名" />
				</view>
				<view class="item">
					<view class="item-name">密码</view>
					<input v-model="regInfo.password" type="text" placeholder="请填写密码" />
				</view>
				<view class="item">
					<view class="item-name">手机号</view>
					<input v-model="regInfo.phoneNumber" type="text" placeholder="请填写手机号" />
				</view>
			</view>
			<div class="login-btn" @click="loginHandler">{{loginBtn}}</div>
			<div class="register" @click="LoginOrReg">没有账号?点击注册</div>
		</view>
		<card height="700" width="600" v-if="isLogin">
			<view class="user-logined">
				<image class="my-user-img"
					:src="account.userinfo.hasImage ? `${base_url}/userImage/${account.userinfo.userName}.jpg`: `${base_url}/userImage/deafult.jpg`">
				</image>
				<view class="user-name-box">
					{{account.userinfo.userName}}
				</view>
				<view class="info-box">
					{{account.userinfo.email}}
				</view>
				<view class="info-box">
					{{account.userinfo.phoneNumber}}
				</view>
				<view class="logout" @click="logoutHandler">登出</view>
			</view>
		</card>
		<tab-bar selected="3"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import card from '/components/card.vue';
	import {
		base_url
	} from '/utils/env_value.js';
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		inject,
		onMounted,
		reactive,
		ref
	} from "vue";
	const account = useAccountStore();
	const isLogin = ref(false); //TODO:
	const loginBtn = ref("登录");
	const name = ref('');
	const password = ref('');
	const regInfo = reactive({
		name: '',
		password: '',
		phoneNumber: ''
	})
	onShow(async () => {
		//获取用户token,验证失败token为空
		const userToken = uni.getStorageSync('smartHome_userToken');
		if (userToken == '') {
			isLogin.value = false;
			return;
		}
		//获取成功,拿用户信息
		const userInfo = uni.getStorageSync('smartHome_userInfo');
		//更新会话号
		const res = await myRequest({
			url: `Home/GetHomeSession`,
			method: 'get',
			data: {
				homeId: userInfo.homeList[0].id,
			}
		});
		account.homeTcp = res.data;
		account.homeSeleted = userInfo.homeList[0].id;
		account.userinfo.userName = userInfo.name;
		account.userinfo.userId = userInfo.id;
		account.userinfo.email = userInfo.email;
		account.userinfo.phoneNumber = userInfo.phone;
		account.userinfo.hasImage = userInfo.hasImage;
		isLogin.value = true;
	});
	//登录还是注册
	const LoginOrReg = () => {
		if (loginBtn.value == "登录") loginBtn.value = "注册";
		else
			loginBtn.value = "登录";
	}

	const loginHandler = async () => {
		///登录
		if (loginBtn.value == "登录") {
			const res = await myRequest({
				url: `User/Login`,
				method: 'post',
				data: {
					userName: name.value,
					password: password.value
				}
			});
			if (res.data.status == 400) {
				uni.showToast({
					title: '用户名或密码错误',
					icon: 'none',
					duration: 3000
				});
				return;
			}
			isLogin.value = true;
			uni.setStorageSync('smartHome_userToken', res.data.message);
			uni.showToast({
				title: '登录成功',
				icon: 'none',
				duration: 3000
			});
			const res2 = await myRequest({
				url: `User/GetUserInfo`,
				method: 'get',
				data: {
					userName: name.value,
				}
			});
			if (res2.data.status == 400) return;
			console.log(res2.data.value)
			uni.setStorageSync('smartHome_userInfo', res2.data.value);
			account.homeTcp = res2.data.value.homeList[0].sessionId;
			account.homeSeleted = res2.data.value.homeList[0].id;
			account.userinfo.userName = name.value;
			account.userinfo.userId = res2.data.value.id;
			account.userinfo.email = res2.data.value.email;
			account.userinfo.phoneNumber = res2.data.value.phone; //hasImage
			account.userinfo.hasImage = res2.data.value.hasImage;
			//刷新页面
			uni.switchTab({
				url: `/pages/user/user`,
				animationType: 'pop-in',
				animationDuration: 500
			});
		} else {
			const res = await myRequest({
				url: `User/CreateUser`,
				method: 'post',
				data: {
					userName: regInfo.name,
					password: regInfo.password,
					phoneNumber: regInfo.phoneNumber
				}
			});
			if (res.data.status == 400) {
				uni.showToast({
					title: '注册失败',
					icon: 'none',
					duration: 3000
				});
				return;
			}
			isLogin.value = true;
			uni.showToast({
				title: '注册成功',
				icon: 'none',
				duration: 3000
			});
			loginBtn.value == "登录"
		}

	}
	//登出
	const logoutHandler = () => {
		uni.setStorage({
			key: 'smartHome_userToken',
			data: '',
			success: function() {
				console.log('success');
			}
		});
		uni.switchTab({
			url: `/pages/user/user`,
			animationType: 'pop-in',
			animationDuration: 500
		});
		isLogin.value = false;
	}
</script>

<style scoped>
	.user-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		width: 100vw;
		z-index: 2;
		background-color: #ffffff;
	}

	.title {
		padding-top: 30px;
		margin-bottom: 5px;
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
		height: 300px;
		width: 80%;
		background-color: rgba(255, 255, 255, .9);
		border-radius: 20px;
		z-index: 2;
		margin: 30rpx;
		font-size: 13px;
	}


	.form .item input {
		position: relative;
		width: 140px;
		font-size: 12px;
		font-weight: 600;
		border: 0;
		border-bottom: 2px solid #fff;
		padding: 5px 0px;
		background: #ffffff00;
		margin-left: 30rpx;
		color: #838383;
	}

	.item-name {
		margin-top: 10px;
		margin-left: 10px;
		font-weight: 600;
	}

	.login-btn {
		position: absolute;
		bottom: 10px;
		left: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10px;
		height: 30px;
		width: 50px;
		border-radius: 5px;
		font-size: 10px;
		font-weight: 600;
		background-color: rgba(240, 214, 105, 1);
	}

	.register {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 10px;
		color: #838383;
	}

	.user-logined {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.user-name-box {
		font-size: 38px;
		font-weight: 800;
		color: #fff;
	}

	.info-box {
		margin-top: 5px;
		font-size: 15px;
		font-weight: 500;
		color: #bfbfbf;
	}

	.info-name {
		font-size: 18px;
		font-weight: 600;
		color: #fff;

	}

	.info-item {
		font-size: 18px;
		font-weight: 400;
		color: #fff;
		margin-left: 10px;
	}

	.logout {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		width: 90px;
		font-size: 14px;
		font-weight: 600;
		background-color: rgba(240, 214, 105, 1);
		border-radius: 5px;
		margin-top: 100px;
	}

	.navBarBox {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 130rpx;
		z-index: 6;
		overflow: hidden;
	}

	.my-user-img {
		margin-top: 20px;
		height: 80px;
		width: 80px;
		border-radius: 50%;
	}
</style>
