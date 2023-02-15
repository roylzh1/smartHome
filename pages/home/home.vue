<template>
	<view class="page">
		<!-- 导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<image class="logo" src="/static/images/add-to-queue-regular.png" ></image>
				<image class="logo" src="/static/images/more.png" ></image>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="content">
			<h1 class="title">我的家</h1>
		</view>
		<tab-bar :selected=0></tab-bar>
	</view>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import tabBar from '/components/tabBar.vue'
// 状态栏高度
const statusBarHeight = ref(0);
// 导航栏高度
const navBarHeight = ref(82+11);
onMounted(()=>{
	//获取手机状态栏高度
	statusBarHeight.value = uni.getSystemInfoSync()['statusBarHeight'];
	uni.hideTabBar({
	                animation: false
	            });
});
			

	
</script>

<style>
.navBarBox{ background-color: rgba(0, 0, 0, 0);}
.statusBar {}
.navBar {
	padding-top: 40rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0);
}
.logo{
	height: 50rpx;
	width: 50rpx;
	margin-right: 30rpx;
	margin-left: 20rpx;
}
.page{
	height: 100vh;
	width: 100%;
	background-image: url("/static/images/tour-1.jpg");
}
	
.content{
	height: 100%;
	width: 100%;
}
	
.title{
	color: white;
	margin-left: 30rpx;
}
</style>

