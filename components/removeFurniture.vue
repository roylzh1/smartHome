<template>
		<popup-small-card catchtouchmove="false"  @return="complete">
		<template #default >
			<view class="addContent">
				<view class="add-room-title">{{name}} 删除配件</view>
				<el-input
					class="myInput"
				    v-model="textarea"
				    :rows="2"
				    placeholder="            配件名"
				  />
			</view>
		</template>
	</popup-small-card>

</template>

<script setup>
	import {
		ref
	} from "vue";
	import popupSmallCard from '/components/popupSmallCard.vue'
	const prop = defineProps({
		name: String,
	});
	const emit = defineEmits(['addRoomComplete']);
	const textarea = ref('')
	const complete = () => {
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
	.myInput{
		margin-top: 50rpx;
		width: 300rpx;
	}
	.add-room-title{
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