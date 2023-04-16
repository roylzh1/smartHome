<template>
	<popup-card :title="title" @return="complete">
		<view class="lighting">
			<image class="logo" :style="{filter: `grayscale(${level}) brightness(${2-level})`}"
				src="../static/images/lighting.png"></image>
			<view class="adjust-content" @touchmove="moveHandler">
				<view class="adjust" :style="{transform:`translateY(${moveY}px)`}"></view>
			</view>
			<view class="color-box">
				<view class="r"></view>
				<view class="g"></view>
				<view class="b"></view>
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
	});
	const emit = defineEmits(['lightComplete']);
	let level = ref(0); //0最大
	let lightLevel = 0;
	let beforeIndex = 0;
	let nowIndex = 0;
	let moveY = ref(0);
	//完成
	const complete = () => {
		emit('lightComplete', lightLevel);
	};

	const moveHandler = (e) => {
		e.preventDefault();
		beforeIndex = nowIndex;
		nowIndex = e.changedTouches[0].clientY;
		if (nowIndex <= 420) {
			moveY.value = 0;
			level.value = 0;
			lightLevel = 3;
			return;
		}
		if (nowIndex <= 520) {
			moveY.value = 100;
			level.value = .3;
			lightLevel = 2;
			return;
		}
		if (nowIndex <= 620) {
			moveY.value = 200;
			level.value = .7;
			lightLevel = 1;
			return;
		}
		if (nowIndex <= 720) {
			moveY.value = 300;
			level.value = 1;
			lightLevel = 0;
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

	.color-box {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.r {
		background: linear-gradient(#CD5C5C, #B22222);
		box-shadow: rgba(0, 0, 0, .1) 2px 2px 5px;
	}

	.r:hover {
		border: #fff 1px solid;
	}

	.g {
		background: linear-gradient(#228B22, #006400);
		box-shadow: rgba(0, 0, 0, .1) 2px 2px 5px;
	}

	.g:hover {
		border: #fff 1px solid;
	}

	.b {
		background: linear-gradient(#00BFFF, #4169E1);
		box-shadow: rgba(0, 0, 0, .1) 2px 2px 5px;
	}

	.b:hover {
		border: #fff 1px solid;
	}

	.r,
	.g,
	.b {
		height: 50px;
		width: 50px;
		margin-right: 10px;
		margin-left: 10px;
		border-radius: 50%;
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
