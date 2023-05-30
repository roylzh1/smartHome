<template>
	<view class="backGround"></view>
	<view class="content">
		<view class="title">
			<h1>{{modeName}}</h1>
			<view class="back" @click="goBack">
				返回
			</view>
		</view>

		<view class="room">
			<card height="130" width="300" style="margin: 20rpx;" v-for="(f,index) in haveFur">
				<template #default>
					<view class="box">
						<view class="mode-pic-box" style="backgroundColor: #fff; ">
							<image src="/static/images/modeOpen.png"></image>
						</view>
						<view class="mode-name">
							{{f.name}}
						</view>
					</view>
				</template>
			</card>
		</view>
		<view class="room">
			<card height="130" width="300" style="margin: 20rpx;" v-for="(f,index) in closeFur">
				<template #default>
					<view class="box">
						<view class="mode-pic-box" style="backgroundColor: #6f6f6f; ">
							<image src="/static/images/modeClose.png"></image>
						</view>
						<view class="mode-name">
							{{f.name}}
						</view>
					</view>
				</template>
			</card>
		</view>
		<tab-bar selected="1"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import card from '/components/card.vue';
	import popupGlobalAir from '/components/popupGlobalAir.vue';
	import myRequest from '/utils/request.js';
	import {
		onMounted,
		ref,
		nextTick,
	} from "vue";
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore(); //D6EF2F
	const furnitures = ref([]);
	const modeName = ref('');
	const haveFur = ref([]);
	const closeFur = ref([]);
	const id = ref();
	onLoad((option) => {
		console.log(option);
		id.value = option.id;
	});
	onShow(async () => {
		const {
			data
		} = await myRequest({
			url: `Home/GetMode`,
			method: 'get',
			data: {
				modeId: id.value,
			}
		});
		modeName.value = data.name;

		//data.furnitures = data.furnitures.split(',');
		console.log(data)
		const res = await myRequest({
			url: `Room/GetRoom`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		furnitures.value = [];
		let tempArr = res.data;

		for (let i = 0; i < tempArr.length; i++) {
			furnitures.value.push(...tempArr[i].furnitures)
		}
		console.log(furnitures.value)
		for (let i = 0; i < furnitures.value.length; i++) {
			console.log(furnitures.value[i].id); //furnituresClosed
			if (data.furnituresOpen.includes(furnitures.value[i].id + '')) {
				haveFur.value.push(furnitures.value[i]);
			} else {
				closeFur.value.push(furnitures.value[i]);
			}
		}

		console.log(haveFur.value)
	})
	const clickMode = async i => {
		if (furnitures.value[i].state) furnitures.value[i].state = false;
		else
			furnitures.value[i].state = true;
	}
	const goBack = () => {
		uni.switchTab({
			url: `/pages/index/index`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	}

	/*
	uni.navigateTo({
		url: `/pages/airConditioner/airConditioner?name=${name}`,
		animationType: 'pop-in',
		animationDuration: 500
	});
	*/
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		z-index: 2;
		background-color: #ffffff;
	}

	.room {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-gap: 10rpx 10rpx;
		grid-auto-flow: row dense;
		align-items: space-between;
		justify-content: space-between;
		width: 90%;
		z-index: 99;
		margin: 0 5%;
		margin-top: 20rpx;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		letter-spacing: 1px;
		color: #fff;
	}

	.back {
		margin-right: 20px;
		color: #D6EF2F;
		font-weight: 700;
	}

	.box {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 14px;
		height: 100%;
		color: #fff;
	}

	.mode-name {
		font-weight: 700;
		letter-spacing: 1px;
	}

	.mode-pic-box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		transition: .5s;
	}

	.mode-pic-box image {
		height: 25px;
		width: 25px;
	}

	.update-box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 60px;
		margin-top: 5px !important;
		background-color: #fff;
		border-radius: 10px;
		width: 50%;
		z-index: 99;
		margin: 0 5%;
	}

	input {
		width: 100px;
		height: 20px;
		padding: 1px;
		margin-left: 5px;
		font-size: 14px;
		color: #333;
		border: none;
		border-radius: 5px;
		box-shadow: 0 0 0 1px #e1e1e1;
	}

	input:focus {
		outline: none;
		box-shadow: 0 0 0 1px #4a90e2;
	}

	.update-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		width: 50px;
		background-color: #D6EF2F;
		margin-left: 10px;
		font-size: 10px;
		border-radius: 5px;
	}

	.backGround {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url("/static/images/tour-1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 70%;
		z-index: 1;
	}

	.backGround-up {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: hsla(0, 0%, 0%, .1);
		backdrop-filter: blur(3px);
		-webkit-transform: scale(1);
		z-index: 7;
	}
</style>
