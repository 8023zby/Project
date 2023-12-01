export default {
  longpress: {
    bind: function (el, binding, vNode) {
      // el为长按对象（事件源）
      // binding 事件处理函数

      // 确保提供的表达式是函数，如果不是，将警告传给控制台
      if (typeof binding.value !== 'function') {
        // 获取组件名称
        const compName = vNode.context.name
        // 将警告传递给控制台
        let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `
        if (compName) { warn += `Found in component '${compName}' ` }

        console.warn(warn)
      }

      // 定义变量，计时器清空
      let pressTimer = null

      // 定义函数处理程序start
      // 创建计时器（ 1秒后执行函数 ）
      const start = (e) => {
        // 判断事件是否为click，e.button=0，则为左键，如果是click事件，或者不是按的左键（右键有默认行为），则直接return
        if (e.type === 'click' && e.button !== 0) {
          return
        }
        // 判断计时器是否为空
        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            // 执行事件处理函数
            handler()
          }, 1000)
        }
      }

      // 取消计时器
      const cancel = (e) => {
        // 检查计时器是否有值
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }

      // 运行函数
      const handler = (e) => {
        // 执行传递给指令的方法
        binding.value(el.dataset.id)
      }

      // 添加事件监听器
      el.addEventListener('mousedown', start)
      el.addEventListener('touchstart', start)

      // 取消计时器
      el.addEventListener('click', cancel)
      el.addEventListener('mouseout', cancel)
      el.addEventListener('touchend', cancel)
      el.addEventListener('touchcancel', cancel)
    }
  }
}
