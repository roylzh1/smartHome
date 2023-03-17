<template>
	<view class="g-content">
		<h3 class="g-title">智能中控</h3>
		<card>
			<template #default>
				<view class="box">
					<view class="air-status">
						<image @click="openAirHandler" class="air-status-logo" :src="imageSrc"
							:style="{filter: `grayscale(${level}) brightness(${level+1})`}"></image>
						<view class="air-status-text" :style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
							{{airStatus}}
						</view>
						<view class="air-status-text-num" :style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
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
</template>

<script setup>
	import card from '/components/card.vue';
	import {
		ref,
		reactive,
		watch,
		computed,
	} from "vue";
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const airConditionList = ref(account.airList);
	const avgTemperature = ref(); //平均温度
	const temp = (airConditionList.value.map(air => air.tempreture).reduce((pre, cur) =>
		pre + cur
	) / airConditionList.value.length).toFixed(0);
	avgTemperature.value = temp;
	const isCold = ref(null);
	console.log(airConditionList.value[0])
	if (airConditionList.value[0].mode == 1) { //暖风
		isCold.value = false;
	} else {
		isCold.value = true;
	}
	const airStatus = ref('关闭');
	const ifAirOpen = ref(false);
	const imageSrc = ref('/static/images/center-airconditioner.png'); //开关机图片
	const num = ref(0);
	const level = ref(1); //开关样式设置
	airConditionList.value.forEach(air => {
		if (air.state == true) {
			airStatus.value = '开启';
			ifAirOpen.value = true;
			num.value++;
		}
	});
	//空调图标
	if (ifAirOpen.value == true && isCold.value == true)
		imageSrc.value = '/static/images/center-airconditioner-open.png'
	else if (ifAirOpen.value == true && isCold.value == false)
		imageSrc.value = '/static/images/center-airconditioner-open-hot.png'
	else
		imageSrc.value = '/static/images/center-airconditioner.png';

	watch(() => account.airList, (newValue) => {
		airConditionList.value = newValue;
		//重置平均温度
		avgTemperature.value = (airConditionList.value.map(air => air.tempreture).reduce((pre, cur) =>
			pre + cur
		) / airConditionList.value.length).toFixed(0);
		//重置冷暖
		if (airConditionList.value[0].mode == 1) { //暖风
			isCold.value = false;
		} else {
			isCold.value = true;
		}
		//重置开关
		airStatus.value = '关闭';
		num.value = 0;
		airConditionList.value.forEach(air => {
			if (air.state == true) airStatus.value = '开启';
		});
	});

	const popupBoxIfShow = ref(false);
	let popupMessage = reactive({
		title: '',
		temperature: '',
		wind: ''
	});
	//控制开关
	const openAirHandler = async () => {
		ifAirOpen.value = !ifAirOpen.value;
		if (ifAirOpen.value) {
			airStatus.value = '开启中';
			if (isCold.value)
				imageSrc.value = '/static/images/center-airconditioner-open.png';
			else
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png';
			level.value = 0;
			num.value = airConditionList.value.length;
			/*
			const res = await myRequest({
				url: `Room/GetRoom`,
				method: 'get',
				data: {
					
				}
			});
			if (res.data.status == 400) return;
			*/
		} else {
			airStatus.value = '关闭';
			if (isCold.value)
				imageSrc.value = '/static/images/center-airconditioner.png';
			else
				imageSrc.value = '/static/images/center-airconditioner-hot.png';
			level.value = 1;
			num.value = 0;

		}
	};
</script>

<style scoped>
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
