<template>
	<popup-card :title="name" @return="complete">
		<view class="popup-user-detail">
			<view class="popup-user-detail-name">
				{{name}}
			</view>
			<view class="popup-user-detail-email">
				{{email}}
			</view>
			<view class="popup-user-detail-phone">
				{{phoneNumber}}
			</view>
			<view class="remove-user">
				<view>
					移除用户
				</view>

			</view>
		</view>
	</popup-card>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	import popupCard from '/components/popupCard.vue'
	const prop = defineProps({
		name: String,
		email: String,
		phoneNumber: String
	});
	const emit = defineEmits(['userComplete']);
	const complete = () => {
		emit('userComplete');
	};


	onMounted(() => {

	})
</script>

<style scoped>
	.popup-user-detail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-user-detail-name {
		margin-top: 50px;
		font-size: 40px;
		color: #fff;
		font-weight: 600;
	}

	.popup-user-detail-email {
		margin-top: 50px;
		font-size: 16px;
		color: #efefef;
		font-weight: 400;
	}

	.popup-user-detail-phone {
		margin-top: 10px;
		font-size: 16px;
		color: #efefef;
		font-weight: 400;
	}

	.remove-user {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 700rpx;
		height: 60rpx;
		width: 200rpx;
		background-color: #fff;
		color: #fa1b44;
		font-weight: 700;
		border-radius: 10px;
	}
</style>
