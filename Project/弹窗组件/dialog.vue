<template>
  <div v-show="visible" class="">
    <div class="overlay" @click="onClickModal" />
    <div class="window" :style="{width: width, height: height, bottom: bottom}">
      <div v-show="title || $slots.title" class="header">
        <div v-if="title">{{ title }}</div>
        <div v-else>
          <slot name="title" />
        </div>
      </div>
      <!-- 主内容区域 -->
      <div class="content">
        <slot />
      </div>
      <!-- 底部按钮区域 需要slot自定义内容 -->
      <div class="footer">
        <slot name="footer" />
      </div>
      <!-- 底部导航区域 -->
      <div class="footer-nav">
        <slot name="footer-nav" />
      </div>
      <!-- 关闭按钮1 -->
      <div v-show="footerType === 'back'" class="footer-btn">
        <div class="goBack" @click="goBack">
          <i class="icon iconfont iconicon_back" />
          返回
        </div>
        <div class="goMain" @click="close">
          <i class="icon iconfont iconicon_home" />
          主屏幕
        </div>
      </div>
      <!-- 底部关闭 -->
      <div v-show="footerType === 'close'" class="close" @click="close">
        <i class="icon iconfont iconbtn_close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NtvDialog',
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '52.0833vw'
    },
    height: {
      type: String,
      default: '60%'
    },
    footerType: {
      type: String,
      default: 'close'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    beforeClose: Function
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      if (this.beforeClose) {
        this.beforeClose((next) => {
          next !== false && this.$emit('update:visible', false)
        })
      } else {
        try {
          this.$emit('update:visible', false)
        } catch (error) {

        }
      }
    },
    onClickModal () {
      if (this.closeOnClickModal === true && this.footerType !== 'close') this.close()
    },
    goBack () {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="scss" scoped>
.window {
  border: 1px solid var(--white-color); // 解决 border-radius 底部会出现白线问题
  z-index: 1052;
  position: fixed;
  bottom: 200px;
  left: 50%;
  font-size: 32px;
  background-color: var(--white-color);
  border-radius: 10px;
  transform: translate3d(-50%, 0, 0);
  backface-visibility: hidden;
  transition: 0.3s;
  transition-property: transform, opacity, -webkit-transform;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--colorF7F7F7);
  color: var(--black-color);
  height: 98px;
  line-height: 98px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  .dialog_title {
    color: var(--color000000);
  }
}

.content {
  flex: 1;
  overflow: auto;
}

.footer {
  text-align: center;
}
.footer-btn,
.footer-nav {
  position: absolute;
  bottom: 0;
  left: 50%;
  background: var(--white-color);
  border-radius: 50px;
  box-shadow: 0 0 10px 0 rgba(47, 63, 155, 0.6);
  transform: translate3d(-50%, 50%, 0);
  padding: 0 15px;

  display: flex;
  justify-content: space-around;
}

.footer-btn {
  div {
    margin: 10px 20px;
  }
  i {
    color: var(--color8D91A7);
    font-size: 36px;
    vertical-align: middle;
  }
}

.close {
  position: absolute;
  z-index: 10003;
  bottom: -150px;
  left: 50%;
  background: transparent;
  transform: translate3d(-50%, 0, 0);
  width: 100px;
  height: 100px;
  text-align: center;

  .icon {
    color: var(--white-color);
    font-size: 60px;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1051;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
