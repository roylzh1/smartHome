<template>
	<view class="backGround"></view>
	<view class="content">
		<h1 class="title">设置家具状态</h1>
		<view class="room">
			<card height="130" width="300" style="margin: 20rpx;" v-for="(f,index) in furnitures"
				@click="clickMode(index)">
				<template #default>
					<view class="box">
						<view class="mode-pic-box" :style="{backgroundColor: f.state ? '#fff' :'#5f5f5f'}">
							<image src="/static/images/plus-medical-regular-40.png"></image>
						</view>
						<view class="mode-name">
							{{f.name}}
						</view>
					</view>
				</template>
			</card>
		</view>
		<h1 class="title">设置场景名称</h1>
		<view class="update-box">
			<input type="text" v-model="modeName" placeholder="场景名" />
			<view class="update-btn" @click="addMode">
				添加
			</view>
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
	} from '@dcloudio/uni-app'
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore(); //D6EF2F
	const furnitures = ref([]);
	const modeName = ref('');
	onShow(async () => {
		const {
			data
		} = await myRequest({
			url: `Room/GetRoom`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		furnitures.value = [];
		const tempArr = [];
		for (let i = 0; i < data.length; i++) {
			furnitures.value.push(...data[i].furnitures)
		}
		for (let i = 0; i < furnitures.value.length; i++) {
			furnitures.value[i].state = false;
		}
		console.log(furnitures.value)
	})
	const clickMode = async i => {
		if (furnitures.value[i].state) furnitures.value[i].state = false;
		else
			furnitures.value[i].state = true;
	}

	const addMode = async () => {
		let fs = '';
		for (let i = 0; i < furnitures.value.length; i++) {
			if (furnitures.value[i].state && i != furnitures.value.length - 1) {
				fs += `${furnitures.value[i].id},`
			}
		}
		fs = fs.substr(0, fs.length - 1);
		const res = await myRequest({
			url: `Home/CreateMode`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
				modeName: modeName.value,
				furnitures: fs
			}
		});
		if (res.statusCode == 400)
			uni.showToast({
				title: '新增场景失败',
				icon: 'none',
				duration: 2000
			})
		else
			uni.showToast({
				title: '新增场景成功',
				icon: 'success',
				duration: 2000
			})
		uni.switchTab({
			url: `/pages/home/home`,
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
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		letter-spacing: 1px;
		color: #fff;
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
