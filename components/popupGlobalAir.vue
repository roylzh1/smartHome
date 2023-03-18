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
					制冷
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
			<view class="temperture">
				<view class="temperture-title">
					温度调节 16°C-32°C
				</view>
				<view class="temperture-btn">
					<view class="temperture-add">
						<view style="margin-left: 20px; margin-bottom: 2px;">
							+
						</view>

					</view>
					<view class="temperture-sub">
						<view style="margin-right: 20px;">
							-
						</view>

					</view>
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
	import popupCard from '/components/popupCard.vue'
	import {
		onShow,
	} from '@dcloudio/uni-app'
	const props = defineProps({
		title: String,
		temperture: String,
		mode: Number,
		airStatus: String,
	});
	const mode = ref(null);
	const temperture = ref(null);
	const level = ref('自动');
	const switchSrc = ref(null);
	const openClass = ref(null);
	const openBoxClass = ref(null);
	const state = ref(null);
	const emit = defineEmits(['airGlobalComplete']);
	onShow(() => {
		if (props.mode == 0) {
			mode.value = '制冷';
		} else if (props.mode == 1) {
			mode.value = '制热';
		} else {
			mode.value = '除湿';
		}
		temperture.value = props.temperture;
		if (props.airStatus == '开启') {
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


	})
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
	//完成
	const complete = () => {
		emit('airGlobalComplete');
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
		color: #bfbfbf;
	}


	.open {
		display: flex;
		align-items: center;
		margin-top: 40px;
		background-color: #fff;
		height: 50px;
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
		margin-left: 20px;
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
	}

	.temperture {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40px;
		background-color: #fff;
		height: 120px;
		width: 80%;
		border-radius: 10px;
	}

	.temperture-btn {
		display: flex;
		height: 70px;
		width: 90%;
		margin-top: 20px;
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
		box-shadow: inset -5px 0px 5px -5px rgba(0, 0, 0, 0.5);
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
