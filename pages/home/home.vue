<template>
	<view class="backGround"></view>
	<view :class="popupBoxIfShow == true ? 'backGround-up':''"></view>
	<view class="page">
		<!-- 导航栏 -->
		<view class="navBarBox">
			<!--:style="headerStyle" :style="opacityStyle"-->
			<view class="backgroundColor" :style="{opacity:opacityStyle.opacity}"></view>
			<!-- 导航栏内容 -->
			<view class="navBar">
				<view class="text" :style="{opacity:opacityStyle.opacity}">我的家</view>
				<image class="logo" src="/static/images/add-to-queue-regular.png"></image>
				<image class="logo" src="/static/images/more.png"></image>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="content">
			<h1 class="title">我的家</h1>
			<view class="topNaviagtion">
				<top-navigation @popupNav="globalControlHandler"></top-navigation>
			</view>
			<view class="room">
				<room @popupBox="popupBoxHandler" :itemArray="livingRoom" title="门厅"></room>
				<room @popupBox="popupBoxHandler" :itemArray="myRoom" title="卧室"></room>
			</view>
		</view>
		<tab-bar selected="0"></tab-bar>
		<popup-light-box @touchmove.stop.prevent :title="popupMessage.title" :name="popupMessage.name"
			v-if="popupBoxIfShow" :class="popupBoxIfShow == true ? 'content-fade-up-animation' : ''"
			@lightComplete="closeBoxHandler"></popup-light-box>
	</view>
</template>

<script setup>
	import {
		onPageScroll
	} from '@dcloudio/uni-app'
	import {
		onMounted,
		onUnmounted,
		reactive,
		ref
	} from 'vue';
	import tabBar from '/components/tabBar.vue'
	import room from '/components/room.vue'
	import topNavigation from '/components/topNaviagtion.vue'
	import popupLightBox from '/components/popupLightBox.vue'
	const livingRoom = [{
		type: "middle",
		title: "大门",
		open: "已开",
		close: "已锁",
		photoClose: "/static/images/lock.png",
		photoOpen: "/static/images/unlock.png",
	}, {
		type: "small",
		title: "顶灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/bulb.png",
		photoOpen: "/static/images/bulb-light.png"
	}, {
		type: "small",
		title: "吊灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/chandelier.png",
		photoOpen: "/static/images/chandelier-light.png"
	}];
	const myRoom = [{
		type: "small",
		title: "顶灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/bulb.png",
		photoOpen: "/static/images/bulb-light.png"
	}, {
		type: "middle",
		title: "大门",
		open: "已开",
		close: "已锁",
		photoClose: "/static/images/lock.png",
		photoOpen: "/static/images/unlock.png",
	}, {
		type: "small",
		title: "吊灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/chandelier.png",
		photoOpen: "/static/images/chandelier-light.png"
	}, {
		type: "small",
		title: "顶灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/bulb.png",
		photoOpen: "/static/images/bulb-light.png"
	}, {
		type: "small",
		title: "吊灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/chandelier.png",
		photoOpen: "/static/images/chandelier-light.png"
	}, {
		type: "small",
		title: "阅读灯",
		open: "开",
		close: "关",
		photoClose: "/static/images/tableLamp.png",
		photoOpen: "/static/images/tableLamp-light.png"
	}, {
		type: "small",
		title: "风扇",
		open: "开",
		close: "关",
		photoClose: "/static/images/fan.png",
		photoOpen: "/static/images/fan-open.png"
	}];

	let popupBoxIfShow = ref(false); //普通弹窗
	let popupMessage = reactive({
		title: '',
		name: ''
	});
	let lightName = ref('');
	let opacityStyle = reactive({
		opacity: 0
	});
	const popupBoxHandler = (title, name) => {
		popupBoxIfShow.value = true;
		popupMessage.title = title;
		popupMessage.name = name;
	}
	const closeBoxHandler = (judege) => {
		if(!judege) {
			//拿ID才能做出判断是那盏灯熄灭
		}
		popupBoxIfShow.value = false;
	}
	const globalControlHandler = name => {
		if(name==='恒温器')
		uni.navigateTo({
			url: `/pages/airConditioner/airConditioner?name=${name}`,
			animationType: 'pop-in',
				animationDuration: 500
		});
		if(name==='灯')
		uni.navigateTo({
			url: `/pages/lamp/lamp?name=${name}`,
			animationType: 'pop-in',
				animationDuration: 500
		});
	}
	onMounted(() => {
		//获取手机状态栏高度
		uni.hideTabBar({
			animation: false
		});

	});
	onPageScroll(e => {
		let opacity = e.scrollTop / 50;
		if (opacity > 1) {
			opacity = 1;
			return;
		}
		opacityStyle.opacity = `${opacity}`;
	});
</script>

<style scoped>
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

	.navBar {
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 100%;
		z-index: 6;
		padding-top: 30rpx;
	}

	.logo {
		height: 50rpx;
		width: 50rpx;
		margin-right: 50rpx;
		z-index: 6;
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

	.page {
		height: 120vh;
		width: 100%;
		z-index: 2;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding-top: 90rpx;
	}

	.title {
		color: white;
		font-size: 35px;
		margin-left: 30rpx;
		margin-top: 50rpx;
		z-index: 3;
	}

	.room {
		margin: 0 30rpx;
	}

	.text {
		position: absolute;
		color: #ffffff;
		height: 50rpx;
		width: 200rpx;
		font-size: 35rpx;
		top: 45%;
		left: 50%;
		font-weight: 700;
		z-index: 6;
		margin-left: -55rpx;
		letter-spacing: 3rpx;
	}

	.topNaviagtion {
		z-index: 3;
		margin-top: 10rpx;
		margin-bottom: -10rpx;
	}

	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		overflow: hidden;
		-webkit-transform: scale(3);
		z-index: 1;
	}
.backGround-up {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: hsla(0,0%,0%,.1);
		backdrop-filter: blur(2px);
		-webkit-transform: scale(1);
		z-index: 7;
	}
	.content-fade-up-animation {
		animation-duration: .2s;
		animation-name: fadeInUp;
		-webkit-animation-duration: .2s;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
		-webkit-animation-name: fadeInUp;
	}

	/* Content fade up animation */

	@keyframes fadeInUp {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	@-webkit-keyframes fadeInUp {
		from {
			display: block;
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}
</style>
