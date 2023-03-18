<template>
	<view class="backGround"></view>
	<view :class="popupAirIfShow ? 'backGround-up':''"></view>
	<view class="content">
		<h1 class="title">管理设备</h1>
		<view class="room">
			<view class="centerControl" v-show="hasAirCondition">
				<h3 class="g-title">智能中控</h3>
				<card @click="clickAirCondition">
					<template #default>
						<view class="box">
							<view class="air-status">
								<image @click="openAirHandler" class="air-status-logo" :src="imageSrc"
									:style="{filter: `grayscale(${level}) brightness(${level+1})`}"></image>
								<view class="air-status-text" :style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
									{{airStatus}}
								</view>
								<view class="air-status-text-num"
									:style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
									{{num}}台
								</view>
							</view>
							<view class="air-open">
								<view class="temperatureBox" :style="{color: isCold? '#1296db':'#1afa29'}">
									{{avgTemperature}}°C
								</view>
							</view>
						</view>
					</template>
				</card>


			</view>
		</view>
		<popup-global-air v-if="popupAirIfShow" @airGlobalComplete="closeAirHandler" title="空调中控" :temperture="26"
			:idList="airConditionIdList" airStatus="开启" :mode="0">
		</popup-global-air>
		<tab-bar selected="2"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import card from '/components/card.vue';
	import popupGlobalAir from '/components/popupGlobalAir.vue'
	import {
		onMounted,
		ref,
		nextTick,
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const popupAirIfShow = ref(true) //空调全局弹窗
	const hasAirCondition = ref(true); //是否显示空调
	const avgTemperature = ref(null); //平均温度
	const isCold = ref(null);
	const airStatus = ref('关闭');
	const ifAirOpen = ref(false); //判断是否开启
	const imageSrc = ref('/static/images/center-airconditioner.png'); //开关机图片
	const num = ref(0);
	const level = ref(1); //开关样式设置
	let airConditionIdList = ref([]); //所有空调的id
	onShow(async () => {
		console.log(account.airList);
		if (account.airConditionCount != 0) {
			hasAirCondition.value = true;
			//重置开关
			num.value = account.airConditionCount;
			if (num.value != 0) {
				airStatus.value = '开启';
				ifAirOpen.value = true;
				level.value = 0;
			} else {
				airStatus.value = '关闭';
			}
			airConditionIdList.value = [];
			account.airList.forEach(air => {
				airConditionIdList.value.push(air.id);
				if (air.state == true) airStatus.value = '开启';
			});
			avgTemperature.value = (account.airList.map(air => air.tempreture).reduce((pre, cur) =>
				pre + cur
			) / account.airList.length).toFixed(0);
			if (account.airList[0].mode == 1) { //暖风
				isCold.value = false;
			} else {
				isCold.value = true;
			}
			//空调图标
			if (ifAirOpen.value == true && isCold.value == true)
				imageSrc.value = '/static/images/center-airconditioner-open.png'
			else if (ifAirOpen.value == true && isCold.value == false)
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png'
			else
				imageSrc.value = '/static/images/center-airconditioner.png'


		}
	})
	//点击空调
	const clickAirCondition = async () => {
		console.log(111)
		popupAirIfShow.value = true;
	}
	const closeAirHandler = () => {
		popupAirIfShow.value = false;
	}


	const pressHandler = () => {

	}

	/*
	uni.navigateTo({
		url: `/pages/airConditioner/airConditioner?name=${name}`,
		animationType: 'pop-in',
		animationDuration: 500
	});
	*/
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		z-index: 2;
		background-color: #ffffff;
	}

	.room {
		display: flex;
		height: 80vh;
		margin: 0 30rpx;
	}

	.title {
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		color: #fff;
	}

	.centerControl {
		height: 100px;
		width: 80vw;
		z-index: 2;
	}

	.g-content {
		margin-top: 10px;
	}

	.g-title {
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
		height: 90rpx;
		width: 90rpx;
		margin-top: 20rpx;
		transition: .2s;
		background-color: #ffffff;
		color: rgba(0, 0, 0, .8);
		font-size: 30rpx;
		font-weight: 600;
		border-radius: 50%;
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
		z-index: 1;
	}

	.backGround-up {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: hsla(0, 0%, 0%, .1);
		backdrop-filter: blur(3px);
		-webkit-transform: scale(1);
		z-index: 7;
	}

	.content-fade-up {
		animation-duration: .2s;
		animation-name: fadeInUp1;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
	}

	.content-fade-up-animation {
		animation-duration: .2s;
		animation-name: fadeInUp;
		-webkit-animation-duration: .2s;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
		-webkit-animation-name: fadeInUp;
	}

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

	@keyframes fadeInUp1 {
		from {
			height: 0vh;
		}

		to {
			height: 35vh;
		}
	}
</style>
