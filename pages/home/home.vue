<template>
	<view class="page">
		<!-- 导航栏 -->
		<view class="navBarBox">
			<!--:style="headerStyle"-->
			<view class="backgroundColor" :style="opacityStyle"></view>
			<!-- 导航栏内容 -->
			<view class="navBar">
				<view class="text" :style="opacityStyle">我的家</view>
				<image class="logo" src="/static/images/add-to-queue-regular.png"></image>
				<image class="logo" src="/static/images/more.png"></image>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="content">
			<h1 class="title">我的家</h1>
			<room title="门厅"></room>
		</view>
		<tab-bar selected="0"></tab-bar>
	</view>
</template>

<script setup>
	import {
		onPageScroll
	} from '@dcloudio/uni-app'
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import tabBar from '/components/tabBar.vue'
	import room from '/components/room.vue'
	let headerStyle = reactive({
		backgroundColor: 'rgba(255, 255, 255, 0)',
	});
	let opacityStyle = reactive({
		opacity: '0'
	});
	onMounted(() => {
		//获取手机状态栏高度
		uni.hideTabBar({
			animation: false
		});
	});
	onPageScroll(e => {
		let scrollTop = e.scrollTop;
		let opacity = scrollTop / 30;
		if (opacity > 1) {
			opacity = 1;
		}
		//headerStyle.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
		opacityStyle.opacity = `${opacity}`;
	})
</script>

<style scoped>
	.navBarBox {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 90rpx;
		z-index: 5;
		overflow: hidden;
	}

	.navBar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 100%;
		z-index: 6;
	}

	.logo {
		height: 50rpx;
		width: 50rpx;
		margin-right: 30rpx;
		margin-left: 20rpx;
		z-index: 6;
	}

	.page {
		height: 150vh;
		width: 100%;
		background-image: url("/static/images/tour-1.jpg");
		z-index: 1;
		
	}

	.content {
		height: 100%;
		width: 100%;
		margin-left: 30rpx;
		padding-top: 90rpx;
	}

	.title {
		color: white;
		font-size: 35px;
	}
	.text{
		color: #ffffff;
		font-size: 35rpx;
		margin-right: 15%;
		z-index: 6;
	}
	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(74,74,74);
		filter: blur(12px);
		overflow: hidden;
		-webkit-transform: scale(3);
		z-index: 1;
	}
</style>
