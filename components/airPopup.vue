<template>
	<view class="airContent">
		<view class="airContent1">
			<view class="airHeader">
				<view class="airHeader-text">恒温器</view>
				<view class="airHeader-return" @click="complete">完成</view>
			</view>
		</view>
		<view class="backgroundColor"></view>
	</view>
</template>

<script setup>
	const emit = defineEmits(['airComplete']);
	const complete = ()=>{
		emit('airComplete');
	}
</script>

<style scoped>
	.airContent {
		position: fixed;
		top: 140rpx;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		overflow: hidden;
		transition:5s;
		z-index: 12;
	}
	.airContent1 {
		position: fixed;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		overflow: hidden;
		z-index: 12;
	}
	.airHeader {
		position: relative;
		height: 100rpx;
		background-color: rgba(0, 0, 0, .4);
	}

	.airHeader-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		letter-spacing: 3px;
		color: #ffffff;
	}

	.airHeader-return {
		position: absolute;
		left: 90%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		color: #1afa29;
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
