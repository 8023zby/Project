<template>
	<div ref="wrap" class="scroll-wrap">
		<div class="scroll-area">
			<div class="scroll-inner mainContainer">
				<slot />
			</div>
			<div class="scroll-inner hiddenContainer" style="display: none;">
				<slot />
			</div>
		</div>
	</div>
</template>
<script>
import Scroll from "./scroll.js"
export default {
	data() {
		return {
			scrolljs: new Scroll()
		}
	},
	props: {
		speed: { // 1 秒 滚动 多少 px
			type: Number,
			default: 100,
		},
		direction: { // 方向 "vertical 纵向" "horizontal 横向"
			type: String,
			default: "vertical",
		},
		type: { // sameless 无缝滚动 switch 切换滚动
			type: String,
			default: "sameless", 
		},
		interval: { // 间隔时间 单位ms
			type: Number,
			default: 1000,
		},
		easing: { // easing 
			type: String,
			default: "linear",
		},
		timeout: { // 触摸动画停止，间隔多少秒之后再度开始 单位ms
			type: Number,
			default: 3000,
		}
	},
	created() {
		
	},
	mounted() {
		this.init()
	},
	beforeDestroy() {
		this.scrolljs.dispose()
	},
	methods: {
		// 获取容器组件
		init() {
			let dom = this.$refs.wrap
			this.type === 'sameless' 
				? this.scrolljs.sameless(dom, {direction: this.direction, speed: this.speed, timeout: this.timeout})
				: this.scrolljs.switchScreen(dom, {direction: this.direction, speed: this.speed, interval: this.interval, easing: this.easing, timeout: this.timeout})
			// return this.$refs.wrap;
		}
	}
}
</script>
<style lang="scss" scoped>
.scroll-wrap{
	width: 100%;
	height: 100%;
}
</style>