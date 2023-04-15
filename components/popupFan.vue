<template>
	<popup-card :title="title" @return="complete">
		<view class="lighting">
			<view class="mode-name">
				模式
			</view>
			<view class="c-box" @click="clickMode">
				{{mode}}
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
	const mode = ref('自动');
	watch(() => fanLevel.value, (newValue) => {
		src.value = `/static/images/v${newValue}.png`;
	});
	//完成
	const complete = () => {
		emit('lightComplete', fanLevel.value);
	};
	const clickMode = () => {
		console.log(1)
		if (mode.value === '自动') {
			mode.value = '手动';
		} else {
			mode.value = '自动';
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

	.c-box {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		margin-top: 50px;
		font-weight: 700;
		height: 100px;
		width: 100px;
		border-radius: 50%;
		background-color: #fff;
	}

	.adjust {
		height: 100%;
		width: 100%;
		border-radius: 50rpx;
		background-color: #1296db;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}

	.mode-name {
		font-size: 25px;
		font-weight: 700;
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
