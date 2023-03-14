<template>
	<view @longpress="pressHandler" @click="handleClick" class="mbox-content">
		<view class="mbox-backgroundColor"
			:style="{backgroundColor: selected == true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="mbox-s-content">
			<view class="mbox-thing-content"
				:style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
				<image class="mbox-thing" :src="selected == true ? photoOpen : photoClose"></image>
			</view>
			<view class="mbox-statusBox">
				<view class="mbox-title" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{title}}
				</view>
				<view class="mbox-status">{{selected ? open : close}}</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const props = defineProps({
		title: String,
		open: String,
		close: String,
		photoOpen: String,
		photoClose: String
	});
	let selected = ref(false);
	const emit = defineEmits(['popup']);
	const handleClick = () => {
		selected.value = !selected.value;
	}
	const pressHandler = () => {
		if (!selected.value)
			selected.value = !selected.value;
		emit('popup', props.title);
	}
</script>

<style scoped>
	.mbox-content {
		position: relative;
		height: 250rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 3;
	}

	.mbox-s-content {
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-title {
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.5s;
	}

	.mbox-status {
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		padding-top: 20rpx;
		color: #8a8a8a;
		font-weight: 600;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-statusBox {
		margin-bottom: 5rpx;
	}

	.mbox-thing-content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-thing {
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;

	}

	.mbox-backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}
</style>
