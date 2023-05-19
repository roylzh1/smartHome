//let baseURL = 'http://47.115.227.63:6600/api/';
//let baseURL = 'https://localhost:7140/api/';
let baseURL = 'http://106.55.182.93:6600/api/'

function myRequest(options) {
	let headers = {}
	var token = uni.getStorageSync('smartHome_userToken');
	//console.log(token)
	if (token)
		headers["Authorization"] = 'Bearer ' + token;
	headers["Content-Type"] = "application/json";
	return new Promise((res, rej) => {
		uni.request({
			url: baseURL + options.url,
			method: options.method || 'GET',
			data: options.data,
			header: headers,
			success(data) {
				//console.log(data)
				if (data.data == '未认证' || data.data == '请先登录' || data.data.message == '请先登录' || data
					.statusCode == 401) {
					uni.setStorageSync('smartHome_userToken', '');
					uni.switchTab({
						url: `/pages/user/user`,
						animationType: 'pop-in',
						animationDuration: 500
					});
				} else if (data.data.message == '权限不足!') {
					uni.showToast({
						title: '权限不足！请联系房主',
						icon: 'none', //如果要纯文本，不要icon，将值设为'none'
						duration: 2000 //持续时间为 2秒
					});
				}
				res(data)
			},
			fail(data) {
				console.log(data)
				rej()
			}
		})
	})
}
export default myRequest;
