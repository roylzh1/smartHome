<template>
	<div class="time-picker">
		<div class="scroll-container">
			<div ref="hours" class="scroll-list" @wheel="handleScroll">
				<div v-for="hour in hours" :key="hour">{{ hour }}</div>
			</div>
		</div>
		<div class="scroll-container">
			<div ref="minutes" class="scroll-list" @wheel="handleScroll">
				<div v-for="minute in minutes" :key="minute">{{ minute }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		ref
	} from 'vue';

	export default {
		name: 'TimePicker',
		setup() {
			const hours = ref([...Array(24).keys()].map(i => i.toString().padStart(2, '0')));
			const minutes = ref([...Array(60).keys()].map(i => i.toString().padStart(2, '0')));

			const handleScroll = (event) => {
				event.preventDefault();
				const list = event.target;
				const itemHeight = list.children[0].offsetHeight;
				const distance = Math.round(event.deltaY / itemHeight);
				list.scrollTop += distance * itemHeight;
			};

			return {
				hours,
				minutes,
				handleScroll,
			};
		},
	};
</script>

<style>
	.time-picker {
		display: flex;
		justify-content: center;
	}

	.scroll-container {
		margin: 0 20px;
		height: 200px;
		overflow-y: auto;
		border: 1px solid #ccc;
	}

	.scroll-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
		font-size: 24px;
	}
</style>
