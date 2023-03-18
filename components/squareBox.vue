<template>
	<view @click="handleClick" @longpress="pressHandler" class="content2">
		<view class="backgroundColor1"
			:style="{backgroundColor: props.status== true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="s-content2">
			<view class="thing-content1" :style="{backgroundColor: props.status == true ? isCold : `rgba(0,0,0,.5)`}">
				<view class="temp" :style="{color: props.status== true ?`rgba(0,0,0,1)` : `#ffffff`}">{{temperature}}°C
				</view>
			</view>
			<view class="statusBox1">
				<view class="status2" :style="{color: props.status == true ?`rgba(0,0,0,1)` : `#ffffff`}">
					<view class="">
						风速: {{props.wind}}
					</view>
					<view class="air-mode">
						模式: 除湿
					</view>
				</view>
				<view class="status1">{{props.status ? open : close}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
	} from "vue";
	import {
		onShow
	} from '@dcloudio/uni-app';
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js'
	const account = useAccountStore();
	const props = defineProps({
		title: String,
		open: String,
		close: String,
		temperature: String,
		isCold: String,
		status: Boolean,
		wind: String,
		index: Number
	});
	const emit = defineEmits(['popup', 'checkStatus']);
	const windName = ref(null);

	const handleClick = () => {
		emit('popup', props.index);
	}
</script>

<style scoped>
	.content2 {
		position: relative;
		height: 250rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 5;
	}

	.s-content2 {
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

	.title1 {
		height: 30rpx;
		width: 200rpx;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.5s;
	}

	.status1 {
		height: 30rpx;
		width: 80rpx;
		margin-bottom: 20px;
		font-weight: 600;
		z-index: 3;
		transition: 0.5s;
	}

	.statusBox1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.status2 {
		height: 30rpx;
		width: 80px;
		font-size: 14px;
		margin-top: -20px;
		margin-left: 10px;
		font-weight: 600;
		z-index: 3;
		transition: 0.5s;
	}

	.air-mode {
		margin-top: 10px;
	}

	.thing-content1 {
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

	.thing1 {
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;

	}

	.backgroundColor1 {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}

	.temp {
		font-size: 25rpx;
		font-weight: 600;
	}
</style>
