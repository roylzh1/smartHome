<template>
	<view class="content2">
		<view class="content">
			<view class="backgroundColor"></view>
			<view class="s-content">
				<view class="thing-content" v-for="mode in modes" @click="handleClick(mode.id)">
					<image class="thing" src="/static/images/fan-globe.png"></image>
				</view>
				<view class="statusBox">
					<view class="title">{{mode?.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import myRequest from '/utils/request.js';
	import {
		onMounted,
		ref,
		nextTick,
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app'
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const modes = ref([]);
	const emit = defineEmits(['popupNav']);
	onShow(async () => {
		const {
			data
		} = await myRequest({
			url: `Home/GetHomeInformation`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		modes.value = [];
		modes.value = data.modes;
		console.log(data)
	});
	const handleClick = (id) => {
		emit('popup', id);
	}
	const itemArray = [{
		title: "观影模式",
		open: "1",
		photoOpen: "/static/images/fan-globe.png"
	}, {
		title: "灯",
		open: "3盏开着",
		photoOpen: "/static/images/light-globe.png",
	}, {
		title: "安全",
		open: "1个没锁",
		photoOpen: "/static/images/lock.png"
	}];
</script>

<style scoped>
	.content2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100rpx;
		width: auto;
		margin-top: 10rpx;
		z-index: 3;
		overflow-x: auto;
	}

	.content {
		position: relative;
		display: inline-block;
		height: 80rpx;
		width: fit-content;
		min-width: 200rpx;
		margin-left: 30rpx;
		padding-right: 11rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 3;
	}

	.s-content {
		position: relative;
		height: 100%;
		width: fit-content;
		min-width: 200rpx;
		max-width: 250rpx;
		border-radius: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
		z-index: 3;
		transition: 0.5s;
	}

	.title {
		height: 22px;
		z-index: 3;
		font-weight: 500;
		transition: 0.5s;
		font-size: 26rpx;
		color: #ffffff;
	}

	.status {
		height: 30px;
		width: auto;
		padding-right: 5rpx;
		color: #8a8a8a;
		font-weight: 500;
		z-index: 3;
		font-size: 26rpx;
		transition: 0.5s;
	}

	.statusBox {
		display: inline-block;
		margin-left: 4px;
		width: fit-content;
	}

	.thing-content {
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

	.thing {
		height: 65%;
		width: 65%;
		z-index: 5;
		transition: 0.5s;
	}

	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 25%, .7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>
