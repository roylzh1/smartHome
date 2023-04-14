<template>
	<view class="content">
		<view class="home-backGround"></view>
		<view :class="IfShowUserBox || showAddHome ? 'backGround-up':''"></view>
		<view class="home-page">
			<!--头部-->
			<view class="home-header">
				<view class="homeHeader-text" @click="addNewHome">添加新家</view>
				<view class="homeHeader-return" @click="complete">完成</view>
			</view>
			<view class="home-content">
				<view class="home-box">
					<view class="home-box-name">
						名称
					</view>
					<view class="home-box-homeName">
						<view style="margin-left: 30rpx;">
							{{nowHome.homeName}}
						</view>
					</view>
					<view class="home-box-name" style="margin-top: 30rpx;">
						用户
					</view>
					<view class="home-box-userName">
						<view class="home-userName" v-for="(user,i) in nowHome.userList">
							<view class="home-userName-details">
								<view>
									<view>
										{{user.userName}}
									</view>
									<view class="home-userinfo" v-if="user.id == nowHome.master">
										住户{{' '}}(所有者)
									</view>
									<view class="home-userinfo" v-else>
										住户
									</view>
								</view>
								<view @click="showUserInfo(i)">
									<image class="home-userName-img" src="/static/images/rightArrow.png"></image>
								</view>
							</view>
						</view>
						<view class="add-user">

							<image class="home-userName-img" src="/static/images/plus-regular-40.png"></image>

							<view style="margin-left: 30rpx;">
								邀请他人...
							</view>
						</view>
					</view>
					<view class="home-box-name" style="margin-top: 30rpx;">
						房间
					</view>
					<view class="home-box-userName">
						<view class="home-userName" v-for="(room,index) in nowHome.rooms" :key="room.id">
							<view class="home-room-details">
								<input class="lightHeader-text" v-model="textarea1[index]" :placeholder="room.name"
									placeholder-style="color:rgba(0,0, 0, 1);" />
								<image @click="removeRoom(room.id,index)" class="home-userName-img"
									src="/static/images/x-regular-24.png"></image>
							</view>
						</view>
					</view>
					<view class="home-box-name" style="margin-top: 30rpx;">
						其他家
					</view>
					<view class="home-box-userName">
						<view class="home-userName" v-for="home in otherHome">
							<view class="home-room-details">
								<view>
									{{home.homeName}}
								</view>
								<image class="home-userName-img" src="/static/images/rightArrow.png"
									@click="switchHome(home.id)"></image>
							</view>
						</view>
					</view>
					<view class="home-box-name" style="margin-top: 30rpx;">
						留言
					</view>
					<view class="home-box-userName">
						<view class="home-userName">
							<view class="home-room-details">
								<input v-model="textarea" :rows="2" placeholder="提醒事项..." />
								<image class="home-userName-img" src="/static/images/rightArrow.png"
									@click="addMessage">
								</image>
							</view>
						</view>
					</view>
					<view class="home-box-remove">
						<view style="margin-left: 30rpx">
							移除家庭
						</view>
					</view>
				</view>
			</view>
		</view>
		<popup-user @touchmove.stop.prevent :name="nowUserInfo.name" :email="nowUserInfo.email"
			:phoneNumber="nowUserInfo.phoneNumber" :hasImage="nowUserInfo.hasImage" v-show="IfShowUserBox"
			:class="IfShowUserBox == true ? 'content-fade-up-animation' : ''" @userComplete="closeUserBoxHandler">
		</popup-user>
		<add-home v-show="showAddHome" :class="showAddHome == true ? 'content-fade-up' : ''"
			@addHomeComplete="closeAddHomeHandler">
		</add-home>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from "vue";
	import popupUser from '/components/popupUser.vue';
	import addHome from '/components/addHome.vue';
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const homeId = ref(0);
	const nowHome = ref({}); //用户当前显示的家庭
	const otherHome = ref([]); //用户的其他家庭
	const nowUserInfo = reactive({
		name: '',
		email: '',
		phoneNumber: '',
		hasImage: ''
	})
	//展示用户个人信息
	const IfShowUserBox = ref(false);
	const showUserInfo = (index) => {
		nowUserInfo.name = nowHome.value.userList[index].userName;
		nowUserInfo.email = nowHome.value.userList[index].email;
		nowUserInfo.phoneNumber = nowHome.value.userList[index].phoneNumber;
		nowUserInfo.hasImage = nowHome.value.userList[index].hasImage;
		IfShowUserBox.value = true;
	}
	const textarea = ref('');
	const textarea1 = ref([]);
	//关闭页面
	const closeUserBoxHandler = (index) => {
		IfShowUserBox.value = false;
	}
	//切换家庭,要连接数据库,新增首选家庭字段才能真正实现
	const switchHome = (homeId) => {
		uni.showModal({
			content: '确认切换至该家庭',
			success: function(res) {
				if (res.confirm) {
					account.homeSeleted = homeId;
					console.log('点击了确认')
				} else {
					console.log('点击了取消')
				}
			}
		})
	}
	//移除房间
	const removeRoom = (roomId, index) => {
		uni.showModal({
			content: '确认删除该房间',
			success: async function(res) {
				if (res.confirm) {
					nowHome.value.rooms.splice(index, 1);
					const res = await myRequest({
						url: `Room/DeleteRoom`,
						method: 'get',
						data: {
							roomId: roomId,
							homeId: account.homeSeleted
						}
					});
					if (res.statusCode == 400)
						uni.showToast({
							title: '删除房间失败',
							icon: 'none',
							duration: 2000
						})
					else
						uni.showToast({
							title: '删除房间成功',
							icon: 'success',
							duration: 2000
						})
					console.log('点击了确认')
				} else {
					console.log('点击了取消')
				}
			}
		})
	}
	//添加家庭
	const showAddHome = ref(false);
	const addNewHome = () => {
		showAddHome.value = true;
	}
	const closeAddHomeHandler = () => {
		showAddHome.value = false;
	}
	const addMessage = async () => {
		uni.showModal({
			content: '确认发布留言',
			success: async function(res) {
				if (res.confirm) {
					const res = await myRequest({
						url: `Home/CreateMessage`,
						method: 'get',
						data: {
							homeId: account.homeSeleted,
							message: textarea.value
						}
					});
					if (res.statusCode == 400)
						uni.showToast({
							title: '留言失败',
							icon: 'none',
							duration: 2000
						})
					else
						uni.showToast({
							title: '留言成功',
							icon: 'success',
							duration: 2000
						})
					console.log('点击了确认')
				} else {
					console.log('点击了取消')
				}
			}
		})
	}
	onShow(async () => {
		//console.log(homeId.value)
		otherHome.value = [];
		const hoomInfo = await myRequest({
			url: `Home/GetHomeInformationWithUser`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		nowHome.value = []
		nowHome.value = hoomInfo.data;
		//console.log(nowHome.value)

		account.homeList.forEach(home => {
			if (home.id != homeId.value)
				otherHome.value.push(home)
		});
		console.log(otherHome.value)
	});
	onLoad((option) => {
		console.log(option);
		homeId.value = option.homeId;
	});
	const complete = () => {
		uni.switchTab({
			url: '/pages/home/home',
			animationType: 'pop-out',
			animationDuration: 300
		});
	};
</script>

<style scoped>
	.home-page {
		position: relative;
		height: 100vh;
		width: 100vw;
		z-index: 3;
	}

	.home-backGround {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-image: url("/static/images/tour-1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 70%;
		z-index: 2;
	}

	.home-header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 140rpx;
		width: 100%;
		background-color: hsla(0, 0%, 30%, .95);
		z-index: 4;
	}

	.homeHeader-text {
		padding: 0 30rpx;
		margin-top: 50rpx;
		font-weight: 700;
		color: #1afa29;
		z-index: 4;
	}

	.homeHeader-return {
		padding: 0 30rpx;
		margin-top: 50rpx;
		font-weight: 700;
		color: #1afa29;
	}

	.home-box {
		margin-top: 30rpx;
		width: 100%;
	}

	.home-box-name {
		padding-left: 30rpx;
		margin-bottom: 10rpx;
		font-size: 16px;
		color: #efefef;
	}

	.home-box-homeName {
		display: flex;
		align-items: center;
		height: 40px;
		width: 100%;
		background-color: #fff;
		border-radius: 10px;
	}

	.home-box-userName {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		width: 100%;
		background-color: #fff;
		border-radius: 10px;

	}

	.home-userName-details {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.home-room-details {
		height: 30px;
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.home-userName-img {
		height: 17px;
		width: 17px;
	}

	.home-userinfo {
		font-size: 12px;
		color: #b4b4b4;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.add-user {
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		height: 40px;
		color: #1afa29;
	}

	.home-userName {
		margin-top: 20rpx;
		margin-left: 30rpx;
		width: 90%;
		border-bottom: #efefef 1px solid;
	}

	.home-box-remove {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 50rpx;
		height: 80rpx;
		background-color: #fff;
		color: #fa1b44;
		font-weight: 700;
		border-radius: 10px;
	}

	.home-remove-name {
		height: 60rpx;
		text-align: center;
	}

	.home-userName {

		margin-top: 20rpx;
		margin-left: 30rpx;
		width: 90%;
		border-bottom: #efefef 1px solid;
	}



	.home-content {
		height: 100%;
		margin: 0 30rpx;
		margin-top: 80px;
	}

	.content-fade-up-animation {
		animation-duration: .2s;
		animation-name: fadeInUp;
		-webkit-animation-duration: .2s;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
		-webkit-animation-name: fadeInUp;
	}

	@keyframes fadeInUp {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	@-webkit-keyframes fadeInUp {
		from {
			display: block;
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
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
