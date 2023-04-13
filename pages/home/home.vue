<template>
	<view class="backGround"></view>
	<!--模糊-->
	<view :class="popupBoxIfShow||ifShowAddRoom||ifShowCheckHome || popupFanBoxIfShow == true ? 'backGround-up':''">
	</view>
	<view class="page"
		:style="{height: popupBoxIfShow||ifShowAddRoom||showAddFurniture||showRemoveFurniture||ifShowCheckHome|| popupFanBoxIfShow == true ? '90vh':''}">
		<!-- 导航栏 -->
		<view class="navBarBox">
			<view class="backgroundColor" :style="{opacity:opacityStyle.opacity}"></view>
			<!-- 导航栏内容 -->
			<view class="navBar">
				<view class="text" :style="{opacity:opacityStyle.opacity}">我的家</view>
				<image @click="addRoomHandler" class="logo" src="/static/images/add-to-queue-regular.png"></image>
				<image class="logo" @click="checkHomeHandler" src="/static/images/more.png"></image>
			</view>
		</view>
		<view class="msg-box">
			<view class="msg-content" v-for="(msg,index) in messageList">
				<view class="msg-left">
					{{msg.content}}
				</view>
				<view class="msg-right" @click="deleteMsg(msg.id,index)">

				</view>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="content">
			<h1 class="title">我的家</h1>
			<!--
			<view class="topNaviagtion">
				<top-navigation @popupNav="globalControlHandler"></top-navigation>
			</view>-->
			<view class="room" v-for="(r,index) in roomList" :key="r.id">
				<view class="roomDetials">
					<view class="r-navBar" @click="addOrRemoveHandler(r.id,r.name,index)">
						<h3 class="r-title">{{r.name}}</h3>
						<image class="r-img" src="/static/images/rightArrow.png"></image>
						<change-furniture @hasClicked="furnitureHandler" class="furniture"
							v-if="ifShowchangeFurniture[index]">
						</change-furniture>
					</view>
					<view class="gridBox">
						<view v-for="(item,i) in r.furnitures" :key="item.id"
							:style="{gridRowStart: item.type == 'middle' ? `span 2` : 'span 1'}">
							<small-box @popup="popupHandler" v-if="item.type !='middle'" :title="item.title"
								:open="item.open" :close="item.close" :photoClose="item.photoClose"
								:photoOpen="item.photoOpen" :id="item.id" :state="item.state" :roomId="index"
								:fType="item.fType">
							</small-box>
							<middle-box @popup="popupHandler" v-if="item.type == 'middle'" class="item"
								:title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose"
								:photoOpen="item.photoOpen" :index="i" :id="item.id" :state="item.state" :roomId="index"
								:fType="item.fType">
							</middle-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar selected="0"></tab-bar>
		<popup-light-box @touchmove.stop.prevent :title="popupMessage.title" :index="popupMessage.index"
			v-show="popupLightBoxIfShow" :class="popupLightBoxIfShow == true ? 'content-fade-up-animation' : ''"
			@lightComplete="closeLightBoxHandler">
		</popup-light-box>
		<popup-fan @touchmove.stop.prevent :title="popupMessage.title" :index="popupMessage.index"
			v-show="popupFanBoxIfShow" :class="popupFanBoxIfShow == true ? 'content-fade-up-animation' : ''"
			@lightComplete="closeFanBoxHandler">
		</popup-fan>
		<popup-door @touchmove.stop.prevent :title="popupMessage.title" :state="popupMessage.state"
			:id="popupMessage.id" :fIndex="popupMessage.index" :rIndex="popupMessage.roomId" v-if="popupdoorBoxIfShow"
			:class="popupdoorBoxIfShow == true ? 'content-fade-up-animation' : ''" @doorComplete="closedoorBoxHandler">
		</popup-door>
		<add-new-room v-show="ifShowAddRoom" :class="ifShowAddRoom == true ? 'content-fade-up' : ''"
			@addRoomComplete="closeAddRoomBoxHandler"></add-new-room>

		<add-furniture v-show="showAddFurniture" :class="showAddFurniture == true ? 'content-fade-up' : ''"
			:name="whichRoom" :roomId="roomId" :homeId="account.homeSeleted" @addFurComplete="closeFurnitureHandler">
		</add-furniture>
		<remove-furniture v-show="showRemoveFurniture" :class="showRemoveFurniture == true ? 'content-fade-up' : ''"
			:name="whichRoom" :roomId="roomId" :homeId="account.homeSeleted" @removeFurComplete="closeFurnitureHandler">
		</remove-furniture>
	</view>
</template>

