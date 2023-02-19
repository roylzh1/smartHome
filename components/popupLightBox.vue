<template>
	<popup-card :title="title+name" @return="complete">
		<view class="lighting">
			<image class="logo" :style="{filter: `grayscale(${level}) brightness(${2-level})`}"
				src="../static/images/lighting.png"></image>
			<view class="adjust-content" @touchmove="moveHandler">
				<view class="adjust" :style="{transform:`translateY(${moveY}px)`}"></view>
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
		name: String
	});
	const emit = defineEmits(['lightComplete']);
	let level = ref(0);
	let beforeIndex = 0;
	let nowIndex = 0;
	let moveY = ref(0);
	const complete = () => {
		if (level.value == 1)
			emit('lightComplete', false);
		else
			emit('lightComplete');
	};

	const moveHandler = (e) => {
		e.preventDefault();
		beforeIndex = nowIndex;
		nowIndex = e.changedTouches[0].clientY;
		if (nowIndex <= 500) {
			moveY.value = 0;
			level.value = 0;
			return;
		}
		if (nowIndex <= 600) {
			moveY.value = 100;
			level.value = .3;
			return;
		}
		if (nowIndex <= 700) {
			moveY.value = 200;
			level.value = .7;
			return;
		}
		if (nowIndex <= 800) {
			moveY.value = 300;
			level.value = 1;
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
		background-color: #55ff00;
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
