<template>
	<view class="content1">
		<view class="navBar">
			<h3 class="title">{{title}}</h3>
			<image class="img" src="/static/images/rightArrow.png"></image>
		</view>	
		<view class="gridBox" >
			<view v-for="(item,index) in itemArray" :style="{gridRowStart: item.type == 'middle' ? `span 2` : 'span 1'}">
				<middle-box v-if="item.type == 'middle'" class="item" :title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose" :photoOpen="item.photoOpen"></middle-box>
			<small-box v-if="item.type !='middle'" :title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose" :photoOpen="item.photoOpen"></small-box>
			</view>
			
		</view>
	</view>
	
</template>

<script setup>
	import middleBox from '/components/middleBox.vue';
	import smallBox from '/components/smallBox.vue';
	defineProps({
		itemArray: Array,
		title: String
	});
	let doorPhoto = "/static/images/lock.png";
</script>

<style scoped>
	.title{
		color: #ffffff;
		font-weight: 700;
		font-size: 35rpx;
		z-index: 3;
	}
	.img{
		height: 30rpx;
		width: 30rpx;
		margin-left: 10rpx;
		z-index: 3;
	}
	.navBar{
		display: flex;
		align-items: baseline;
	}
	.content1{
		margin-top: 30rpx;
	}
	.smallBox{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.gridBox{
		display: grid;
		grid-template-columns: 50% 50% ;
		grid-gap:10rpx 10rpx;
		grid-auto-flow: row dense;
		align-items: space-between;
		justify-content: space-between;
		width: 100%;
		margin-top: 15rpx;
	}

</style>