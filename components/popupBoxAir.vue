<template>
	<popup-card :title="title" @return="complete">
		<view class="lighting">
			<image class="logo" :src="vImage"></image>
			<view class="adjust-content" @touchmove="moveHandler">
				<view class="adjust" :class="className" :style="{transform:`translateY(${moveY}px)`}"></view>
			</view>
			<view class="air-open">
				<view class="temperatureBox" :style="{color: isCold? '#1296db':'#1afa29'}">
					{{temperatureValue}}°C
				</view>
				<view class="temperature-text">
					<image @click="temperatureHandler(0)" class="tempLogo" src="/static/images/tempDown.png"></image>
					<image @click="temperatureHandler(1)" class="tempLogo" src="/static/images/tempUp.png"></image>
				</view>
			</view>
		</view>
	</popup-card>

</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	import popupCard from '/components/popupCard.vue'
	const prop = defineProps({
		title: String,
		temperature: Number,
		wind: String,
		isCold: Boolean
	});
	const emit = defineEmits(['lightComplete']);
	let level = ref(prop.wind);
	let beforeIndex = 0;
	let nowIndex = 0;
	let moveY = ref(800);
	let vImage = ref('');
	const temperatureValue = ref(26);
	const hot = ref('');
	const className = ref('');
	const complete = () => {
		emit('lightComplete',level.value);
	};

	const moveHandler = (e) => {
		e.preventDefault();
		beforeIndex = nowIndex;
		nowIndex = e.changedTouches[0].clientY;
		if (nowIndex <= 270) {
			moveY.value = 0;
			level.value = 0;
			vImage.value = `/static/images/v3${hot.value}.png`;
			return;
		}
		if (nowIndex <= 400) {
			moveY.value = 100;
			level.value = .3;
			vImage.value = `/static/images/v2${hot.value}.png`;
			return;
		}
		if (nowIndex <= 550) {
			moveY.value = 200;
			level.value = .7;
			vImage.value = `/static/images/v1${hot.value}.png`;
			return;
		}
		if (nowIndex <= 670) {
			moveY.value = 300;
			level.value = 1;
			vImage.value = `/static/images/v0${hot.value}.png`;
			return;
		}
	}
	const temperatureHandler = type => {
		if (type === 0) {
			if (temperatureValue.value > 16)
				temperatureValue.value--;
		} else {
			if (temperatureValue.value < 32)
				temperatureValue.value++;
		}
	};
	onMounted(() => {
		temperatureValue.value = prop.temperature;
		if(prop.wind == 0) moveY.value = 300;
		if(prop.wind == 1) moveY.value = 200;
		if(prop.wind == 2) moveY.value = 100;
		if(prop.wind == 3) moveY.value = 0;
		if (!prop.isCold) {
			hot.value = '-hot';
			vImage.value = `/static/images/v${level.value}${hot.value}.png`;
			className.value = 'adjust-hot';
		} else {
			hot.value = '';
			vImage.value = `/static/images/v${level.value}${hot.value}.png`;
			className.value = 'adjust-cold';
		}
	})
</script>

<style scoped>
	.lighting {
		height: 80%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.adjust-content {
		margin-top: 50rpx;
		height: 300px;
		width: 100px;
		border-radius: 50rpx;
		background-color: hsla(0, 0%, 0%, .4);
		overflow: hidden;
	}

	.adjust {
		height: 100%;
		width: 100%;
		border-radius: 50rpx;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}

	.adjust-cold {
		background-color: #1296db;
	}

	.adjust-hot {
		background-color: #f4ea2a;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
	}

	.air-open {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 330rpx;
		width: 230rpx;
	}

	.temperatureBox {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		width: 180rpx;
		margin-top: 20rpx;
		transition: .2s;
		background-color: #ffffff;
		color: rgba(0, 0, 0, .8);
		font-size: 50rpx;
		font-weight: 600;
		border-radius: 50%;
	}

	.temperature-text {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
	}

	.tempLogo {
		height: 100rpx;
		width: 100rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}


</style>
