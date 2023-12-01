<!--
 * @Author: 汤艳玲
 * @Owner:
 * @Date: 2022-03-11 9:00:58
 * @LastEditTime: 2022-06-13 13:47:15
 * @LastEditors: 刘慧
 * @Description: 软键盘
 * @FilePath: \zhbf-bedhead-frontend\src\zhctbed\component\SoftKeyboard.vue
-->
<template>
  <van-number-keyboard id="softkeyboard" class="public-keyboard w animate__animated" v-model="value" :show="show" theme="custom" extra-key="." close-button-text=" " delete-button-text=" " :show-delete-key="true" :transition="true" @close="onClose" @blur="onBlur" @input="onInput" @delete="onDelete">
    <template v-slot:title-left>
      <div class="tl types" v-if="isShowShortcut">
        <span class="dis-i tc btn-key" v-for="(item, index) in kbData.attr.shortcut" :key="index" @click="onInput(item, kbData.field, 'select')">{{item}}</span>
      </div>
      <div class="tl extrakey" v-if="isShowExtra">
        <span class="dis-i tc btn-key btn-extra-key" v-for="(item, index) in kbData.attr.extra" :key="index" @click="onInput(item, keyboardData.field)">{{item}}</span>
      </div>
      <div class="abs flex-center control">
        <span class="dis-i img-change" @click="onChange" v-if="showChangeIcon"></span>
        <span class="dis-i img-pack" @click="onClose"></span>
      </div>
    </template>
  </van-number-keyboard>
</template>

<script>
import _ from "lodash";
export default {
  name: "softkeyboard",
  props: {
    keyboardData: {
      type: Object,
      default: () => ({
        field: "",
        type: "", //键盘的类型
        attr: {
          extra: [],
          shortcut: []
        },
        defaultValue: "" //初始默认值
      })
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyboardInit: true, // 键盘展示的原理：一直展示。外部控制显隐时，核心是应用animation动画 移动位置键盘位置，实现隐藏和弹出效果。有 从上往下收起的效果。为了防止进到页面时，出现收起的效果，通过这个属性进行控制不展示
      value: "",
      isShowExtra: false,
      isShowShortcut: false,
      isClosedByDone: false // 点击完成 会触发close事件 同时也会触发blur事件，想区分出 完成 和 blur，通过这个标识，如果通过完成触发了close事件，就阻止再次触发blur事件
    };
  },
  computed: {
    kbData() {
      const kbd = _.cloneDeep(this.keyboardData);
      kbd.attr = kbd.attr || {};
      const { extra, shortcut } = kbd.attr || {};
      kbd.attr.extra = extra || [];
      kbd.attr.shortcut = shortcut || [];
      return kbd;
    },
    showChangeIcon () { // 无快捷输入的软键盘即为 纯数字软键盘，隐藏切换入口
      return !!this.kbData.attr.extra.length || !!this.kbData.attr.shortcut.length;
    }
  },
  watch: {
    kbData() {
      this.isShowExtra = this.kbData.attr.extra.length !== 0;
      this.isShowShortcut = this.kbData.attr.shortcut.length !== 0;
    },
    show() {
      // 一旦开始受到外部控制，不隐藏软键盘
      this.keyboardInit = false;
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onInput(value, label, type) {
      this.$emit("handleInput", value, this.kbData.field, type);
    },
    onDelete(value) {
      this.$emit("handleDelete", this.kbData.field);
    },
    onClose() {
      this.$emit("handleClose", true); // true表示close  false表示blur
      this.isClosedByDone = true;
    },
    onBlur() {
      if (!this.isClosedByDone) {
        this.$emit("handleClose", false);
      }
      this.isClosedByDone = false;
    },
    onChange() {
      this.$emit("handleChange", this.kbData.field);
    }
  }
};
</script>

<style lang="scss">
@mixin calc-width($w) {
  width: $w;
}
@mixin calc-left($w) {
  left: (100vw - $w)/2 !important;
}
.keyboard-daping {
  @include calc-width(42vw);
  @include calc-left(42vw);
}
// 默认软键盘位置在底部，宽度为百分百
.public-keyboard.van-number-keyboard {
  bottom: 0;
  background: #dcdee6;
  left: 0;
  padding: 8px;
  .van-number-keyboard__title,
  .van-number-keyboard__body {
    display: flex;
    flex-direction: row;
    padding-right: 18%;
    height: 76px;
    .van-key,
    .btn-key {
      background-color: #fffffe;
      border-radius: 9px;
      box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
      color: #232324;
      font-size: 26px;
      min-width: 59px;
      height: 59px;
      line-height: 59px;
      margin: 8px;
    }
    .van-number-keyboard__sidebar {
      display: flex;
      width: 18%;
      height: 76px;
      .van-key--blue {
        background: linear-gradient(
          225deg,
          #5abdd1 0%,
          #4eaad6 39%,
          #527eda 100%
        );
        box-shadow: 0 3px 3px 0 rgba(81, 137, 217, 0.23);
        border-radius: 9px;
        color: #fff;
        font-size: 18px;
        padding: 0 22px;
      }
      .van-key--delete {
        padding: 0;
      }
      .van-key--blue::after,
      .van-key--delete::after {
        border-color: transparent;
        background-size: 100%;
        background-repeat: no-repeat;
        content: "";
        display: block;
        width: 80px;
        position: absolute;
        left: 4px;
        top: -16px;
      }
      .van-key--blue::after {
        background-image: url(../../assets/smms/img/zhctbed/skb-enter.svg);
      }
      .van-key--delete::after {
        background-image: url(../../assets/smms/img/zhctbed/skb-delete.svg);
        left: -9px;
      }
    }
  }
  .van-number-keyboard__title {
    min-height: 48px;
    height: auto;
    padding-right: 0;
    overflow: hidden;
    .van-number-keyboard__title-left {
      position: relative;
      width: 100%;
      .types,
      .extrakey {
        display: flex;
        width: calc(100% - 110px);
        height: 48px;
        overflow-x: auto;
      }
      .btn-extra-key,
      .btn-key {
        font-size: 19px;
        height: 32px;
        line-height: 32px;
      }
      .control {
        top: 0;
        right: 8px;
        height: 48px;
        > span {
          background-size: 100%;
          background-position: center;
          color: #000;
          width: 40px;
          height: 48px;
          margin-left: 5px;
          &.img-change {
            background-image: url(../../assets/smms/img/zhctbed/skb-change.svg);
          }
          &.img-pack {
            background-image: url(../../assets/smms/img/zhctbed/skb-pack.svg);
          }
        }
      }
    }
    &::after {
      border-top-width: 0;
    }
  }
}

//大屏
.public-keyboard.van-number-keyboard.keyboard-daping {
  border-radius: 9px;
  .van-number-keyboard__body {
    height: auto;
    flex-wrap: wrap;
    padding-right: 20%;
    .van-key {
      flex: none;
      min-width: 30px;
      width: 12.66%;
      height: 40px;
      line-height: 40px;
      &.van-key--extra {
        position: absolute;
        top: 0;
        right: 68px;
        width: 42px;
      }
    }
    .van-number-keyboard__sidebar {
      height: 110px;
      .van-key--delete {
        position: absolute;
        bottom: 0;
        left: -52px;
        width: 42px;
      }
      .van-key--blue {
        width: 58px;
        height: 96px;
        &::after {
          margin-top: 46px;
        }
      }
    }
  }
}

//手机  :TODO
.public-keyboard.van-number-keyboard.keyboard-mobile {
  border-radius: 9px;
  .van-number-keyboard__body {
  }
}
</style>
