<template>
	<popup-card :title="name" @return="complete">
		<view class="popup-user-detail">
			<image @click="updateImage" class="user-img"
				:src="hasImage ? `http://47.115.227.63:6600/userImage/${name}.jpg`: 'http://47.115.227.63:6600/userImage/deafult.jpg'">
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
		ref
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app';
	import popupCard from '/components/popupCard.vue'
	const prop = defineProps({
		name: String,
		email: String,
		phoneNumber: String,
		hasImage: Boolean
	});
	const imageUrl = ref('http://47.115.227.63:6600/userImage/deafult.png');
	const emit = defineEmits(['userComplete']);

	const complete = () => {
		emit('userComplete');
	};
	const updateImage = () => {
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
	}
	const uploadImgFile = (filePath) => {
		const token = uni.getStorageSync('smartHome_userToken');
		uni.uploadFile({
			url: 'http://47.115.227.63:6600/api/User/UpdateUserImage',
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
	onShow(() => {

	})
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
		margin-top: 600rpx;
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
</style>
