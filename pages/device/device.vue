<template>
	<view class="backGround"></view>
	<view :class="popupAirIfShow ? 'backGround-up':''"></view>
	<view class="content">
		<h1 class="title">管理设备</h1>
		<view class="room">
			<view class="centerControl" v-show="hasAirCondition">
				<h3 class="g-title">智能暖通中控</h3>
				<card @click="clickAirCondition" @longpress="longPressAirHandler">
					<template #default>
						<view class="box">
							<view class="air-status">
								<image class="air-status-logo" :src="imageSrc"
									:style="{filter: `grayscale(${level}) brightness(${level+1})`}"></image>
								<view class="air-status-text" :style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
									{{airStatus}}
								</view>
								<view class="air-status-text-num"
									:style="{color: ifAirOpen == true ?`#fff` : `#c8c8c8`}">
									{{num}}台 开启
								</view>
							</view>
							<view class="air-open">
								<view class="temperatureBox" :style="{color: isCold? '#1296db':'#1afa29'}">
									{{avgTemperature}}°C
								</view>
							</view>
						</view>
					</template>
				</card>
				<h3 class="g-title">智能灯光中控</h3>
				<card @longpress="longPressLightHandler">
					<template #default>
						<view class="light-box">
							<view class="slider" @click="openLight">
								<view :class="lightClass" class="slider-thumb"></view>
							</view>
							<view class="light-text">
								亮着 {{lightNum}} 盏
							</view>
						</view>
					</template>
				</card>
				<h3 class="g-title">智能环境检测</h3>
				<card width="600" height="350">
					<template #default>
						<view class="charts-box">
							<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
						</view>
					</template>
				</card>

			</view>
		</view>
		<popup-global-air v-if="popupAirIfShow" @airGlobalComplete="closeAirHandler" title="空调中控"
			:temperture="avgTemperature" :idList="airConditionIdList" :airStatus="airStatus"
			:mode="account.airList[0].mode" :class="popupAirIfShow == true ? 'content-fade-up-animation' : ''">
		</popup-global-air>
		<tab-bar selected="2"></tab-bar>
	</view>
</template>