<script setup>
	import {
		onPageScroll,
		onTabItemTap,
		onShow,
		onPullDownRefresh,
	} from '@dcloudio/uni-app'
	import {
		onMounted,
		onUnmounted,
		reactive,
		ref,
		nextTick,
		provide
	} from 'vue';
	import tabBar from '/components/tabBar.vue'
	import room from '/components/room.vue'
	import topNavigation from '/components/topNaviagtion.vue'
	import popupLightBox from '/components/popupLightBox.vue'
	import popupFan from '/components/popupFan.vue'
	import popupDoor from '/components/popupDoor.vue'
	import addNewRoom from '/components/addNewRoom.vue'
	import checkHome from '/components/checkHome.vue'
	import changeFurniture from '/components/changeFurniture.vue';
	import middleBox from '/components/middleBox.vue';
	import smallBox from '/components/smallBox.vue';
	import addFurniture from '/components/addFurniture.vue'
	import removeFurniture from '/components/removeFurniture.vue'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	let roomList = ref([]);
	let showRoom = ref(true);
	let messageList = ref([]);
	//弹窗信息注入
	let popupMessage = reactive({
		title: '',
		id: '', //家具索引
	});
	let lightName = ref('');
	let opacityStyle = reactive({
		opacity: 0
	});
	//普通弹窗
	const popupLightBoxIfShow = ref(false);
	const popupFanBoxIfShow = ref(false);
	const popupdoorBoxIfShow = ref(false);
	//基础家具弹窗,大的小的都在这
	const popupHandler = (type, title, id, index, state, roomId) => {
		//灯
		if (type == 0 || type == 1) {
			popupLightBoxIfShow.value = true;
		}
		//风扇
		if (type == 2) {
			popupFanBoxIfShow.value = true;
		}
		if (type === 3) {
			popupdoorBoxIfShow.value = true;
		}
		popupMessage.title = title;
		popupMessage.id = id;
		popupMessage.index = index; //家具索引
		popupMessage.state = state;
		popupMessage.roomId = roomId;
		console.log(popupMessage)
	}
	//处理详细控制灯,风扇
	const closeLightBoxHandler = async level => {
		popupLightBoxIfShow.value = false;
		console.log(level);
		const res = await myRequest({
			url: `Tcp/ChangeLightIntensity`,
			method: 'get',
			data: {
				lightId: popupMessage.id,
				level,
				sessionId: account.homeTcp
			}
		});
		console.log(res);
		uni.switchTab({
			url: `/pages/home/home`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	}
	const closeFanBoxHandler = async level => {
		popupFanBoxIfShow.value = false;
		console.log(level);
		const res = await myRequest({
			url: `Tcp/ChangeWindSpeed`,
			method: 'get',
			data: {
				lightId: popupMessage.id,
				level,
				sessionId: account.homeTcp
			}
		});
		console.log(res);
		uni.switchTab({
			url: `/pages/home/home`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	}
	//处理详细控制门
	const closedoorBoxHandler = async () => {
		popupdoorBoxIfShow.value = false;
		uni.switchTab({
			url: `/pages/home/home`,
			animationType: 'pop-in',
			animationDuration: 0
		});
	}
	//添加房间
	const ifShowAddRoom = ref(false);
	const addRoomHandler = () => {
		ifShowAddRoom.value = true;
	}
	const closeAddRoomBoxHandler = () => {
		ifShowAddRoom.value = false;
	}
	//添加家具
	const showAddFurniture = ref(false);
	const showRemoveFurniture = ref(false);
	const whichRoom = ref(''); //判断是哪个房间增删家具 房间名
	const roomId = ref(0);
	let ifShowchangeFurniture = ref([]);
	const addOrRemoveHandler = (id, roomName, index) => { //家具弹窗
		ifShowchangeFurniture.value[index] = !ifShowchangeFurniture.value[index];
		whichRoom.value = roomName; //房间id
		roomId.value = id;
		console.log('roomId:' + id)
	}
	const furnitureHandler = (mode) => {
		//console.log(mode)
		if (mode) //增加
			showAddFurniture.value = true;
		else //删除家具
			showRemoveFurniture.value = true;
	}
	const closeFurnitureHandler = () => {
		//刷新页面
		uni.reLaunch({
			url: '/pages/home/home'
		});
		showAddFurniture.value = false;
		showRemoveFurniture.value = false;
	}
	const clickFurniturehandler = (id) => {
		console.log(id)
	}
	//查看家庭数量
	const ifShowCheckHome = ref(false);
	//跳转到家庭设置
	const checkHomeHandler = () => {
		uni.navigateTo({
			url: `/pages/homeSetting/homeSetting?homeId=${account.homeSeleted}`
		});
		//ifShowCheckHome.value = true;
	}
	const closecheckHomeBoxHandler = () => {
		ifShowCheckHome.value = false;
	}
	//更改家庭
	const changeHomeHandler = async (index) => {
		let homeId = account.homeList[index].id;
		account.homeSeleted = homeId; //切换房号
		//获取用户信息
		const roomInfo = await myRequest({
			url: `Room/GetRoom`,
			method: 'get',
			data: {
				homeId,
			}
		});
		if (roomInfo.data.status == 400) return;
		console.log(roomInfo)

	}
	//全局控制导航
	const globalControlHandler = name => {
		if (name === '观影模式')
			uni.navigateTo({
				url: `/pages/airConditioner/airConditioner?name=${name}`,
				animationType: 'pop-in',
				animationDuration: 500
			});
		if (name === '灯')
			uni.navigateTo({
				url: `/pages/lamp/lamp?name=${name}`,
				animationType: 'pop-in',
				animationDuration: 500
			});
	};
	const disabledScroll = () => {}
	//删除信息
	const deleteMsg = async (id, index) => {
		await myRequest({
			url: `Home/DeleteMessage`,
			method: 'get',
			data: {
				messageId: id,
			}
		});
		uni.showToast({
			title: '删除成功',
			icon: 'none',
			duration: 1000
		});
		messageList.value.splice(index, 1);
	}
	//-------------------onMounted-------------------
	onMounted(async () => {
		//获取手机状态栏高度
		uni.hideTabBar({
			animation: false
		});
	});
	onShow(async () => {
		try {
			let userInfo = uni.getStorageSync('smartHome_userInfo');
			//console.log(userInfo)
			//更新会话号
			uni.showNavigationBarLoading();
			//获取房间和家具信息
			const roomInfo = await myRequest({
				url: `Room/GetRoom`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
				}
			});
			//console.log(roomInfo)
			account.changeUserInfo({
				userName: userInfo.name,
				userId: userInfo.id,
				email: userInfo.email,
				phoneNumber: userInfo.phone,
				hasImage: userInfo.hasImage
			});
			account.homeList = userInfo.homeList;
			account.homeSeleted = userInfo.homeList[0].id; //默认为第一个家庭
			//console.log(account.homeList)
			roomList.value = [];
			account.airList = [];
			account.lightList = [];
			account.airConditionCount = 0; //空调数量
			account.roomList = roomInfo.data;
			roomList.value = roomInfo.data;
			let tempFurnitures = [];
			for (let i = 0; i < roomList.value.length; i++) {
				for (let j = 0; j < roomList.value[i].furnitures.length; j++) {
					let f = roomList.value[i].furnitures[j];
					if (f.type == 4) {
						account.airConditionCount += 1;
						account.airList.push({
							roomId: roomList.value[i].id,
							roomName: roomList.value[i].name,
							title: f.name,
							id: f.id,
							state: f.state,
							level: f.level,
							mode: f.mode,
							tempreture: f.tempreture,
						})
						continue;
					} //不显示空调
					if (f.type == 0 || f.type == 1) {
						account.lightList.push({
							roomId: roomList.value[i].id,
							roomName: roomList.value[i].name,
							title: f.name,
							id: f.id,
							state: f.state
						})
					} //不显示空调
					tempFurnitures.push({
						type: f.size,
						title: f.name,
						open: "已开",
						close: "已关",
						photoClose: `/static/images/${f.type}.png`,
						photoOpen: `/static/images/${f.type}-light.png`,
						id: f.id,
						state: f.state,
						fType: f.type
					});
				}
				roomList.value[i].furnitures = tempFurnitures;
				tempFurnitures = [];
			}
			showRoom.value = false;
			uni.hideNavigationBarLoading();
			nextTick(() => {
				showRoom.value = true;
			})

			//console.log(account.roomList)
			//console.log(account.airList)
			//获取信息
			const msg = await myRequest({
				url: `Home/GetMessage`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
				}
			});
			messageList.value = msg.data
		} catch (e) {
			console.log(e)
			uni.switchTab({
				url: `/pages/user/user`,
				animationType: 'pop-in',
				animationDuration: 500
			});
		}
	})
	onPullDownRefresh(async () => {
		try {
			let userInfo = uni.getStorageSync('smartHome_userInfo');
			console.log(userInfo)
			//更新会话号
			uni.showNavigationBarLoading();
			//获取房间和家具信息
			const roomInfo = await myRequest({
				url: `Room/GetRoom`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
				}
			});
			//console.log(roomInfo)
			account.changeUserInfo({
				userName: userInfo.name,
				userId: userInfo.id,
				email: userInfo.email,
				phoneNumber: userInfo.phone,
				hasImage: userInfo.hasImage
			});
			account.homeList = userInfo.homeList;
			account.homeSeleted = userInfo.homeList[0].id; //默认为第一个家庭
			//console.log(account.homeList)
			roomList.value = [];
			account.airList = [];
			account.lightList = [];
			account.airConditionCount = 0; //空调数量
			account.roomList = roomInfo.data;
			roomList.value = roomInfo.data;
			let tempFurnitures = [];
			for (let i = 0; i < roomList.value.length; i++) {
				for (let j = 0; j < roomList.value[i].furnitures.length; j++) {
					let f = roomList.value[i].furnitures[j];
					if (f.type == 4) {
						account.airConditionCount += 1;
						account.airList.push({
							roomId: roomList.value[i].id,
							roomName: roomList.value[i].name,
							title: f.name,
							id: f.id,
							state: f.state,
							level: f.level,
							mode: f.mode,
							tempreture: f.tempreture,
						})
						continue;
					} //不显示空调
					if (f.type == 0 || f.type == 1) {
						account.lightList.push({
							roomId: roomList.value[i].id,
							roomName: roomList.value[i].name,
							title: f.name,
							id: f.id,
							state: f.state
						})
					} //不显示空调
					tempFurnitures.push({
						type: f.size,
						title: f.name,
						open: "已开",
						close: "已关",
						photoClose: `/static/images/${f.type}.png`,
						photoOpen: `/static/images/${f.type}-light.png`,
						id: f.id,
						state: f.state,
						fType: f.type
					});
				}
				roomList.value[i].furnitures = tempFurnitures;
				tempFurnitures = [];
			}
			showRoom.value = false;
			uni.hideNavigationBarLoading();
			nextTick(() => {
				showRoom.value = true;
			})
			//获取信息
			const msg = await myRequest({
				url: `Home/GetMessage`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
				}
			});
			messageList.value = msg.data;
			uni.stopPullDownRefresh();
		} catch (e) {
			console.log(e)
		}
	})
	//导航栏渐变
	onPageScroll(e => {
		let opacity = e.scrollTop / 50;
		if (opacity > 1) {
			opacity = 1;
			return;
		}
		opacityStyle.opacity = `${opacity}`;
	});
