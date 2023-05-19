<template>
	<popup-small-card catchtouchmove="false" @return="complete">
		<template #default>
			<view class="addContent">
				<view class="add-room-title">添加房间</view>
				<view style="margin: 10px 0;">房间名</view>
				<input class="myInput" v-model="textarea" :rows="2" placeholder="" />
			</view>
		</template>
	</popup-small-card>

</template>

<script setup>
	import {
		ref
	} from "vue";
	import popupSmallCard from '/components/popupSmallCard.vue'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const prop = defineProps({
		name: String
	});
	const emit = defineEmits(['addRoomComplete']);
	const textarea = ref('')
	const complete = async () => { //Room/CreateRoom
		const roomInfo = await myRequest({
			url: `Room/CreateRoom`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
				roomName: textarea.value,
			}
		});
		if (roomInfo.data.status == 400) {
			uni.showToast({
				title: '添加房间失败',
				icon: 'none',
				duration: 3000
			});
			emit('addRoomComplete');
			return;
		}
		uni.showToast({
			title: '添加房间成功',
			icon: 'none',
			duration: 3000
		});
		emit('addRoomComplete');
		//刷新
		uni.switchTab({
			url: `/pages/home/home`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	};
</script>

<style scoped>
	.addContent {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 13;
		color: black;
	}

	.myInput {
		margin-top: 30rpx;
		width: 300rpx;
		border-radius: 10px;
		border: #000000 1px solid;
		padding: 2px 10px;
	}

	.add-room-title {
		font-size: 40rpx;
		margin-top: 50rpx;
		font-weight: 700;
		letter-spacing: 2px;
		color: #000000;
	}

	.backgroundColor {
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .5);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(1);
		z-index: 11;
	}
</style>
