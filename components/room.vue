<template>
	<view class="content1">
		<view class="navBar">
			<h3 class="title">{{title}}</h3>
			<image class="img" src="/static/images/rightArrow.png"></image>
		</view>	
		<view class="box">
			<small-box title="大门" status="已锁"></small-box>
		</view>
	</view>
	
</template>

<script setup>
	import smallBox from '/components/smallBox.vue';
	defineProps({
		title: String
	});
</script>

<style scoped>
	.title{
		color: #ffffff;
		font-weight: 700;
		font-size: 35rpx;
	}
	.img{
		height: 30rpx;
		width: 30rpx;
		margin-left: 10rpx;
	}
	.navBar{
		display: flex;
		align-items: baseline;
	}
		
	.box{
		margin-top: 15rpx;
	}
	.content1{
		margin-top: 30rpx;
	}
</style>