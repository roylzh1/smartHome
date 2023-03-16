<template>
	<popup-card :title="title" @return="complete">
		<view class="lighting">
			<image class="logo" :src="src"></image>
			<view class="adjust-content" @touchmove="moveHandler">
				<view class="adjust" :style="{transform:`translateY(${moveY}px)`}"></view>
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
	const prop = defineProps({
		title: String,
	});
	const emit = defineEmits(['lightComplete']);
	let level = ref(0); //0最大
	let fanLevel = ref(0);
	let src = ref('/static/images/v3.png');
	let beforeIndex = 0;
	let nowIndex = 0;
	let moveY = ref(0);
	watch(() => fanLevel.value, (newValue) => {
		src.value = `/static/images/v${newValue}.png`;
	});
	//完成
	const complete = () => {
		emit('lightComplete', fanLevel.value);
	};

	const moveHandler = (e) => {
		e.preventDefault();
		beforeIndex = nowIndex;

		nowIndex = e.changedTouches[0].clientY;
		if (nowIndex <= 420) {
			moveY.value = 0;
			level.value = 0;
			console.log(src.value)
			fanLevel.value = 3;
			return;
		}
		if (nowIndex <= 520) {
			moveY.value = 100;
			level.value = .3;
			fanLevel.value = 2;
			return;
		}
		if (nowIndex <= 620) {
			moveY.value = 200;
			level.value = .7;
			fanLevel.value = 1;
			return;
		}
		if (nowIndex <= 720) {
			moveY.value = 300;
			level.value = 1;
			fanLevel.value = 0;
			return;
		}
	}
	onMounted(() => {

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
		margin-top: 100rpx;
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
		background-color: #1296db;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}

	.logo {
		height: 250rpx;
		width: 250rpx;
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
