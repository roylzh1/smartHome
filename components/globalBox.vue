<template>
	<view @click="handleClick" class="content">
		<view class="backgroundColor"></view>
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
    const prop = defineProps({
		title: String,
		open: String,
		photoOpen: String,
	});
	const emit = defineEmits(['popup']);
	const handleClick = ()=>{
		emit('popup',prop.title);
		
	}
</script>

<style scoped>
	.content{
		position: relative;
		display: inline-block;
		height: 80rpx;
		width:fit-content;
		min-width: 200rpx;
		margin-left: 30rpx;
		padding-right: 11rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 3;
	}
	.s-content{
		position: relative;
		height: 100%;
		width:fit-content;
		min-width: 200rpx;
		max-width: 250rpx;
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
		z-index: 3;
		font-weight: 500;
		transition: 0.5s;
		font-size: 26rpx;
		color: #ffffff;
	}
	.status{
		height: 30rpx;		
		width: auto;
		padding-top: 10rpx;
		padding-right: 5rpx;
		color: #8a8a8a;
		font-weight: 500;
		z-index: 3;
		font-size: 26rpx;
		transition: 0.5s;
	}
	.statusBox{
		display: inline-block;
		margin-bottom: 5rpx;
		width: fit-content;
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
		height: 65%;
		width: 65%;
		z-index: 5;
		transition: 0.5s;
	}
	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0,0%,25%,.7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}
	
</style>