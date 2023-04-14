<template>
	<popup-small-card catchtouchmove="false" @return="complete">
		<template #default>
			<view class="addContent">
				<view class="add-room-title">添加家庭</view>
				<input class="myInput" v-model="textarea" :rows="2" placeholder="家庭名称" />
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

	});
	const emit = defineEmits(['addHomeComplete']);
	const textarea = ref('')
	const complete = async () => {
		const res = await myRequest({
			url: `Hoom/CreateHome`,
			method: 'get',
			data: {
				homeName: textarea.value
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
		console.log(res)

		emit('addHomeComplete');
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
