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
				res(data)
			},
			fail() {
				rej()
			}
		})
	})

}
export default myRequest;
