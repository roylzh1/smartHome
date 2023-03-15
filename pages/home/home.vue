<template>
	<view class="backGround"></view>
	<!--模糊-->
	<view :class="popupBoxIfShow||ifShowAddRoom||ifShowCheckHome == true ? 'backGround-up':''"></view>
	<view class="page"
		:style="{height: popupBoxIfShow||ifShowAddRoom||showAddFurniture||showRemoveFurniture||ifShowCheckHome == true ? '90vh':''}">
		<!-- 导航栏 -->
		<view class="navBarBox">
			<!--:style="headerStyle" :style="opacityStyle"-->
			<view class="backgroundColor" :style="{opacity:opacityStyle.opacity}"></view>
			<!-- 导航栏内容 -->
			<view class="navBar">
				<view class="text" :style="{opacity:opacityStyle.opacity}">我的家</view>
				<image @click="addRoomHandler" class="logo" src="/static/images/add-to-queue-regular.png"></image>
				<image class="logo" @click="checkHomeHandler" src="/static/images/more.png"></image>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="content">
			<h1 class="title">我的家</h1>
			<view class="topNaviagtion">
				<top-navigation @popupNav="globalControlHandler"></top-navigation>
			</view>
			<view class="room" v-for="(r,index) in roomList" :key="index">
				<view class="roomDetials">
					<view class="r-navBar" @click="addOrRemoveHandler(r.id,r.name,index)">
						<h3 class="r-title">{{r.name}}</h3>
						<image class="r-img" src="/static/images/rightArrow.png"></image>
						<change-furniture @hasClicked="furnitureHandler" class="furniture"
							v-if="ifShowchangeFurniture[index]">
						</change-furniture>
					</view>
					<view class="gridBox">
						<view v-for="(item,i) in r.furnitures"
							:style="{gridRowStart: item.type == 'middle' ? `span 2` : 'span 1'}">
							<small-box @popup="popupHandler" v-if="item.type !='middle'" :title="item.title"
								:open="item.open" :close="item.close" :photoClose="item.photoClose"
								:photoOpen="item.photoOpen" id="item.id"></small-box>
							<middle-box @popup="popupHandler" v-if="item.type == 'middle'" class="item"
								:title="item.title" :open="item.open" :close="item.close" :photoClose="item.photoClose"
								:photoOpen="item.photoOpen">
							</middle-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar selected="0"></tab-bar>
		<popup-light-box @touchmove.stop.prevent :title="popupMessage.title" v-show="popupBoxIfShow"
			:class="popupBoxIfShow == true ? 'content-fade-up-animation' : ''" @lightComplete="closeBoxHandler">
		</popup-light-box>
		<add-new-room v-show="ifShowAddRoom" :class="ifShowAddRoom == true ? 'content-fade-up' : ''"
			@addRoomComplete="closeAddRoomBoxHandler"></add-new-room>

		<add-furniture v-show="showAddFurniture" :class="showAddFurniture == true ? 'content-fade-up' : ''"
			:name="whichRoom" :roomId="roomId" :homeId="account.homeSeleted" @addRoomComplete="closeFurnitureHandler">
		</add-furniture>
		<remove-furniture v-show="showRemoveFurniture" :class="showRemoveFurniture == true ? 'content-fade-up' : ''"
			:name="whichRoom" @addRoomComplete="closeFurnitureHandler"></remove-furniture>
	</view>
</template>

<script setup>
	import {
		onPageScroll,
		onTabItemTap,
		onShow,
	} from '@dcloudio/uni-app'
	import {
		onMounted,
		onUnmounted,
		reactive,
		ref,
		nextTick
	} from 'vue';
	import tabBar from '/components/tabBar.vue'
	import room from '/components/room.vue'
	import topNavigation from '/components/topNaviagtion.vue'
	import popupLightBox from '/components/popupLightBox.vue'
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
	let popupBoxIfShow = ref(false); //普通弹窗
	let popupMessage = reactive({
		title: '',
		name: ''
	});
	let lightName = ref('');
	let opacityStyle = reactive({
		opacity: 0
	});
	const popupHandler = (title, name) => {
		popupBoxIfShow.value = true;
		popupMessage.title = title;
		popupMessage.name = name;
	}

	const closeBoxHandler = (judege) => {
		if (!judege) {
			//拿ID才能做出判断是那盏灯熄灭
		}
		popupBoxIfShow.value = false;
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
		uni.switchTab({
			url: `/pages/home/home`,
			animationType: 'pop-in',
			animationDuration: 500
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

	//-------------------onMounted-------------------
	onMounted(async () => {
		//获取手机状态栏高度
		uni.hideTabBar({
			animation: false
		});

	});

	onShow(async () => {
		let userInfo = uni.getStorageSync('smartHome_userInfo');
		console.log(userInfo)
		//获取房间和家具信息
		const roomInfo = await myRequest({
			url: `Room/GetRoom`,
			method: 'get',
			data: {
				homeId: account.homeSeleted,
			}
		});
		account.changeUserInfo({
			userName: userInfo.name,
			userId: userInfo.id,
			email: userInfo.email,
			phoneNumber: userInfo.phone
		});
		account.homeList = userInfo.homeList;
		account.homeTcp = userInfo.homeList[0].sessionId; //默认为第一个家庭
		account.homeSeleted = userInfo.homeList[0].id; //默认为第一个家庭
		console.log(account.homeList)


		roomList.value = [];
		account.airConditionCount = 0;
		account.roomList = roomInfo.data;
		roomList.value = roomInfo.data;
		let tempFurnitures = [];
		for (let i = 0; i < roomList.value.length; i++) {
			for (let j = 0; j < roomList.value[i].furnitures.length; j++) {
				let f = roomList.value[i].furnitures[j];
				if (f.type == 4) {
					account.airConditionCount += 1;
					continue;
				} //不显示空调
				tempFurnitures.push({
					type: f.size,
					title: f.name,
					open: "已开",
					close: "已关",
					photoClose: `/static/images/${f.type}.png`,
					photoOpen: `/static/images/${f.type}-light.png`,
					id: f.id
				});
			}
			roomList.value[i].furnitures = tempFurnitures;
			tempFurnitures = [];
		}
		showRoom.value = false;

		nextTick(() => {
			showRoom.value = true;
		})

		console.log(roomList.value)
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

	.page {
		height: 120vh;
		width: 100%;
		z-index: 2;
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
		z-index: 3;
	}

	.room {
		margin: 0 30rpx;
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
