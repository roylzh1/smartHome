<template>
	<view @longpress="pressHandler" @click="handleClick" class="mbox-content">
		<view class="mbox-backgroundColor"
			:style="{backgroundColor: selected == true ? `rgba(255,255,255,.8)` : `hsla(0,0%,25%,.6)`}"></view>
		<view class="mbox-s-content">
			<view class="mbox-thing-content"
				:style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
				<image class="mbox-thing" :src="selected == true ? photoOpen : photoClose"></image>
			</view>
			<view class="mbox-statusBox">
				<view class="mbox-title" :style="{color: selected == true ?`rgba(0,0,0,1)` : `#ffffff`}">{{lighted}} 盏亮着
				</view>
				<view class="mbox-status">{{selected ? open : close}}</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onShow
	} from '@dcloudio/uni-app';
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const props = defineProps({
		lighted: Number,
		rooms: Array,
	});
	const open = "已开";
	const close = "已关";
	const photoClose = "/static/images/0.png";
	const photoOpen = "/static/images/0-light.png";
	let selected = ref(false);
	const emit = defineEmits(['popup']);
	onShow(() => {
		if (props.lighted != 0) selected.value = true;
	})
	const handleClick = async () => {
		if (account.nowSelectedIndex != 9999) {
			account.nowSelectedIndex = 9999;
		}
		selected.value = !selected.value;
		console.log(props.rooms.toString());
		const res = await myRequest({
			url: `Tcp/GlobalChangeLight`,
			method: 'post',
			data: {
				"lightId": props.rooms,
				"state": selected.value,
				"sessionId": account.homeTcp
			}
		});
	}
	const pressHandler = () => {
		if (!selected.value)
			selected.value = !selected.value;
		emit('popup', props.lighted);
	}
</script>

<style scoped>
	.mbox-content {
		position: relative;
		height: 250rpx;
		width: 335rpx;
		border-radius: 30rpx;
		overflow: hidden;
		transition: 0.5s;
		z-index: 3;
	}

	.mbox-s-content {
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		overflow: hidden;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-title {
		height: 30rpx;
		width: 80px;
		margin-left: 20rpx;
		z-index: 3;
		font-weight: 800;
		transition: 0.5s;
	}

	.mbox-status {
		height: 30rpx;
		width: 80rpx;
		margin-left: 20rpx;
		padding-top: 20rpx;
		color: #8a8a8a;
		font-weight: 600;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-statusBox {
		margin-bottom: 5px;
	}

	.mbox-thing-content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		z-index: 3;
		transition: 0.5s;
	}

	.mbox-thing {
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;

	}

	.mbox-backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(3);
		z-index: 1;
		transition: 0.5s;
	}
</style>
