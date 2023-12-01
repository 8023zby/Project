// import { gsap } from "gsap";

import $ from "jquery";
export default class Scroll {
  constructor() {
		this.observe = null
		this.animation = null
		this.timer = null
	}

  /**
   * 无缝滚动
   *
   * @param {HTMLElement} container - 容器元素。
   * @param {object} options - 选项对象。
   * @param {string} options.direction - 容器的方向: 'horizontal' 或 'vertical'。
   * @param {number} options.speed - 容器的速度。
   * @return {undefined} 没有返回值。
   */
  sameless(container, { direction, speed, timeout }) {
		// 禁止手动滚动
		container.style.overflow = "hidden";
    // 获取容器高度
    const scrollInner = $(container).find(".scroll-inner")[0];

    // 创建一个新的 MutationObserver 实例
    this.observer = new MutationObserver((mutationsList, observer) => {
			this.clearTimer()
			this.verticalSameless(container, scrollInner, { direction, speed });
			this.horizontalSameless(container, scrollInner, { direction, speed });
    });

    // 配置并启动观察
    this.observer.observe(scrollInner, { childList: true, subtree: true, characterData: true });

		this.verticalSameless(container, scrollInner, { direction, speed });
		this.horizontalSameless(container, scrollInner, { direction, speed });

		this.onTouchStart(container, {timeout})

  }

	horizontalSameless(container, inner, { direction, speed }) {
		if(direction !== "horizontal") return
		// 停止动画
		this.clearAnimation()
		if (container.clientWidth >= inner.scrollWidth) {
			$(container).find('.hiddenContainer').css('display', 'none')
			return;
		} 

		$(container).find('.hiddenContainer').css('display', 'block')
		const scrollArea = $(container).find(".scroll-area")
		scrollArea.css({
			display: "flex",
			flexWrap: "nowrap"
		})

		this.addSamelessAnimation(scrollArea[0], {direction, speed, distance: inner.scrollWidth})
	}

	verticalSameless(container, inner, { direction, speed }) {
		if(direction !== "vertical") return
		// 停止动画
		this.clearAnimation()
		if (container.clientHeight >= inner.clientHeight) {
			$(container).find('.hiddenContainer').css('display', 'none')
			return
		}
		$(container).find('.hiddenContainer').css('display', 'block')
		const scrollArea = $(container).find(".scroll-area")
		this.addSamelessAnimation(scrollArea[0], {direction, speed, distance: inner.clientHeight})
		// const t = gsap.timeline();
		// t.to(scrollArea[0], {
		// 	duration: 5,
		// 	y: -inner.clientHeight,
		// 	repeat: -1,
		// 	ease: "none",
		// })
	}

	addSamelessAnimation(dom, { direction, speed, distance }) {
		if(!speed) throw new Error("scroll组件 speed不能为空");
		if(!distance) throw new Error("scroll组件 distance不能为空");
		const time = distance / speed
		this.animation = dom.animate([
			{
				transform: `translate3d(0, 0, 0)`
			},
			{
				transform: direction === 'vertical' ? `translate3d(0, -${distance}px, 0)` : `translate3d(-${distance}px, 0, 0)`
			}
		], {
			duration: time * 1000,
			easing: 'linear',
			iterations: Infinity,
		})
	}

	switchScreen(container, { direction, speed, interval, easing, timeout }) {

		// 禁止手动滚动
		container.style.overflow = "hidden";

		const scrollInner = $(container).find(".scroll-inner")[0];

		// 创建一个新的 MutationObserver 实例
    this.observer = new MutationObserver((mutationsList, observer) => {
			this.clearTimer()
			this.verticalSwitchScreen(container, scrollInner, { direction, speed, interval, easing });
			this.horizontalSwitchScreen(container, scrollInner, { direction, speed, interval, easing });
    });

    // 配置并启动观察
    this.observer.observe(scrollInner, { childList: true, subtree: true, characterData: true });

		this.verticalSwitchScreen(container, scrollInner, { direction, speed, interval, easing });
		this.horizontalSwitchScreen(container, scrollInner, { direction, speed, interval, easing });

		this.onTouchStart(container, {timeout})
	}

	verticalSwitchScreen(container, inner, { direction, speed, interval, easing }) {
		if(direction !== "vertical") return
		this.clearAnimation()
		if(container.clientHeight >= inner.clientHeight) {
			$(container).find('.hiddenContainer').css('display', 'none')
			return
		}
		$(container).find('.hiddenContainer').css('display', 'block')
		const count = Math.ceil(inner.clientHeight / container.clientHeight);
		const gap = container.clientHeight - inner.clientHeight % container.clientHeight;
		const scrollArea = $(container).find(".scroll-area")
		$(inner).css({
			"margin-bottom": `${gap}px`
		})
		
		this.addSwitchAnimate(scrollArea[0], {direction, speed, distance: container.clientHeight, count, interval, easing})
	}

	horizontalSwitchScreen(container, inner, { direction, speed, interval }) {
		if(direction !== "horizontal") return
		this.clearAnimation()
		if(container.clientWidth >= inner.scrollWidth) {
			$(container).find('.hiddenContainer').css('display', 'none')
			return
		}
		$(container).find('.hiddenContainer').css('display', 'block')
		const count = Math.ceil(inner.scrollWidth / container.clientWidth)
		const gap = container.clientWidth - inner.scrollWidth % container.clientWidth
		const scrollArea = $(container).find(".scroll-area")
		scrollArea.css({
			display: "flex",
			flexWrap: "nowrap"
		})
		$(inner).css({
			"margin-right": `${gap}px`
		})

		this.addSwitchAnimate(scrollArea[0], {direction, speed, distance: container.clientWidth, count, interval})
	}

	addSwitchAnimate(dom, { direction, speed, distance, count, easing="linear", interval }) {
		if(!speed) throw new Error("scroll组件 speed不能为空");
		if(!distance) throw new Error("scroll组件 distance不能为空");
		if(!count) throw new Error("scroll组件 count不能为空");
		const time = (interval + distance / speed * 1000) * count
		const keyFrames = []
		const intervalStep = interval / time
		const scrollStep = distance / speed * 1000 / time
		for (let i = 0; i <= count; i++) {
			const intervalOffset = intervalStep * i + scrollStep * i
			const scrollOffset = intervalStep * (i + 1) + scrollStep * i
			keyFrames.push({
				transform: direction === 'vertical' ? `translate3d(0, -${i * distance}px, 0)` : `translate3d(-${i * distance}px, 0, 0)`,
				offset:  intervalOffset
			})
			if(i < count) {
				keyFrames.push({
					transform: direction === 'vertical' ? `translate3d(0, -${i * distance}px, 0)` : `translate3d(-${i * distance}px, 0, 0)`,
					offset: scrollOffset
				})
			}
		}
		this.animation = dom.animate(keyFrames, {
			duration: time,
			easing: easing,
			iterations: Infinity,
		})
	}

	onTouchStart(container, {timeout = 3000}) {
		container.addEventListener('touchstart', (e) => {
			this.animation && this.animation.pause()
			this.clearTimer()
			this.timer = setTimeout(() => {
				this.clearTimer()
				this.animation && this.animation.play()
			}, timeout)
		})
	}

	
	clearAnimation() {
		if(this.animation) {
			this.animation && this.animation.pause()
			this.animation && this.animation.cancel()
			this.animation = null
		}
	}

	clearTimer() {
		if(this.timer) {
			clearTimeout(this.timer)
			this.timer = null
		}
	}

	dispose() {
		this.observe && this.observe.disconnect();
		this.clearAnimation();
		this.clearTimer();
	}
}
