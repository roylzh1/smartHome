<template>
	<view @longpress="pressHandler" @click="handleClick" class="sbox-content">
		<view class="sbox-backgroundColor"
			:style="{backgroundColor: selected == true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="sbox-s-content">
			<view class="sbox-thing-content"
				:style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
				<image class="sbox-thing" :src="selected == true ? photoOpen : photoClose"></image>
			</view>
			<view class="sbox-statusBox">
				<view class="sbox-title" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{title}}
				</view>
				<view class="sbox-status">{{selected ? open : close}}</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		inject,
		onMounted,
		ref,
		watch,
	} from "vue";
	import myRequest from '/utils/request.js';
	import {
		onShow,
	} from '@dcloudio/uni-app'
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	let props = defineProps({
		type: String, //box大小
		title: String,
		open: String,
		close: String,
		photoOpen: String,
		photoClose: String,
		id: Number,
		index: Number, //家具索引
		roomId: Number, //房间索引
		state: Boolean,
		fType: Number, //家具类型
	});

	const emit = defineEmits(['popup']);
	let selected = ref(props.state)
	//console.log(selected)
	watch(() => props.state, (newValue) => {
		selected.value = newValue;
	});

	const handleClick = async () => {
		if (account.nowSelectedIndex != 9999) {
			account.nowSelectedIndex = 9999;
			await myRequest({
				url: `Home/ChangeHomeMode`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
					types: 0,
					mode: false
				}
			});
		}
		selected.value = !selected.value;
		const res = await myRequest({
			url: `Tcp/ChangeFurnitureState`,
			method: 'get',
			data: {
				state: selected.value,
				furnitureId: props.id,
				sessionId: account.homeTcp
			}
		});

		console.log(res)
	};
	const pressHandler = async () => {
		if (!selected.value)
			selected.value = !selected.value;
		console.log(props.type)
		emit('popup', props.fType, props.title, props.id, props.index);
	}
	onShow(() => {

	})
</script>

<style scoped>
	.sbox-content {
		position: relative;
		height: 115rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.3s;
		z-index: 5;
	}

	.sbox-s-content {
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		z-index: 3;
		transition: 0.3s;
	}

	.sbox-title {
		height: 30rpx;
		width: 200rpx;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.3s;
	}

	.sbox-status {
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		padding-top: 10rpx;
		color: #8a8a8a;
		font-weight: 600;
		z-index: 3;
		transition: 0.3s;
	}

	.sbox-statusBox {
		margin-bottom: 15rpx;
	}

	.sbox-thing-content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.3s;
	}

	.sbox-thing {
		height: 70%;
		width: 70%;
		z-index: 5;
		transition: 0.3s;

	}

	.sbox-backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.3s;
	}
</style>
