<template>
	<popup-card :title="title" @return="complete">
		<view class="air-g-content">
			<view class="g-temp">
				<span>{{temperture}}</span>
				<span class="c">
					°C
				</span>
			</view>
			<view class="g-list">
				<view class="g-mode">
					{{mode}}
				</view>
				<view class="g-mode">
					风速 {{level}}
				</view>
			</view>
			<view class="open" @click="openAir">
				<view :class="openClass">
					<image class="openImage" :src="switchSrc"></image>
				</view>
				<view class="open-text">
					开关
				</view>
			</view>
			<view class="function-box">
				<view class="temperture-title">
					温度调节 16°C-32°C
				</view>
				<view class="temperture-btn">
					<view class="temperture-add" @click="changeTemperture(1)">
						<view style="margin-left: 20px; margin-bottom: 2px;">
							+
						</view>

					</view>
					<view class="temperture-sub" @click="changeTemperture(0)">
						<view style="margin-right: 20px;">
							-
						</view>

					</view>
				</view>
				<view class="mode-title">
					模式
				</view>
				<view class="mode">
					<div class="mode-btn" @click="clickModeBtn(0)" :class="modeNum===0 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/cold.png"></image>
					</div>
					<div class="mode-btn" @click="clickModeBtn(1)" :class="modeNum===1 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/hot.png"></image>
					</div>
					<div class="mode-btn" @click="clickModeBtn(2)" :class="modeNum===2 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/fan-globe.png"></image>
					</div>
				</view>
				<view class="level-title">
					风速
				</view>
				<view class="level">
					<div class="mode-btn " @click="clickLevelBtn(0)" :class="levelNum===0 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/v0.png"></image>
					</div>
					<div class="mode-btn" @click="clickLevelBtn(1)" :class="levelNum===1 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/v1.png"></image>
					</div>
					<div class="mode-btn" @click="clickLevelBtn(2)" :class="levelNum===2 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/v2.png"></image>
					</div>
					<div class="mode-btn" @click="clickLevelBtn(3)" :class="levelNum===3 ? 'mode-choose-btn': ''">
						<image class="mode-img" src="../static/images/v3.png"></image>
					</div>
				</view>


			</view>
			<view class="picker">
				<view class="input-text">
					定时
				</view>
				<picker class="input-picker" mode="time" :value="time" start="09:01" end="21:01"
					@change="bindTimeChange">
					<view class="input-time">{{time}}</view>
				</picker>
				<view class="pick-btn">
					确定
				</view>
			</view>
		</view>
	</popup-card>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch,
	} from "vue";
	import popupCard from '/components/popupCard.vue';
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	import {
		onShow,
	} from '@dcloudio/uni-app'
	const account = useAccountStore();
	const props = defineProps({
		title: String,
		temperture: String,
		mode: Number,
		airStatus: String,
		id: String,
		index: Number
	});
	const mode = ref(null);
	const modeNum = ref(null);
	const temperture = ref(null);
	const level = ref('自动');
	const levelNum = ref(0);
	const switchSrc = ref(null);
	const openClass = ref(null);
	const openBoxClass = ref(null);
	const state = ref(null);
	const time = ref('');
	const emit = defineEmits(['airComplete']);
	onShow(() => {
		if (props.mode == 0) {
			mode.value = '制冷';
			modeNum.value = 0;
		} else if (props.mode == 1) {
			mode.value = '制热';
			modeNum.value = 1;
		} else {
			mode.value = '除湿';
			modeNum.value = 2;
		}
		temperture.value = props.temperture;
		if (props.airStatus == true) {
			switchSrc.value = '/static/images/switch-open.png';
			openClass.value = 'openImage-box-open';
			openBoxClass.value = 'open-open';
			state.value = true;
		} else {
			switchSrc.value = '/static/images/switch-close.png';
			openClass.value = 'openImage-box-close';
			openBoxClass.value = 'open-close';
			state.value = false;
		}
		time.value = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
	})
	//开关按钮
	const openAir = () => {
		state.value = !state.value;
		if (state.value) {
			switchSrc.value = '/static/images/switch-open.png';
			openClass.value = 'openImage-box-open';
			openBoxClass.value = 'open-open';
		} else {
			switchSrc.value = '/static/images/switch-close.png';
			openClass.value = 'openImage-box-close';
			openBoxClass.value = 'open-close';
		}
	}
	//温度按钮
	const changeTemperture = (judge) => {
		if (judge == 1 && temperture.value < 32) { //add
			temperture.value++;
		}
		if (judge == 0 && temperture.value > 16) {
			temperture.value--;
		}
	}
	//风速按钮
	const clickLevelBtn = (index) => {
		if (index === 0) {
			levelNum.value = index;
			level.value = '自动'
		} else if (index === 1) {
			levelNum.value = index;
			level.value = '低';
		} else if (index === 2) {
			levelNum.value = index;
			level.value = '中';
		} else if (index === 3) {
			levelNum.value = index;
			level.value = '高';
		}
	}
	const clickModeBtn = (index) => {
		if (index === 0) {
			modeNum.value = index;
			mode.value = '制冷'
		} else if (index === 1) {
			modeNum.value = index;
			mode.value = '制热';
		} else {
			modeNum.value = index;
			mode.value = '除湿';
		}
	}
	//完成
	const complete = async () => {
		const res = await myRequest({
			url: `Tcp/ChangeAirCondition`,
			method: 'post',
			data: {
				"airConditionId": props.id,
				"state": state.value,
				"mode": modeNum.value,
				"temperature": temperture.value,
				"level": levelNum.value,
				"sessionId": account.homeTcp
			}
		});
		account.airList[props.index].state = state.value;
		account.airList[props.index].mode = modeNum.value;
		account.airList[props.index].level = levelNum.value;
		account.airList[props.index].tempreture = temperture.value;
		emit('airComplete');
		uni.navigateTo({
			url: `/pages/airConditioner/airConditioner`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	};
	const bindTimeChange = e => {
		time.value = e.detail.value
	};
</script>

<style scoped>
	.air-g-content {
		height: 80%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.g-temp {
		margin-top: 20px;
		font-size: 70px;
		color: #fff;
	}

	.c {
		font-size: 20px;
	}

	.g-list {
		display: flex;
		justify-content: space-around;
		width: 150px;
		color: #fff;
	}


	.open {
		display: flex;
		align-items: center;
		margin-top: 20px;
		background-color: #fff;
		height: 70px;
		width: 80%;
		border-radius: 10px;
	}

	.openImage {
		margin-right: 1px;
		margin-bottom: 1px;
		height: 20px;
		width: 20px;
	}

	.open-text {
		margin-left: 10px;
		font-size: 13px;
		color: #bfbfbf;
	}

	.openImage-box-close {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		width: 35px;
		background-color: rgba(0, 0, 0, .7);
		border-radius: 50%;
		margin-left: 10px;
		transition: .5s;
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4), -1px -1px 3px rgba(0, 0, 0, 0.4);
		margin: 10px;
	}

	.openImage-box-open {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		width: 35px;
		background-color: rgba(240, 214, 105, 1);
		border-radius: 50%;
		margin-left: 10px;
		transition: .5s;
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4), -1px -1px 3px rgba(0, 0, 0, 0.4);
		margin: 10px;
	}

	.function-box {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-top: 20px;
		background-color: #fff;
		height: 350px;
		width: 80%;
		border-radius: 10px;
	}

	.temperture-btn {
		display: flex;
		height: 70px;
		width: 90%;
		margin-top: 30px;
		border-radius: 10px;
	}

	.temperture-add,
	.temperture-sub {
		border: none;
		outline: none;
		font-size: 1.5rem;
		width: 50%;
		height: 100%;
		box-shadow: 0 0.1rem 0.9rem rgba(0, 0, 0, 0.3);
		cursor: pointer;
		position: relative;
		z-index: 1;
	}

	.temperture-add::before,
	.temperture-add::after,
	.temperture-sub::before,
	.temperture-sub::after {
		content: "";
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.temperture-add::before,
	.temperture-sub::before {
		background: rgba(0, 0, 0, 0.1);
		box-shadow: 0 5rem 1rem rgba(0, 0, 0, 0.3);
	}

	.temperture-add::after,
	.temperture-sub::after {
		background: rgba(0, 0, 0, 0.1);
		box-shadow: 0 5rem 1rem rgba(0, 0, 0, 0.6);
	}

	.temperture-add {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 25px;

		color: #bfbfbf;
		border-radius: 10px 0 0 10px;
		background: linear-gradient(to right, #ffffff, #d9d9d9);
	}

	.temperture-sub {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 30px;
		color: #c2c2c2;

		border-radius: 0 10px 10px 0;
		background: linear-gradient(to left, #ffffff, #d9d9d9);
	}

	.temperture-add:active {
		box-shadow: inset 5px 0px 5px -5px rgba(0, 0, 0, 0.5);
		transform: translateX(1px);
	}

	.temperture-sub:active {
		box-shadow: inset 5px 0px 5px -5px rgba(0, 0, 0, 0.5);
		transform: translateX(-1px);
	}

	.temperture-title {
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 120px;
		font-size: 12px;
		margin-left: 10px;
		margin-top: 5px;
		color: #bfbfbf;
	}

	.mode {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 90%;
		height: 100px;
		margin-top: 30px;
	}

	.mode-title {
		position: absolute;
		top: 110px;
		left: 0;
		height: 20px;
		width: 120px;
		font-size: 12px;
		margin-left: 10px;
		margin-top: 5px;
		color: #bfbfbf;
	}

	.mode-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		font-size: 12px;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
		transition: all 0.2s ease-in-out;
	}

	.mode-choose-btn {
		transform: translateY(-5px) scale(1.1);
		background-color: #fff;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
	}

	.mode-img {
		width: 35px;
		height: 35px;
	}

	.level-title {
		position: absolute;
		top: 215px;
		left: 0;
		height: 20px;
		width: 120px;
		font-size: 12px;
		margin-left: 10px;
		margin-top: 5px;
		color: #bfbfbf;
	}

	.level {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 90%;
		height: 100px;
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.picker {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		width: 280px;
		font-size: 14px;
		font-weight: 600;
		background-color: #fff;
		border-radius: 5px;
	}

	.picker .input-time {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 50px;
		padding: 0 20px;
		background-color: #bfbfbf;
		border-radius: 5px;
		margin: 0 5px;
	}

	.pick-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 60px;
		background-color: rgba(240, 214, 105, 1);
		border-radius: 5px;
		margin: 0 5px;
	}

	.input-text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 60px;
		color: #bfbfbf;
		background-color: rgb(244, 68, 78);
		border-radius: 5px;
		margin: 0 5px;
	}

	.input-picker {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 60px;
		color: #fff;
		font-size: 16px;
	}

	.backgroundColor {
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .5);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(1);
		z-index: 11;
	}
</style>
