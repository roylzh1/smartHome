export const checkUser = function(userName) {
	try {
		const userInfo = uni.getStorageSync('smartHome_userInfo');
		if (userInfo) {
			const name = userInfo.data.name;
			console.log(name);
			if (userName == name) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	} catch (e) {
		// error
	}
}

export const checkMaster = function(id, masterId) {
	if (id == masterId) {
		return true;
	} else {
		return false;
	}
}
