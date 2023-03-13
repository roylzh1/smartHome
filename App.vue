<template>
	<view >
		
	</view>
</template>
<script>
	import server from '/utils/request.js'	
	// 只能在App.vue里监听应用的生命周期
	export default {
		provide: {
		    axios: server,
		  },
		onLaunch: function() {
			uni.hideTabBar()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style scoped>

</style>