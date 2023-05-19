<template>
	<view class="backGround"></view>
	<view class="content">
		<h1 class="title">场景设置</h1>
		<view class="room">
			<card height="130" width="300" style="margin: 20rpx;" v-for="(mode,index) in modes"
				@click="clickMode(mode.furnituresOpen,mode.furnituresOpen,mode.type,index)"
				@longpress="modeDetail(mode.id)" :active="account.nowSelectedIndex == index ? true : false">
				<template #default>
					<view class="box">
						<view class="mode-pic-box">
							<image :src="imgSrc(mode.types)"></image>
						</view>
						<view class="mode-name"
							:style="{color: account.nowSelectedIndex == index  ?`rgba(0,0,0,1)` : `#ffffff`}">
							{{mode.name}}
						</view>
					</view>
				</template>
			</card>
			<card height="130" width="300" style="margin: 20rpx;" @click="addMode">
				<template #default>
					<view class="box">
						<view class="mode-pic-box">
							<image src="/static/images/alarm-add-solid-40.png" alt=""></image>
						</view>
						<view class="mode-name">
							添加
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
		inject,
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app'
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore(); //D6EF2F
	const modes = ref([]);
	const imgSrc = (index) => {
		return `/static/images/mode${index}.png`;
	}
	onShow(async () => {
		const {
			data
		} = await myRequest({
			url: `Home/GetHomeInformation`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		modes.value = [];
		modes.value = data.modes;
		console.log(modes.value)
		const res = await myRequest({
			url: `Home/GetHomeMode`,
			method: 'get',
			data: {
				homeId: account.homeSeleted
			}
		});
		if (res.data.modeState) {
			account.nowSelectedIndex = res.data.types;
		}
	})
	const clickMode = async (fOp, fCl, type, index) => {
		if (account.nowSelectedIndex != 9999) {
			uni.showModal({
				content: '确认关闭此模式',
				success: async function(res) {
					if (res.confirm) {
						//更改所选的家具索引
						account.nowSelectedIndex = 9999;
						await myRequest({
							url: `Home/ChangeHomeMode`,
							method: 'get',
							data: {
								homeId: account.homeSeleted,
								types: 0,
								mode: false
							}
						});
						console.log('点击了确认')
					} else {
						console.log('点击了取消')
					}
				}
			});
		} else {
			console.log(account.nowSelectedIndex)
			uni.showModal({
				content: '确认开启此模式',
				success: async function(res) {
					if (res.confirm) {
						await myRequest({
							url: `Tcp/GlobalOpenOrClose`,
							method: 'get',
							data: {
								furnitures: fOp,
								sessionId: account.homeTcp,
								state: true
							}
						});
						await myRequest({
							url: `Tcp/GlobalOpenOrClose`,
							method: 'get',
							data: {
								furnitures: fCl,
								sessionId: account.homeTcp,
								state: false
							}
						});
						await myRequest({
							url: `Home/ChangeHomeMode`,
							method: 'get',
							data: {
								homeId: account.homeSeleted,
								types: index,
								mode: true
							}
						});
						//更改索引
						account.nowSelectedIndex = index;
						console.log('点击了确认')
					} else {
						console.log('点击了取消')
					}
				}
			});
		}
	}

	const addMode = () => {
		uni.navigateTo({
			url: `/pages/createMode/createMode`,
			animationType: 'pop-in',
			animationDuration: 500
		});
	}
	const modeDetail = (id) => {
		console.log(id);
		uni.navigateTo({
			url: `/pages/checkMode/checkMode?id=${id}`,
			animationType: 'pop-in',
			animationDuration: 500
		});
	}
	const deleteMode = () => {
		uni.showModal({
			content: '确认删除此模式',
			success: async function(res) {
				if (res.confirm) {

					console.log('点击了确认')
				} else {
					console.log('点击了取消')
				}
			}
		});
	}
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
		transition: 0.8s;
	}

	.mode-pic-box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
		height: 40px;
		width: 40px;
		background-color: #fff;
		border-radius: 50%;
	}

	.mode-pic-box image {
		height: 30px;
		width: 30px;
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
