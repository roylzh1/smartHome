<template>
	<view class="lightContent"  @touchmove.stop.prevent>
		<view class="lightContent1" >
			<view class="lightHeader-return" @click="complete">完成</view>
			<slot></slot>
		</view>
	</view>
</template>

<script setup>

	const emit = defineEmits(['return']);
	const complete = ()=>{
		emit('return');
	}
</script>

<style scoped>
	.lightContent {
		position: fixed;
		bottom: 2.5vw;
		margin: 0 20rpx;
		height: 35vh;
		width: 95vw;
		border-radius: 80rpx ;
		overflow: scroll;
		background-color: hsla(0,50%,100%,1);
		-webkit-overflow-scrolling: touch;
		z-index: 12;
	}
	.lightContent1 {
		position: fixed;
		overflow: scroll;
		left: 0;
		height: 100%;
		width: 100%;
		border-radius: 80rpx ;
		z-index: 12;
	}
	
	.lightHeader-return {
		margin-top: 30rpx;
		margin-left: 620rpx;
		font-weight: 700;
		width: 80rpx;
		color: #1afa29;
	}

</style>