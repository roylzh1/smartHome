<template>
	<view class="content">
		<view class="backGround"></view>
		<view :class="popupBoxIfShow == true ? 'backGround-up':''"></view>
		<view class="page">
			<view class="air-header">
				<view class="airHeader-text">房间空调</view>
				<view class="airHeader-return" @click="complete">完成</view>
			</view>
			<view class="air-room" v-for="(air,index) in airList">
				<view class="global-title">{{air.roomName+'空调'}}</view>
				<square-box @popup="popupBoxHandler" :isCold="isCold?'#1296db':'#1afa29'" open="开启" close="关闭"
					:temperature="air.tempreture" :wind="air.level" :status="air.state" :index="index">
				</square-box>
			</view>
		</view>
		<popup-air v-if="popupBoxIfShow" @airComplete="closeBoxHandler" :title="popupMessage.title"
			:temperture="popupMessage.temperature" :id="popupMessage.id" :airStatus="popupMessage.status"
			:mode="popupMessage.mode" :index="popupMessage.index"
			:class="popupBoxIfShow == true ? 'content-fade-up-animation' : ''">
		</popup-air>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref,
		reactive
	} from "vue";
	import card from '/components/card.vue'
	import squareBox from '/components/squareBox.vue'
	import popupAir from '/components/popupAir.vue'
	import {
		useAccountStore
	} from '@/store/account.js'
	const account = useAccountStore();
	const name = ref('');
	onLoad((option) => {
		console.log(option);
		name.value = option.name;
	});
	const airStatus = ref('关闭');
	const level = ref(1);
	const popupBoxIfShow = ref(false);
	const airList = ref([]);
	const isCold = ref(true);
	const nowIndex = ref(0);
	onShow(() => {
		airList.value = account.airList;
	})
	let popupMessage = reactive({
		title: '',
		temperature: '',
		wind: '',
		mode: '',
		id: '',
		status: '',
		index: ''
	});

	const popupBoxHandler = (index) => {
		popupMessage.title = airList.value[index].roomName + ' 空调';
		popupMessage.temperature = airList.value[index].tempreture;
		popupMessage.wind = airList.value[index].level;
		popupMessage.mode = airList.value[index].mode;
		popupMessage.id = airList.value[index].id;
		popupMessage.status = airList.value[index].state;
		popupMessage.index = index;
		nowIndex.value = index;
		popupBoxIfShow.value = true;
	};
	const closeBoxHandler = () => {
		console.log(account.airList[nowIndex.value].mode)
		if (account.airList[nowIndex.value].mode === 0)
			isCold.value = true;
		else
			isCold.value = false;
		console.log(isCold.value)
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
