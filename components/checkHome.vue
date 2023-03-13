<template>
	<popup-small-card catchtouchmove="false" @return="complete">
		<template #default>
			<view class="addContent">
				<view class="check-home-title">您的家</view>
				<view @click="selectHome(index)" class="check-home-box" v-for="(home,index) in prop.homeList">
					<view class="check-home-box-name">家庭名称: </view>
					<view>{{home.homeName}}</view>
				</view>

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
		homeList: Array
	});
	const emit = defineEmits(['checkHomeComplete', 'changeHome']);
	const textarea = ref('')
	const complete = () => {
		emit('checkHomeComplete');
	};
	const selectHome = (index) => {
		console.log(prop.homeList[index])
		emit('changeHome', index);
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
		margin-top: 30rpx;
		width: 300rpx;
	}

	.check-home-title {
		font-size: 40rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		font-weight: 700;
		letter-spacing: 2px;
		color: #000000;
	}

	.check-home-box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		height: 40px;
		width: 200px;
		border-radius: 10px;
		background-color: hsla(0, 0%, 80%, .1);
	}

	.check-home-box-name {
		margin-right: 20px;
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
