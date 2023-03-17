<template>
	<popup-small-card catchtouchmove="false" @return="complete">
		<template #default>
			<view class="addContent">
				<view class="add-room-title">{{name}} 删除配件</view>
				<el-input class="myInput" v-model="textarea" :rows="2" placeholder="            配件名" />
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
	const emit = defineEmits(['addRoomComplete']);
	const textarea = ref('')
	const complete = async () => {
		const res = await myRequest({
			url: `Room/RemoveFurniture`,
			method: 'get',
			data: {
				furnitureId: textarea.value,
				roomId: prop.roomId,
				homeId: prop.homeId
			}
		});
		if (res.statusCode == 400)
			uni.showToast({
				title: '删除家具失败',
				icon: 'none',
				duration: 2000
			})
		else
			uni.showToast({
				title: '删除家具成功',
				icon: 'success',
				duration: 2000
			})
		console.log(res)
		emit('addRoomComplete');
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
		margin-top: 50rpx;
		width: 300rpx;
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
