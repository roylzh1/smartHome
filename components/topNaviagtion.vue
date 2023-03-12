<template>
	<view class="content2">
		<global-box v-for="(item,index) in itemArray" :title="item.title" :open="item.open" :photoOpen="item.photoOpen" @popup="popupHandler"></global-box>
	</view>
</template>

<script setup>
	import globalBox from '/components/globalBox.vue'
	const emit = defineEmits(['popupNav']);
	const itemArray = [
		{
			title: "观影模式",
			open: "1",
			photoOpen: "/static/images/fan-globe.png"
		},{
			title: "灯",
			open: "3盏开着",
			photoOpen: "/static/images/light-globe.png",
		},{
			title: "安全",
			open: "1个没锁",
			photoOpen: "/static/images/lock.png"
		},{
			title: "灯",
			open: "3盏开着",
			photoOpen: "/static/images/light-globe.png",
		},{
			title: "安全",
			open: "1个没锁",
			photoOpen: "/static/images/lock.png"
		}
	];
	const popupHandler = name =>{
		emit('popupNav',name);
	}
</script>

<style scoped>
	.content2{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100rpx;
		width: auto;
		margin-top: 10rpx;
		z-index: 3;
		overflow-x: auto;
	}
	::-webkit-scrollbar {
	  display: none;
	}
</style>