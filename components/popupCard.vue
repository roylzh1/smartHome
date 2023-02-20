<template>
	<view class="lightContent" :style="{height: height+'vh'}">
		<view class="lightContent1" :style="{height: height+'vh'}">
			<view class="lightHeader">
				<view class="lightHeader-text">{{title}}</view>
				<view class="lightHeader-return" @click="complete">完成</view>
			</view>
			<slot></slot>
		</view>
		<view class="backgroundColor" :style="{height: height+'vh'}"></view>
	</view>
</template>

<script setup>
	const prop = defineProps({
		title: String,
		height: Number
	});
	const emit = defineEmits(['return']);
	const complete = ()=>{
		emit('return');
	}
</script>

<style scoped>
	.lightContent {
		position: fixed;
		top: 140rpx;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		z-index: 12;
	}
	.lightContent1 {
		position: fixed;
		overflow: hidden;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		z-index: 12;
	}
	.lightHeader {
		position: relative;
		height: 100rpx;
		background-color: rgba(0, 0, 0, .5);
	}
	
	.lightHeader-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		letter-spacing: 2px;
		color: #ffffff;
		z-index: 12;
	}
	
	.lightHeader-return {
		position: absolute;
		left: 90%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		color: #1afa29;
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
		transition: 0.5s;
	}
</style>