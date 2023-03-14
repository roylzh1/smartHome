<template>
	<view class="tab-bar">
		<view v-for="(item,index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)">
			<image class="tab_img" :src="selected == index ? item.selectedIconPath : item.iconPath"></image>
			<view class="tab_text" :style="{color: selected == index ? selectedColor : color}">{{item.text}}</view>
		</view>
		<view class="box">
			<view class="backgroundColor"></view>
		</view>
	</view>

</template>
<script>
	export default {
		props: {
			selected: { // 当前角色
				type: String,
				default: 0
			}

		},

		data() {
			return {
				color: "#bababa",
				selectedColor: "#ffffff",

				list: [{ // 最少2个、最多5个 tab
					"pagePath": "/pages/home/home", // 页面路径，必须在 pages 中先定义
					"iconPath": "/static/tabbar/home-solid-unSelect.png", // 图片路径
					"selectedIconPath": "/static/tabbar/home-solid.png",
					"text": "家庭" // tab 上按钮文字
				}, {
					"pagePath": "/pages/index/index",
					"iconPath": "/static/tabbar/sence-unSelect.png",
					"selectedIconPath": "static/tabbar/sence.png",
					"text": "场景"
				}, {
					"pagePath": "/pages/device/device",
					"iconPath": "/static/tabbar/device-unSelect.png",
					"selectedIconPath": "/static/tabbar/device.png",
					"text": "设备"
				}, {
					"pagePath": "/pages/user/user",
					"iconPath": "static/tabbar/user-unSelect.png",
					"selectedIconPath": "/static/tabbar/user.png",
					"text": "我的"
				}]
			}
		},
		methods: {
			switchTab(item, index) {
				let url = item.pagePath;
				// 对应患者和医生的首页
				uni.switchTab({
					url,
				});
			}
		}
	}
</script>

<style scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80px;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box {
		position: absolute;
		height: 100%;
		width: 110%;
		overflow: hidden;
	}

	.backgroundColor {
		position: absolute;
		height: 100%;
		width: 110%;
		background-color: hsla(0, 0%, 50%, .4);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(20px);
		overflow: hidden;
		-webkit-transform: scale(1);
		z-index: 2;
	}

	.tab-bar-item {
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: -5px;
		z-index: 11;
	}

	.tab_img {
		width: 32px;
		height: 32px;
	}

	.tab_text {
		font-size: 10px;
		padding-bottom: 20px;
		font-weight: 200;
	}
</style>