</script>

<style scoped>
	.navBarBox {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 130rpx;
		z-index: 6;
		overflow: hidden;
	}

	.navBar {
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 100%;
		z-index: 6;
		padding-top: 30rpx;
	}

	.logo {
		height: 50rpx;
		width: 50rpx;
		margin-right: 50rpx;
		z-index: 6;
	}

	.backGround {
		height: 100%;
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

	.page {
		width: 100%;
		z-index: 2;
		padding-bottom: 80px;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding-top: 90rpx;
	}

	.title {
		color: white;
		font-size: 35px;
		margin-left: 30rpx;
		margin-top: 50rpx;
		margin-bottom: 10rpx;
		z-index: 3;
	}

	.room {
		margin: 0 30rpx;
		margin-top: 20rpx;
	}

	.roomDetials {
		z-index: 3;
		margin-bottom: 10rpx;
	}

	.r-title {
		color: #ffffff;
		font-weight: 700;
		font-size: 35rpx;
		z-index: 3;
	}

	.r-img {
		height: 30rpx;
		width: 30rpx;
		margin-left: 10rpx;
		z-index: 3;
	}

	.r-navBar {
		position: relative;
		display: flex;
		align-items: baseline;
	}

	.furniture {
		position: absolute;
		z-index: 99;
		left: 150rpx;
		top: -10rpx;
		transition: .4s;
		height: 60px;
		width: 100px;
	}

	.gridBox {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-gap: 10rpx 10rpx;
		grid-auto-flow: row dense;
		align-items: space-between;
		justify-content: space-between;
		width: 100%;
		margin-top: 15rpx;
		z-index: 99;
	}

	.text {
		position: absolute;
		color: #ffffff;
		height: 50rpx;
		width: 200rpx;
		font-size: 35rpx;
		top: 45%;
		left: 50%;
		font-weight: 700;
		z-index: 6;
		margin-left: -55rpx;
		letter-spacing: 3rpx;
	}

	.topNaviagtion {
		z-index: 3;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.msg-box {
		position: fixed;
		top: 150rpx;
		right: 0;
		width: 120px;
		font-size: 12px;
		z-index: 99;
	}

	.msg-content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 30px;
		width: 100%;
		margin-top: 5px;
		transition: 1s;
	}

	.msg-left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 85%;
		height: 100%;
		background-color: rgba(255, 255, 255, .7);
		padding-left: 7px;
		border-radius: 7px 0 0 7px;
	}

	.msg-right {
		width: 15%;
		height: 100%;
		background-color: rgba(240, 214, 105, 1);
	}

	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .3);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		overflow: hidden;
		-webkit-transform: scale(3);
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

	.content-fade-up {
		animation-duration: .2s;
		animation-name: fadeInUp1;
		animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
		-webkit-animation-fill-mode: backwards;
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

	@keyframes fadeInUp1 {
		from {
			height: 0vh;
		}

		to {
			height: 35vh;
		}
	}
</style>
