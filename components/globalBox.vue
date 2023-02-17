<template>
	<view @click="handleClick" class="content">
		<view class="backgroundColor" ></view>
		<view class="s-content">	
		<view class="thing-content" >
			<image class="thing" :src="photoOpen"></image>
		</view>
		<view class="statusBox">
			<view class="title" >{{title}}</view>
			<view class="status">{{open}}</view>
		</view>
		
		</view>
	</view>	
</template>

<script setup>
import { ref } from "vue";
    defineProps({
		title: String,
		open: String,
		photoOpen: String,
	});
	let selected = ref(false);
	const handleClick = ()=>{
		 selected.value = !selected.value;
	}
</script>

<style scoped>
	.content{
		position: relative;
		height: 80rpx;
		margin-right: 10rpx;
		padding-right: 20rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 3;
	}
	.s-content{
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
		z-index: 3;
		transition: 0.5s;
	}
	.title{
		height: 25rpx;
		width: 80rpx;
		z-index: 3;
		font-weight: 500;
		transition: 0.5s;
		font-size: 26rpx;
		color: #ffffff;
	}
	.status{
		height: 30rpx;
		padding-top: 10rpx;
		padding-right: 5rpx;
		color: #8a8a8a;
		font-weight: 500;
		z-index: 3;
		font-size: 26rpx;
		transition: 0.5s;
	}
	.statusBox{
		margin-bottom: 5rpx;
	}
	.thing-content{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 68rpx;
		width: 68rpx;
		margin-left: 5rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.5s;
	}
	.thing{
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;
	}
	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(74,74,74,0.7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}
</style>