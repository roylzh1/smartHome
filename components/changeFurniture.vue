<template>
	<view class="c-furnitureBox">
		<view class="c-addFurniture" @click="clickHandler(true)">
			<view class="c-f-name">
				添加配件
			</view>
			<image class="c-f-logo" src="../static/images/add-f.png"></image>
		</view>
		<view class="c-removeFurniture" @click="clickHandler(false)">
			<view class="c-f-name">
				删除配件
			</view>
			<image class="c-f-logo" src="../static/images/remove-f.png"></image>
		</view>
	</view>
</template>

<script setup>
	const emit = defineEmits(['hasClicked'])
	const clickHandler = (mode) => {
		emit('hasClicked', mode);
	}
</script>

<style scoped>
	.c-furnitureBox {
		display: flex;
		align-items: space-between;
		flex-wrap: wrap;
		border-radius: 10px;
		height: 60px;
		width: 100px;
		background-color: #fff;
		z-index: 99;
	}

	.c-addFurniture {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		height: 50%;
		width: 100%;
		border-bottom: 1px solid hsla(0, 0%, 50%, .3);
	}

	.c-removeFurniture {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		height: 50%;
		width: 100%;
	}

	.c-f-name {
		margin-left: 25rpx;
		font-size: 25rpx;
		font-weight: 600;
		width: 150rpx;
	}

	.c-f-logo {
		margin-right: 25rpx;
		width: 30rpx;
		height: 27rpx;
	}
</style>
