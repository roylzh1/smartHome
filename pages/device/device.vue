<template>
	<view class="backGround"></view>
	<view class="content">
		<h1 class="title">管理设备</h1>
		<view class="room">
			<view class="centerControl">
				<global-air-condition></global-air-condition>
			</view>
		</view>
		<tab-bar selected="2"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import globalAirCondition from '/components/globalAirCondition.vue'
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

	.room {
		display: flex;
		height: 80vh;
		margin: 0 30rpx;
	}

	.title {
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		color: #fff;
	}
	.centerControl{
		height: 100px;
		width: 80vw;
		z-index: 2;
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
</style>
