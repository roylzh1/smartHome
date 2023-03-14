let baseURL = 'http://47.115.227.63:6600/api/'; //"https://localhost:7140/api/";
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
				if (data.data == '未认证') {
					uni.switchTab({
						url: `/pages/user/user`,
						animationType: 'pop-in',
						animationDuration: 500
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
