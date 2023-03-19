<template>
	<view class="lamp-content">
		<view class="backGround"></view>
		<view :class="popupBoxIfShow == true ? 'backGround-up':''"></view>
		<view class="page">
			<view class="air-header">
				<view class="airHeader-text">{{name}}</view>
				<view class="airHeader-return" @click="complete">完成</view>
			</view>
			<view class="air-room" v-for="(room,i) in roomList">
				<view class="global-title">{{room[0].roomName}}</view>
				<light-box @popup="popupHandler" :lighted="room[0].light" :rooms="room[0].idList"></light-box>
			</view>
		</view>
		<popup-global-light v-show="popupBoxIfShow" :name="popupMessage.name" @touchmove.stop.prevent
			@lightComplete="closeBoxHandler" :class="popupBoxIfShow == true ? 'content-fade-up-animation' : ''">
		</popup-global-light>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref,
		reactive,
	} from "vue";
	import card from '/components/card.vue'
	import lightBox from '/components/lightBox.vue'
	import popupGlobalLight from '/components/popupGlobalLight.vue'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	onLoad((option) => {});
	const roomList = ref(null);
	const roomLighted = ref();
	const popupMessage = reactive({
		name: ''
	});

	onShow(() => {
		roomList.value = account.lightList.reduce((group, light) => {
			const {
				roomName
			} = light;
			group[roomName] = group[roomName] ?? [];
			group[roomName].push(light);
			return group;
		}, {});
		console.log(roomList.value)
		roomLighted.value = {};
		let j = 0;
		for (const room in roomList.value) {
			console.log(roomList.value[room]);
			roomLighted.value[j] = 0;
			roomList.value[room][0].idList = [];
			for (const light in roomList.value[room]) {
				if (roomList.value[room][light].state) roomLighted.value[j]++;
				roomList.value[room][0].idList.push(roomList.value[room][light].id);
			}
			roomList.value[room][0].light = roomLighted.value[j];
			j++;
		}
		console.log(roomLighted.value)
	})
	//开启弹窗
	const popupHandler = (name) => {
		popupMessage.name = name;
		popupBoxIfShow.value = true;
	}
	const globalLightHandler = () => {

	}
	const popupBoxIfShow = ref(false);
	//关闭弹窗
	const closeBoxHandler = () => {
		popupBoxIfShow.value = false;
	}

	const complete = () => {
		uni.switchTab({
			url: '/pages/device/device',
			animationType: 'pop-out',
			animationDuration: 300
		});
	};
</script>

<style scoped>
	.page {
		position: relative;
		height: 100%;
		width: 100%;
		z-index: 3;
	}

	.air-header {
		position: relative;
		height: 140rpx;
		width: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 4;
	}

	.airHeader-text {
		position: absolute;
		left: 50%;
		top: 75%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		letter-spacing: 2px;
		color: #ffffff;
		z-index: 4;
	}

	.airHeader-return {
		position: absolute;
		left: 90%;
		top: 75%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		color: #1afa29;
	}

	.globalControl {
		margin-left: 30rpx;
		margin-top: 40rpx;
	}

	.global-title {
		margin-left: 10rpx;
		color: #ffffff;
	}

	.air-room {
		margin-top: 30rpx;
		margin-left: 30rpx;
	}

	.backGround {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url("/static/images/tour-1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 70%;
		z-index: 2;
	}

	.backGround-up {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: hsla(0, 0%, 0%, .1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		-webkit-transform: scale(1);
		z-index: 5;
	}


	.lamp-content {
		height: 100vh;
		width: 100vw;
	}

	.content-fade-up-animation {
		animation-duration: .2s;
		animation-name: fadeInUp;
		-webkit-animation-duration: .2s;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
		-webkit-animation-name: fadeInUp;
	}

	/* Content fade up animation */

	@keyframes fadeInUp {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	@-webkit-keyframes fadeInUp {
		from {
			display: block;
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}
</style>
