<template>
	<view class="content">
		<view class="backGround"></view>
		<view :class="popupBoxIfShow == true ? 'backGround-up':''"></view>
		<view class="page">
			<view class="air-header">
				<view class="airHeader-text">{{name}}</view>
				<view class="airHeader-return" @click="complete">完成</view>
			</view>
			<view class="globalControl">
				<view class="global-title">智能灯光中控</view>
				<card height="100" width="300">
					<template #default>
						<my-switch @click="globalLightHandler"></my-switch>
					</template>
				</card>
			</view>
			<view class="air-room" v-for="room in livingRoom">
				<view class="global-title">{{room.name}}</view>

			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref,
		reactive
	} from "vue";
	import card from '/components/card.vue'
	import mySwitch from '/components/mySwitch.vue'
	const name = ref('');
	onLoad((option) => {
		console.log(option);
		name.value = option.name;

	});
	const globalLightHandler = () => {
		console.log(111)
	}
	const popupBoxIfShow = ref(false);
	const popupBoxHandler = () => {
		popupBoxIfShow.value = true;

	};
	const closeBoxHandler = (newLevel) => {
		console.log(newLevel);
		popupBoxIfShow.value = false;
	}
	const livingRoom = reactive([{
		name: "门厅",
		open: "已开",
		close: "已关",
		temperature: "26",
		wind: "0",
		status: true,
	}, {
		name: "主卧",
		open: "已开",
		close: "已关",
		temperature: "24",
		wind: "1",
		status: true,
	}, {
		name: "客卧",
		open: "已开",
		close: "已关",
		temperature: "24",
		wind: "2",
		status: false,
	}, {
		name: "书房",
		open: "已开",
		close: "已关",
		temperature: "22",
		wind: "3",
		status: true,
	}, {
		name: "洗手间",
		open: "已开",
		close: "已关",
		temperature: "28",
		wind: "0",
		status: true,
	}]);

	const complete = () => {
		uni.switchTab({
			url: '/pages/home/home',
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


	.content {
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
