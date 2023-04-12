<template>
	<view>

	</view>
</template>
<script>
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	// 只能在App.vue里监听应用的生命周期
	export default {
		onLaunch: async function() {
			uni.hideTabBar()
			const account = useAccountStore();
			const userToken = uni.getStorageSync('smartHome_userToken');
			if (userToken == '') {
				return;
			}
			//获取成功,拿用户信息
			const userInfo = uni.getStorageSync('smartHome_userInfo');
			//更新会话号
			const res = await myRequest({
				url: `Home/GetHomeSession`,
				method: 'get',
				data: {
					homeId: userInfo.homeList[0].id,
				}
			});
			account.homeTcp = res.data;
			account.homeSeleted = userInfo.homeList[0].id;
			account.userinfo.userName = userInfo.name;
			account.userinfo.userId = userInfo.id;
			account.userinfo.email = userInfo.email;
			account.userinfo.phoneNumber = userInfo.phone;
			account.userinfo.hasImage = userInfo.hasImage;
			try {
				setInterval(async () => {
					let res = await myRequest({
						url: `Home/GetAlter`,
						method: 'get',
						data: {
							homeId: account.homeSeleted,
						}
					});
					let data = res.data;
					console.log(res);
					if (data) {
						console.log('报警')
						uni.vibrateLong({
							success: function() {
								console.log('success');
							}
						});
						uni.showModal({
							content: '警报!!!',
							success: async function(res) {
								if (res.confirm) {
									const res = await myRequest({
										url: `Home/ChangeAlter`,
										method: 'get',
										data: {
											homeId: account.homeSeleted,
											state: false
										}
									});
									console.log('点击了确认')
								} else {
									console.log('点击了取消')
								}
							}
						})
					} else {}
				}, 13000);
			} catch (e) {
				console.log(e.message)
			}

			console.log('App Launch')
		},
		onLoad: async function() {

		},
		onShow: async function() {

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style scoped>

</style>
