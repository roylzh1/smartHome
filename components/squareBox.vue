<template>
	<view @click="handleClick" @longpress="pressHandler" class="content2">
		<view class="backgroundColor1" :style="{backgroundColor: selected == true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="s-content2">	
		<view class="thing-content1" :style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
			<view class="temp" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{temperature}}°C</view>
		</view>
		<view class="statusBox1">
			<view class="title1" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{title}}</view>
			<view class="status1">{{selected ? open : close}}</view>
		</view>
		
		</view>
	</view>	
</template>

<script setup>
import { ref } from "vue";
    const props = defineProps({
		title: String,
		open: String,
		close: String,
		temperature: String
	});
	const emit = defineEmits(['popup']);
	let selected = ref(false);
	const handleClick = ()=>{
		 selected.value = !selected.value;
	}
	const pressHandler = () => {
		selected.value = !selected.value;
		emit('popup',props.title,props.temperature);
	}
</script>

<style scoped>
	.content2{
		position: relative;
		height: 250rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 5;
	}
	.s-content2{
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
		z-index: 3;
		transition: 0.5s;
	}
	.title1{
		height: 30rpx;
		width: 140rpx;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.5s;
	}
	.status1{
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		padding-top: 20rpx;
		color: #8a8a8a;
		font-weight: 600;
		z-index: 3;
		transition: 0.5s;
	}
	.statusBox1{
		margin-bottom: 5rpx;
	}
	.thing-content1{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.5s;
	}
	.thing1{
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;

	}
	.backgroundColor1 {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0,0%,60%,.3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}
	.temp{
		font-size: 25rpx;
		font-weight: 600;
	}
</style>