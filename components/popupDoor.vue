<template>
	<popup-card :title="title" @return="complete">
		<view class="door-box">
			<view class="door-content"
				:style="{backgroundColor: selected == true ? `rgba(240,214,105,1)` : `rgba(0,0,0,.5)`}">
				<image class="door-img" :src="selected == true ? '/static/images/3-light.png' : '/static/images/3.png'">
				</image>
			</view>
			<view class="door-text">
				<span>状态:</span>
				<span>{{stateText}}</span>
			</view>

			<view class="door" :class="doorClass" @click="touchDoor">
				<view class="door-btn" :class="doorBtnClass"></view>
			</view>

			<view class="create-password" @click="generateRandomPassword">
				<view class="password-text">
					生成临时密码
				</view>
				<view class="show-password">
					{{password}}
				</view>
			</view>
		</view>

	</popup-card>
</template>

<script setup>
	import {
		ref,
		watch,
		reactive,
	} from "vue";
	import {
		onShow,
	} from '@dcloudio/uni-app'
	import popupCard from '/components/popupCard.vue'
	import myRequest from '/utils/request.js';
	import {
		useAccountStore
	} from '@/store/account.js';
	const account = useAccountStore();
	const props = defineProps({
		title: String,
		state: Boolean,
		id: String,
		fIndex: String,
		rIndex: String
	});
	const emit = defineEmits(['doorComplete']);
	const selected = ref(false);
	const stateText = ref(null);
	const doorClass = ref('close');
	const doorBtnClass = ref('btn-open');
	const password = ref(null);
	const ifPassword = ref(true);
	const generateRandomPassword = async () => {
		if (ifPassword.value) {
			const res = await myRequest({
				url: `Tcp/CreateDoorPassword`,
				method: 'get',
				data: {
					doorId: props.id,
					sessionId: account.homeTcp
				}
			});
			console.log(res)
			password.value = res.data;
			ifPassword.value = false;
			setInterval(() => {
				ifPassword.value = true;
			}, 300000); // 5分钟
		} else {
			uni.showToast({
				title: '5分钟之后才能重新生成密码',
				icon: 'none',
				duration: 3000
			});
		}
	};

	const startInterval = () => {
		interval = setInterval(() => {

		}, 300000); // 5分钟
	};

	//完成
	const complete = async () => {
		const res = await myRequest({
			url: `Tcp/ChangeFurnitureState`,
			method: 'get',
			data: {
				state: selected.value,
				furnitureId: props.id,
				sessionId: account.homeTcp
			}
		});
		account.roomList[props.rIndex].furnitures[props.fIndex].state = selected.value;
		emit('doorComplete');
	};
	const touchDoor = () => {
		console.log(11)
		selected.value = !selected.value;
		if (selected.value) {
			doorClass.value = 'open';
			doorBtnClass.value = 'btn-open'
			stateText.value = '开启中';
		} else {
			doorClass.value = 'close';
			doorBtnClass.value = '';
			stateText.value = '关闭中';
		}
	}
	onShow(() => {
		//console.log(props.state)
		selected.value = props.state;
		if (selected.value) {
			stateText.value = '开启中';
			doorClass.value = 'open';
			doorBtnClass.value = 'btn-open'
		} else {
			doorClass.value = 'close';
			doorBtnClass.value = '';
			stateText.value = '关闭中';
		}
	})
</script>

<style scoped>
	.door-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
		width: 100%;
	}

	.door-content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		overflow: hidden;
		transition: 0.5s;
	}

	.door-img {
		height: 60%;
		width: 60%;
		z-index: 5;
		transition: 0.5s;
	}

	.door-text {
		color: #fff;
		font-size: 16px;
		margin-top: 20px;
	}

	.door {
		position: relative;
		margin-top: 30px;
		width: 130px;
		height: 270px;
		background: linear-gradient(to left, #fff, #d3d3d3);
		box-shadow: -20px 0px 0.9rem rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}

	.door-btn {
		position: absolute;
		top: 50%;
		right: -5%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		background: linear-gradient(to left top, #dddddd, #c1c1c1);
		border-radius: 50%;
		border: none;
		outline: none;
		cursor: pointer;
		transition: transform 0.8s ease-in-out;
		box-shadow: 0 0.1rem 0.9rem rgba(0, 0, 0, 0.3);
	}

	.open {
		transform-origin: left center;
		transform: rotateY(-70deg);
		transition: transform 0.8s ease-in-out;
		box-shadow: 0 0.1rem 0.9rem rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.1);
	}

	.close {
		transform-origin: left center;
		transition: transform 0.8s ease-in-out;
		box-shadow: 0 0.1rem 0.9rem rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.1);
	}

	.btn-open {
		transform: translateY(-13px) scaleX(1.5);
		transition: transform 0.8s ease-in-out;
	}

	.create-password {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		width: 60%;
		height: 30px;
		background-color: #fff;
		border-radius: 10px;
	}

	.password-text {
		font-size: 14px;
		color: #bfbfbf;
		margin-left: 10px;
	}

	.show-password {
		font-size: 14px;
		font-weight: 500;
		color: #ff6d49;
		margin-left: 10px;
	}

	.backgroundColor {
		height: 100%;
		width: 100%;
		background-color: hsla(0, 0%, 60%, .5);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(20px);
		-webkit-transform: scale(1);
		z-index: 11;
	}
</style>
