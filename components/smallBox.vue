<template>
	<view @longpress="pressHandler" @click="handleClick" class="content">
		<view class="backgroundColor" :style="{backgroundColor: selected == true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="s-content">	
		<view class="thing-content" :style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
			<image class="thing" :src="selected == true ? photoOpen : photoClose" ></image>
		</view>
		<view class="statusBox">
			<view class="title" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{title}}</view>
			<view class="status">{{selected ? open : close}}</view>
		</view>
		
		</view>
	</view>	
</template>

<script setup>
import { ref } from "vue";
    const props = defineProps({
		type: String,
		title: String,
		open: String,
		close: String,
		photoOpen: String,
		photoClose: String
	});
	const emit = defineEmits(['popup']);
	let selected = ref(false);
	const handleClick = ()=>{
		 selected.value = !selected.value;
	};
	const pressHandler = () => {
		selected.value = !selected.value;
		emit('popup',props.title);
	}
</script>

<style scoped>
	.content{
		position: relative;
		height: 115rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.3s;
		z-index: 3;
	}
	.s-content{
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		z-index: 3;
		transition: 0.3s;
	}
	.title{
		height: 30rpx;
		width: 200rpx;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.3s;
	}
	.status{
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		padding-top: 10rpx;
		color: #8a8a8a;
		font-weight: 600;
		z-index: 3;
		transition: 0.3s;
	}
	.statusBox{
		margin-bottom: 15rpx;
	}
	.thing-content{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.3s;
	}
	.thing{
		height: 70%;
		width: 70%;
		z-index: 5;
		transition: 0.3s;

	}
	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0,0%,60%,.3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.3s;
	}
</style>