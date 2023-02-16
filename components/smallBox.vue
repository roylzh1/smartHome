<template>
	<view class="content">
		<view class="backgroundColor"></view>
		<view class="s-content">	
		<view>展位</view>
		<view>
			<view class="title">{{title}}</view>
			<view class="status">{{status}}</view>
		</view>
		
		</view>
	</view>	
</template>

<script setup>
	defineProps({
		title: String,
		status: String
	})
</script>

<style scoped>
	.content{
		position: relative;
		height: 250rpx;
		width: 300rpx;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.s-content{
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
		z-index: 6;
	}
	.title{
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		z-index: 6;
		color: #ffffff;
	}
	.status{
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		z-index: 6;
	}
	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(74,74,74,.9);
		filter: blur(20px);
		-webkit-transform: scale(2);
		z-index: 1;
	}
</style>