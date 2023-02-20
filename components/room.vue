<template>
	<view class="content1">
		<view class="navBar" @click="addOrRemoveHandler">
			<h3 class="title">{{title}}</h3>
			<image class="img" src="/static/images/rightArrow.png"></image>
			<change-furniture v-if="ifShowchangeFurniture" @hasClicked="popupChangeFurnitureHandler" :class="ifShowchangeFurniture == true ? 'content-fade-up' : ''" class="furniture"></change-furniture>
		</view>	
		<view class="gridBox" >
			<view v-for="(item,index) in itemArray" :style="{gridRowStart: item.type == 'middle' ? `span 2` : 'span 1'}">
				<middle-box @popup="popupHandler" v-if="item.type == 'middle'" class="item" :title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose" :photoOpen="item.photoOpen"></middle-box>
			<small-box @popup="popupHandler" v-if="item.type !='middle'" :title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose" :photoOpen="item.photoOpen"></small-box>
			</view>
		</view>
	</view>
	
</template>

<script setup>
	import middleBox from '/components/middleBox.vue';
	import smallBox from '/components/smallBox.vue';
	import changeFurniture from '/components/changeFurniture.vue';
import { ref } from "vue";
	const props = defineProps({
		itemArray: Array,
		title: String
	});
	const emit = defineEmits(['popupBox','addOrRemove']);
	const ifShowchangeFurniture = ref(false);
	//家具细节弹窗
	const popupHandler = (name) => {
		emit('popupBox',props.title,name);
	}
	//判断是增or删
	const addOrRemoveHandler =()=>{
		ifShowchangeFurniture.value = !ifShowchangeFurniture.value;	
	}
	//增删家具弹窗
	const popupChangeFurnitureHandler = (mode)=>{
		emit('addOrRemove',props.title,mode);
	}
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
		position: relative;
		display: flex;
		align-items: baseline;
	}
	.content1{
		margin-top: 50rpx;
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
	.furniture{
		position: absolute;
		z-index: 4;
		left: 130rpx;
		top: -20rpx;
		transition: .4s;
	}
	.content-fade-up{
		animation-duration: .2s;
		animation-name: add-f-fade;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
	}
	@keyframes add-f-fade {
		from {
			width: 200rpx;
		}
	
		to {
			width: 300rpx;
		}
	}
</style>