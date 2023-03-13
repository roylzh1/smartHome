import {
	defineStore
} from 'pinia'

export const useAccountStore = defineStore('account', {
	state: () => ({
		//用户信息
		userinfo: {
			userName: 'admin',
			userId: '',
			email: '',
			phoneNumber: '',
		},
		//家庭信息
		homeList: [],
		//当前的家,默认0
		homeSeleted: 0,
		roomList: []
	}),
	actions: {
		changeUserInfo(userinfo) {
			this.userinfo.userName = userinfo.userName;
			this.userinfo.userId = userinfo.userId;
			this.userinfo.email = userinfo.email;
			this.userinfo.phoneNumber = userinfo.phoneNumber;
		},
	}
})
