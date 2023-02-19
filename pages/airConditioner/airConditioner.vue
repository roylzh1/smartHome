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
				<view class="global-title">智能中控</view>
				<card>
					<template #default>
						<view class="box">
							<view class="air-status">
								<image @click="openAirHandler" class="air-status-logo" :src="imageSrc"
									:style="{filter: `grayscale(${level}) brightness(${level+1})`}"></image>
								<view class="air-status-text"
									:style="{color: ifAirOpen == true ?`rgba(240,214,105,1)` : `#c8c8c8`}">{{airStatus}}
								</view>
								<view class="air-status-text-num"
									:style="{color: ifAirOpen == true ?`rgba(240,214,105,1)` : `#c8c8c8`}">1台</view>
							</view>
							<view class="air-open">
								<view class="temperatureBox" :style="{color: isCold? '#1296db':'#1afa29'}">
									{{temperatureValue}}°C</view>
								<view class="temperature-text">
									<image @click="temperatureHandler(0)" class="tempLogo"
										src="/static/images/tempDown.png"></image>
									<image @click="temperatureHandler(1)" class="tempLogo"
										src="/static/images/tempUp.png"></image>
								</view>
							</view>
							<view class="vChange">
								<view @click="vHandler" class="temperatureBox">
									<image :src="vSrc" class="vLogo"></image>
								</view>
								<view @click="modeHandler" class="temperatureBox">
									<image :src="modeSrc" class="vLogo"></image>
								</view>
							</view>
						</view>
					</template>
				</card>
			</view>
			<view class="air-room">
				<view class="global-title">卧室</view>
				<square-box @popup="popupBoxHandler" :title="livingRoom.title" :open="livingRoom.open" :close="livingRoom.close" :temperature="livingRoom.temperature"></square-box>
			</view>
		</view>
		<popup-box-air @touchmove.stop.prevent :isCold="isCold" :temperature="temperatureValue" :title="popupMessage.title" v-if="popupBoxIfShow" :class="popupBoxIfShow == true ? 'content-fade-up-animation' : ''" @lightComplete="closeBoxHandler"></popup-box-air>
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
	import squareBox from '/components/squareBox.vue'
	import popupBoxAir from '/components//popupBoxAir.vue'
	const name = ref('');
	onLoad((option) => {
		console.log(option);
		name.value = option.name;
	});
	const temperatureValue = ref(26);
	const imageSrc = ref('/static/images/center-airconditioner.png');
	const vLevel = ref(0);
	const vSrc = ref(`/static/images/v0.png`);
	const modeSrc = ref('/static/images/cold.png');
	const isCold = ref(true);
	const ifAirOpen = ref(false);
	const airStatus = ref('关闭');
	const level = ref(1);
	const popupBoxIfShow = ref(false);
	let popupMessage = reactive({
		title: '',
		temperature: ''
	});
	const openAirHandler = () => {
		ifAirOpen.value = !ifAirOpen.value;
		if (ifAirOpen.value) {
			airStatus.value = '开启中';
			if (isCold.value)
				imageSrc.value = '/static/images/center-airconditioner-open.png';
			else
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png';
			level.value = 0;
		} else {
			airStatus.value = '关闭';
			if (isCold.value)
				imageSrc.value = '/static/images/center-airconditioner.png';
			else
				imageSrc.value = '/static/images/center-airconditioner-hot.png';
			level.value = 1;
		}

	};
	const temperatureHandler = type => {
		if (type === 0) {
			if (temperatureValue.value > 16)
				temperatureValue.value--;
		} else {
			if (temperatureValue.value < 32)
				temperatureValue.value++;
		}
	};
	const vHandler = () => {
		if (vLevel.value < 3) {
			vLevel.value++;
			if (isCold.value)
				vSrc.value = `/static/images/v${vLevel.value}.png`;
			else
				vSrc.value = `/static/images/v${vLevel.value}-hot.png`;
		} else {
			vLevel.value = 0;
			if (isCold.value)
				vSrc.value = `/static/images/v${vLevel.value}.png`;
			else
				vSrc.value = `/static/images/v${vLevel.value}-hot.png`;
		}
	}
	const modeHandler = () => {
		if (isCold.value) {
			isCold.value = !isCold.value;
			modeSrc.value = `/static/images/hot.png`;
			vSrc.value = `/static/images/v${vLevel.value}-hot.png`;
			if (ifAirOpen.value)
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png';
			else
				imageSrc.value = '/static/images/center-airconditioner-hot.png';
		} else {
			isCold.value = !isCold.value;
			modeSrc.value = `/static/images/cold.png`;
			vSrc.value = `/static/images/v${vLevel.value}.png`;
			if (ifAirOpen.value)
				imageSrc.value = '/static/images/center-airconditioner-open.png';
			else
				imageSrc.value = '/static/images/center-airconditioner.png';
		}
	};
	const popupBoxHandler = (title,temperature) => {
		popupBoxIfShow.value = true;
		popupMessage.temperature = temperature;
		popupMessage.title = title;
		console.log(temperature);
	};
	const closeBoxHandler = () => {
		popupBoxIfShow.value = false;
	}
	const livingRoom = {
		title: "卧室空调",
		open: "已开",
		close: "已关",
		temperature: "26",
	};
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

	.box {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
	}

	.air-status-logo {
		height: 80rpx;
		width: 80rpx;
		margin-top: 20rpx;
		transition: 1s;
	}

	.air-status-text {
		font-weight: 700;
		margin-top: 30rpx;
		transition: 1s;
	}

	.air-status-text-num {
		margin-bottom: 10rpx;
		transition: 1s;
	}

	.air-status {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		width: 100rpx;
		margin-top: 15rpx;
		margin-left: 10rpx;
	}

	.air-open {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		width: 130rpx;
		margin-left: 30rpx;
		margin-top: 15rpx;
	}

	.temperatureBox {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-top: 20rpx;
		transition: .2s;
		background-color: #ffffff;
		color: rgba(0, 0, 0, .8);
		font-size: 25rpx;
		font-weight: 600;
		border-radius: 50%;
	}

	.temperature-text {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
	}

	.tempLogo {
		height: 60rpx;
		width: 60rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.vChange {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		width: 100rpx;
		margin-left: 30rpx;
		margin-right: 10rpx;
		margin-top: 15rpx;
	}

	.vLogo {
		height: 60rpx;
		width: 60rpx;
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
		background-color: hsla(0,0%,0%,.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		-webkit-transform: scale(1);
		z-index: 5;
	}
	.air-room {
		display: flex;
		flex-wrap: wrap;
		height: 300rpx;
		width: 350rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
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
