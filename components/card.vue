<template>
	<view class="centralControl" :style="{height: height+'rpx', width: width+'rpx'}">
		<view class="s-centralControl">
			<slot></slot>
		</view>
		<view class="backgroundColor" :style="{backgroundColor: active ? `rgba(255,255,255,.7)` : `hsla(0,0%,25%,.6)`}">
		</view>
	</view>
</template>

<script setup>
	defineProps({
		height: {
			type: String,
			default: '250'
		},
		width: {
			type: String,
			default: '450'
		},
		active: {
			typeof: String,
			default: false
		}
	})
</script>

<style scoped>
	.centralControl {
		position: relative;
		margin-top: 10rpx;
		border-radius: 30rpx;
		overflow: hidden;
		z-index: 3;
	}

	.s-centralControl {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		z-index: 3;
	}

	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.8s;
	}
</style>
