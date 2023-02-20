<template>
	<card height=160 width=300 >
		<view class="furnitureBox">
			<view class="addFurniture" @click="clickHandler(true)" >
				<view class="f-name">
					添加配件
				</view>
				<image class="f-logo" src="../static/images/add-f.png"></image>
			</view>
			<view class="removeFurniture" @click="clickHandler(false)">
				<view  class="f-name">
					删除配件
				</view>
				<image class="f-logo" src="../static/images/remove-f.png"></image>
			</view>
		</view>
	</card>
</template>

<script setup>
	import card from '/components/card.vue'
	const emit = defineEmits(['hasClicked'])
	const clickHandler = (mode)=>{
		emit('hasClicked',mode);
	}
</script>

<style scoped>
	.furnitureBox{
		display: flex;
		align-items: space-between;
		flex-wrap: wrap;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 100%, 1);
		
	}
	.addFurniture{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		height: 50%;
		width: 100%;
		border-bottom: 1px solid hsla(0, 0%, 50%, .3);
	}
	.removeFurniture{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		height: 50%;
		width: 100%;
	}
	.f-name{
		margin-left: 30rpx;
		font-size: 25rpx;
		font-weight: 600;
		width: 150rpx;
	}
	.f-logo{
		margin-right: 30rpx;
		width: 40rpx;
		height: 40rpx;
	}
</style>