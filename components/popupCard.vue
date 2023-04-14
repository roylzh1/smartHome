<template>
	<view class="lightContent" :style="{height: height+'vh'}">
		<view class="lightContent1" :style="{height: height+'vh'}">
			<view class="lightHeader">
				<input class="lightHeader-text" v-model="textarea" :placeholder="title"
					placeholder-style="color:rgba(203, 203, 203, 1);" />
				<view class="lightHeader-return" @click="complete">完成</view>
			</view>
			<slot></slot>
		</view>
		<view class="backgroundColor" :style="{height: height+'vh'}"></view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		useAccountStore
	} from '@/store/account.js';
	import myRequest from '/utils/request.js';
	const prop = defineProps({
		title: String,
		height: Number
	});
	const account = useAccountStore();
	const textarea = ref();
	const emit = defineEmits(['return']);
	const complete = async () => {
		//<view class="lightHeader-text">{{title}}</view>

		if (textarea.value != '') {
			console.log(textarea.value)
			const res = await myRequest({
				url: `Furniture/ChangeFurnitureInfo`,
				method: 'get',
				data: {
					furnitureId: account.furnitureId,
					furnitureName: textarea.value
				}
			});
			if (res.statusCode == 400)
				uni.showToast({
					title: '添加家庭失败',
					icon: 'none', //如果要纯文本，不要icon，将值设为'none'
					duration: 2000 //持续时间为 2秒
				})
			else
				uni.showToast({
					title: '添加家庭成功',
					icon: 'success', //将值设置为 success 或者 ''
					duration: 2000 //持续时间为 2秒
				})
		}
		emit('return');
	}
</script>

<style scoped>
	.lightContent {
		position: fixed;
		top: 140rpx;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		z-index: 12;
	}

	.lightContent1 {
		position: fixed;
		overflow: hidden;
		left: 0;
		height: 100vh;
		width: 100vw;
		border-radius: 80rpx 80rpx 0 0;
		z-index: 12;
	}

	.lightHeader {
		position: relative;
		height: 100rpx;
		background-color: rgba(0, 0, 0, .5);
	}

	.lightHeader-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		letter-spacing: 2px;
		width: 100px;
		margin-left: 30px;
		color: #ffffff;
		z-index: 12;
	}

	input::placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		font-weight: 700;
		letter-spacing: 2px;
		z-index: 13;
	}

	.lightHeader-return {
		position: absolute;
		left: 90%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		font-weight: 700;
		color: #1afa29;
	}

	.backgroundColor {
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
