<template>
	<popup-small-card catchtouchmove="false" @return="complete">
		<template #default>
			<view class="addContent">
				<view class="add-room-title">{{name}} 添加配件</view>
				<input class="myInput" v-model="textarea" :rows="2" placeholder="输入序列号" />
				<view class="QRcode" @click="scan">扫描二维码</view>
			</view>
		</template>
	</popup-small-card>

</template>

<script setup>
	import {
		ref
	} from "vue";
	import popupSmallCard from '/components/popupSmallCard.vue';
	import myRequest from '/utils/request.js';
	const prop = defineProps({
		name: String,
		roomId: Number,
		homeId: Number
	});
	const emit = defineEmits(['addFurComplete']);
	const textarea = ref('')
	const complete = async () => {
		console.log(textarea.value + "id: " + prop.roomId);
		const res = await myRequest({
			url: `Room/InsertFurniture`,
			method: 'get',
			data: {
				furnitureId: textarea.value,
				roomId: prop.roomId,
				homeId: prop.homeId
			}
		});
		if (res.statusCode == 400)
			uni.showToast({
				title: '添加家具失败',
				icon: 'none',
				duration: 2000
			})
		else
			uni.showToast({
				title: '添加家具成功',
				icon: 'success',
				duration: 2000
			})
		console.log(res)
		emit('addFurComplete');
	};
	const scan = async () => {
		uni.scanCode({
			success: async (res) => {
				//console.log(res);
				textarea.value = res.result;
				uni.showToast({
					title: '扫描成功',
					icon: 'none',
					duration: 1000
				});
			}
		})
	}
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
		margin-top: 50rpx;
		width: 400rpx;
		height: 40px;
		padding-left: 10px;
		padding-right: 10px;
		border-radius: 6px;
		background-color: #f4f4f4;
	}

	.add-room-title {
		font-size: 40rpx;
		margin-top: 50rpx;
		font-weight: 700;
		letter-spacing: 2px;
		color: #000000;
	}

	.QRcode {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		letter-spacing: 1px;
		font-weight: 600;
		margin-top: 20px;
		height: 30px;
		width: 100px;
		border-radius: 10px;
		background-color: #1afa29;
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
