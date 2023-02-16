<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
			<el-button type="warning">button1</el-button>
		</view>
		<tab-bar selected="1" ></tab-bar>
	</view>
</template>

<script setup>
import tabBar from '/components/tabBar.vue'
const title = 'Hello1';	
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