<script setup>
	import tabBar from '/components/tabBar.vue';
	import card from '/components/card.vue';
	import popupGlobalAir from '/components/popupGlobalAir.vue'
	import {
		onMounted,
		ref,
		nextTick,
		getCurrentInstance,
	} from "vue";
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const popupAirIfShow = ref(false) //空调全局弹窗
	const hasAirCondition = ref(true); //是否显示空调
	const avgTemperature = ref(null); //平均温度
	const isCold = ref(null);
	const airStatus = ref('关闭');
	const ifAirOpen = ref(null); //判断是否开启
	const imageSrc = ref('/static/images/center-airconditioner.png'); //开关机图片
	const num = ref(0);
	const level = ref(1); //开关样式设置
	let airConditionIdList = ref([]); //所有空调的id
	//-----------------灯光------------------------
	const lightOpen = ref(null);
	const lightClass = ref('');
	const lightNum = ref(null);
	const roomList = ref([]);
	//-------------------图表--------------------
	let chartData = ref();
	let opts = {
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666"],
		fontColor: '#d0d0d0',
		padding: [20, 0, -10, 0],
		enableScroll: false,
		legend: {
			float: 'top',
			margin: 10,
			padding: 10
		},
		height: 170,
		series: {
			textOffset: -10
		},
		xAxis: {
			disableGrid: true,
			fontColor: '#d0d0d0',
			axisLine: false,
			marginTop: 5,
		},
		yAxis: {
			gridType: "dash",
			dashLength: 1,
			disableGrid: true,
			disabled: true
		},
		extra: {
			line: {
				type: "curve",
				width: 2,
				activeType: "hollow",
				onShadow: true,
				animation: "horizontal"
			},
			markLine: {
				type: "dash"
			}
		}
	};

	onShow(async () => {
		getServerData();
		if (account.airList) {
			const roomInfo = await myRequest({
				url: `Room/GetRoom`,
				method: 'get',
				data: {
					homeId: account.homeSeleted,
				}
			});
			console.log(roomInfo)
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
			uni.hideNavigationBarLoading();
		}
		if (account.airConditionCount != 0) {
			hasAirCondition.value = true;
			//重置开关
			airStatus.value = '关闭';
			ifAirOpen.value = false;
			airConditionIdList.value = [];
			num.value = 0;
			account.airList.forEach(air => {
				airConditionIdList.value.push(air.id);
				if (air.state == true) {
					airStatus.value = '开启';
					ifAirOpen.value = true;
					level.value = 0;
					num.value++;
				}
			});
			avgTemperature.value = (account.airList.map(air => air.tempreture).reduce((pre, cur) =>
				pre + cur
			) / account.airList.length).toFixed(0);
			if (account.airList[0].mode == 1) { //暖风
				isCold.value = false;
			} else {
				isCold.value = true;
			}
			//空调图标
			if (ifAirOpen.value == true && isCold.value == true)
				imageSrc.value = '/static/images/center-airconditioner-open.png'
			else if (ifAirOpen.value == true && isCold.value == false)
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png'
			else {
				imageSrc.value = '/static/images/center-airconditioner.png'
				level.value = 1;
			}

		}
		lightNum.value = 0;
		lightOpen.value = false;
		account.lightList.forEach(light => {
			if (light.state) {
				lightOpen.value = true;
				lightNum.value++;
			}
		})
		if (lightOpen.value)
			lightClass.value = 'slider-on';
		else
			lightClass.value = 'slider-off';

	})
	//点击空调
	const clickAirCondition = async () => {
		console.log(111)
		popupAirIfShow.value = true;
	}
	const closeAirHandler = () => {
		popupAirIfShow.value = false;
		if (account.airConditionCount != 0) {
			hasAirCondition.value = true;
			//重置开关
			airStatus.value = '关闭';
			ifAirOpen.value = false;
			airConditionIdList.value = [];
			num.value = 0;
			account.airList.forEach(air => {
				airConditionIdList.value.push(air.id);
				if (air.state == true) {
					airStatus.value = '开启';
					ifAirOpen.value = true;
					level.value = 0;
					num.value++;
				}
			});
			avgTemperature.value = 0;
			console.log(account.airList)
			let arr = account.airList.map(air => air.tempreture);
			arr.forEach(temp => {
				avgTemperature.value += (temp * 1);
			})
			avgTemperature.value = (avgTemperature.value / account.airList.length).toFixed(0);
			if (account.airList[0].mode == 1) { //暖风
				isCold.value = false;
			} else {
				isCold.value = true;
			}
			//空调图标
			if (ifAirOpen.value == true && isCold.value == true)
				imageSrc.value = '/static/images/center-airconditioner-open.png'
			else if (ifAirOpen.value == true && isCold.value == false)
				imageSrc.value = '/static/images/center-airconditioner-open-hot.png'
			else {
				imageSrc.value = '/static/images/center-airconditioner.png'
				level.value = 1;
			}

		}
	}
	const longPressAirHandler = () => {
		uni.navigateTo({
			url: `/pages/airConditioner/airConditioner`,
			animationType: 'pop-in',
			animationDuration: 500
		});
	}
	//灯光开关
	const openLight = async () => {
		lightOpen.value = !lightOpen.value;
		if (lightOpen.value) {
			lightClass.value = 'slider-on';
			lightNum.value = account.lightList.length;
			const res = await myRequest({
				url: `Tcp/GlobalChangeLight`,
				method: 'post',
				data: {
					"lightId": account.lightList.map(light => light.id),
					"state": true,
					"sessionId": account.homeTcp
				}
			});
		} else {
			lightClass.value = 'slider-off';
			lightNum.value = 0;
			const res = await myRequest({
				url: `Tcp/GlobalChangeLight`,
				method: 'post',
				data: {
					"lightId": account.lightList.map(light => light.id),
					"state": false,
					"sessionId": account.homeTcp
				}
			});
		}

	}
	const longPressLightHandler = () => {
		uni.navigateTo({
			url: `/pages/lamp/lamp`,
			animationType: 'pop-in',
			animationDuration: 500
		});
	}
	const pressHandler = () => {

	}
	const getServerData = () => {
		let res = {
			categories: ["3:00", "8:00", "12:00", "16:00", "19:00", "22:00"],
			series: [{
					name: "温度",
					data: [24, 27, 32, 32, 29, 26],
					setShadow: [
						8,
						12,
						20,
						"#1890FF"
					],
				},
				{
					name: "湿度",
					data: [70, 75, 77, 80, 82, 79],
					setShadow: [
						12,
						8,
						20,
						"#91CB74"
					],
				}
			]
		};
		chartData.value = JSON.parse(JSON.stringify(res));
	};


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
		display: flex;
		height: 80vh;
		margin: 0 30rpx;
	}

	.title {
		padding-top: 30px;
		margin-left: 30rpx;
		height: 40px;
		z-index: 2;
		letter-spacing: 1px;
		color: #fff;
	}

	.centerControl {
		height: 100px;
		width: 80vw;
		z-index: 2;
	}

	.g-content {
		margin-top: 10px;
	}

	.g-title {
		margin-top: 20px;
		color: #ffffff;
	}

	.box {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
	}

	.air-status-logo {
		height: 80rpx;
		width: 80rpx;
		margin-top: 20rpx;
		transition: 1s;
	}

	.air-status-text {
		font-weight: 700;
		margin-top: 30rpx;
		transition: 1s;
	}

	.air-status-text-num {
		margin-top: 5px;
		width: 50px;
		margin-bottom: 2px;
		font-size: 13px;
		transition: 1s;
	}

	.air-status {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		width: 100rpx;
		margin-top: 15rpx;
		margin-left: 10rpx;
	}

	.air-open {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 230rpx;
		width: 130rpx;
		margin-left: 30rpx;
		margin-top: 15rpx;
	}

	.temperatureBox {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90rpx;
		width: 90rpx;
		margin-top: 20rpx;
		transition: .2s;
		background-color: #ffffff;
		color: rgba(0, 0, 0, .8);
		font-size: 30rpx;
		font-weight: 600;
		border-radius: 50%;
	}

	.light-box {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;

	}

	.slider {
		position: relative;
		margin-top: 10px;
		width: 100px;
		height: 40px;
		margin-left: 10px;
		background-color: #e7e7e7;
		border-radius: 20px;
		cursor: pointer;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.35),
			inset -2px -2px 4px rgba(0, 0, 0, 0.25);
	}

	.slider-thumb {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		transition: transform 0.3s ease, background 0.5s ease-in-out;
	}

	.slider-on {
		background: linear-gradient(to bottom right, rgba(240, 214, 105, 1) 0%, rgba(240, 214, 105, .8) 50%, rgba(240, 214, 105, .6) 100%);
		transform: translate(60px, -50%);
		transition: transform 0.3s ease, background 0.5s ease-in-out;
	}

	.slider-off {
		transform: translate(0, -50%);
		background: linear-gradient(to bottom right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(229, 229, 229, 0) 100%);
		transition: transform 0.3s ease, background 0.5s ease-in-out;
	}

	.light-text {
		font-weight: 700;
		margin-top: 35px;
		margin-left: 20px;
		transition: 1s;
		color: #fff;
	}

	.charts-box {
		width: 280px;
		height: 170px;
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
</style>
