<template>
	<popup-card :title="name" @return="complete">
		<view class="popup-user-detail">
			<image @click="updateImage" class="user-img"
				:src="hasImage ? `${base_url}/userImage/${name}.jpg`: `${base_url}/userImage/deafult.jpg`">
			</image>
			<view class="popup-user-detail-name">
				{{name}}
			</view>
			<view class="popup-user-detail-email">
				{{email}}
			</view>
			<view class="popup-user-detail-phone">
				{{phoneNumber}}
			</view>
			<view class="popup-user-detail-family">
				<view class="family-text">
					权限级别
				</view>
				<picker @change="bindPickerChange" :value="index" :range="family">
					<view class="famliy-input">{{family[index]}}</view>
				</picker>
			</view>
			<view class="remove-user">
				<view>
					移除用户
				</view>
			</view>
		</view>
	</popup-card>
</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app';
	import {
		base_url
	} from '../utils/env_value.js';
	import {
		checkMaster,
	} from '../utils/auth.js';
	import popupCard from '/components/popupCard.vue';
	import myRequest from '/utils/request.js';
	const prop = defineProps({
		name: String,
		email: String,
		phoneNumber: String,
		hasImage: Boolean,
		master: Number,
		userId: Number,
		role: Number
	});
	const imageUrl = ref(`${base_url}/userImage/deafult.png`);
	const emit = defineEmits(['userComplete']);
	const index = ref(0);
	const family = ['亲属', '亲戚', '朋友', '儿童']
	const complete = () => {
		emit('userComplete');
	};
	const bindPickerChange = async (e) => {
		const isMaster = checkMaster(prop.userId, prop.master);
		if (isMaster) {
			console.log('picker发送选择改变，携带值为', e.detail.value)
			index.value = e.detail.value; //User/ResetUserRole
			const res = await myRequest({
				url: `User/ResetUserRole`,
				method: 'get',
				data: {
					name: prop.name,
					newRoleName: index.value
				}
			});
			if (res.status == 200)
				uni.showToast({
					title: '更改权限成功',
					icon: 'none',
					duration: 3000
				});
		} else {
			uni.showToast({
				title: '暂无权限，请联系房主',
				icon: 'none',
				duration: 3000
			});
		}
	}
	const updateImage = () => {
		console.log(prop.name)
		const isThisUser = checkUser(prop.name);
		if (isThisUser) {
			uni.chooseImage({
				count: 1, // 最多可以选择的图片张数，默认9
				sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				success: function(res) {
					console.log('chooseImage-----》》》》》》》》', res);

					console.log(res.tempFiles, 'beforre--------');
					if (res.tempFiles[0]['size'] > 10 * 1024 * 1024) {
						uni.showToast({
							title: '图片大小不能超过10M',
							icon: 'none',
							duration: 3000
						});
						return;
					}

					uni.showLoading({
						title: '上传中...'
					})

					if (res.tempFiles[0]['size'] < 0.1 * 1024 * 1024) { //图片小于.1M不压缩，大于5M压缩
						uploadImgFile(res.tempFilePaths[0])
					} else {
						//只能在app端使用
						uni.compressImage({
							src: res.tempFilePaths[0],
							quality: 80,
							success: res => {
								console.log(res, '=========res');
								uploadImgFile(res.tempFilePath)
							}
						})
					}
				}
			});
		} else {
			uni.showToast({
				title: '无法编辑其他用户信息',
				icon: 'none',
				duration: 3000
			});
		}
	}
	const uploadImgFile = (filePath) => {
		const token = uni.getStorageSync('smartHome_userToken');
		uni.uploadFile({
			url: `${base_url}/api/User/UpdateUserImage`,
			filePath: filePath,
			name: 'file',
			formData: {
				file: filePath
			},
			header: {
				//'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + token
			},
			success: response => {
				uni.hideLoading()
				let res = response.data;
				console.log(res, '----res');
				if (res.code == 200) {
					prop.hasImage = true;
					console.log('请求成功_______________', res);
				}
			},
			fail: err => {
				uni.hideLoading()
				console.log('请求失败_______________', err);
			}
		});
	}
	onShow(() => {});
	const checkUser = function(userName) {
		try {
			const userInfo = uni.getStorageSync('smartHome_userInfo');
			console.log(userInfo);
			if (userInfo) {
				const name = userInfo.name;
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
	watch(() => prop.role, (newVal, oldVal) => {
		//console.log(newVal)
		index.value = newVal;
	});
</script>

<style scoped>
	.popup-user-detail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-user-detail-name {
		margin-top: 10px;
		font-size: 50px;
		color: #fff;
		font-weight: 600;
	}

	.popup-user-detail-email {
		margin-top: 20px;
		font-size: 16px;
		color: #efefef;
		font-weight: 400;
	}

	.popup-user-detail-phone {
		margin-top: 10px;
		font-size: 16px;
		color: #efefef;
		font-weight: 400;
	}

	.remove-user {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 350rpx;
		height: 60rpx;
		width: 200rpx;
		background-color: #fff;
		color: #fa1b44;
		font-weight: 700;
		border-radius: 10px;
	}

	.user-img {
		margin-top: 40px;
		height: 120px;
		width: 120px;
		border-radius: 50%;
	}

	.family-text {
		font-size: 16px;
		color: #efefef;
		margin-bottom: 10px;
	}

	.popup-user-detail-family {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.famliy-input {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 100px;
		color: #bfe33a;
		font-weight: 700;
		background-color: #fff;
		border-radius: 10px;
	}
</style>
