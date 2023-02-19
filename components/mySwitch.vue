<template>
	<view class="swtich" @click="globalLightHandler">
		<view class="on-off" :class="ifGlobalLight ? 'on-off-light':''">
			<image src="/static/images/bulb-light.png" class="logo"></image>
			</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from "vue";
	const ifGlobalLight = ref(false);
	const globalLightHandler = ()=>{
		ifGlobalLight.value = !ifGlobalLight.value;
	}
</script>

<style scoped>
	.swtich{
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		background-color: #ffffff;
		transition: .7s;
	}
	.on-off{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90%;
		width: 50%;
		border-radius: 30rpx;
		margin-left: 5rpx;
		background-color: #cdcdcd;
		transition: .7s;
	}
	.on-off-light{
		background-color: #1afa29;
		transition: .7s;
		transform: translateX(140rpx);
	}
	.logo{
		height: 50rpx;
		width: 50rpx;
	}
</style>