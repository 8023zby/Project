<template>
  <input type="text" :name="name" class="softkeyboard_ipt" @focus="onKeyboardInputFocus" v-model="value" @click="onKeyboardInputClick" @blur="onKeyboardInputBlur">
</template>

<script >
export default {
  name: "softkeyboardInput",
  props: {
    emitter: {
      type: String,
      default: 'input'
    },
    value: {
      // eslint-disable-next-line
      type: String | Number,
      default: ''
    },
    keyboardShow: {
      type: Boolean
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showSelectPicker: false,
      keyboardData: {},
      selection: { // 光标位置
        start: 0,
        end: 0
      }
    };
  },
  beforeCreate () { },
  created () {
  },
  mounted () {
    if (!this.name) {
      throw Error('name不能为空，通van-field name的值');
    }
  },
  beforeDestroy () {
  },
  destroyed () { },
  methods: {
    /************************** 软键盘input模式 START*********************************/
    onKeyboardInputClick (e) { // 如果在已经聚焦的输入框内 点击移动光标 只会触发click
      this.onKeyboardInputFocus(e);
    },
    onKeyboardInputBlur (e) {
      if (this.keyboardShow) { // 如果键盘还显示着，那就focus输入框，有光标效果，并且保持原来的光标位置
        this.$nextTick(() => {
          this.needSetSelectionRange = true;
          e.target.focus();
        });
      } else { // 软键盘已经关闭了
        this.needSetSelectionRange = false;
        e.target.setAttribute('readonly', true); // 防止二次点击或者点击其他地方时 再弹出键盘
      }
    },
    onKeyboardInputFocus (e) { // focus 会触发click 但是click不会触发focus
      this.inputDom = e.target;

      if (this.needSetSelectionRange) {
        const start = this.selection.start;
        const end = this.selection.end;
        e.target.setSelectionRange(start, end); // 光标还要定位到原来的位置
        this.needSetSelectionRange = false;
      }
      // 阻止安卓默认键盘的弹出
      e.target.setAttribute('readonly', true);
      requestAnimationFrame(() => {
        e.target.removeAttribute('readonly');
      });

      this.selection.start = e.target.selectionStart;
      this.selection.end = e.target.selectionEnd;

      this.$emit('focus', this.name);
    },
    /************************** 软键盘input模式 END*********************************/
    input (value, type) {
      if (type === 'select') {
        this.$emit('input', this.name, value);
        this.selection.start += `${value}`.length;
        this.selection.end += `${value}`.length;
        this.$nextTick(() => {
          this.inputDom.setSelectionRange(this.selection.start, this.selection.end);
        });
      } else {
        const { start, end } = this.selection;
        const oldValue = this.value;
        let newValue = oldValue.substring(0, start) + value + oldValue.substring(end);
        newValue = this.enterNumberPoint2(newValue);
        this.$emit('input', this.name, newValue);

        this.selection.start += `${value}`.length;
        this.selection.end += `${value}`.length;
        this.$nextTick(() => {
          this.inputDom.setSelectionRange(this.selection.start, this.selection.end);
        });
      }
    },
    delete () {
      const value = this.value;
      if (!value) return;

      const { start, end } = this.selection;
      // eslint-disable-next-line
      if (start == 0 && end == 0) {
        return;
      }
      const val = value.substring(0, start - 1) + value.substring(end);
      this.$emit('input', this.name, val);
      this.selection.start -= 1;
      this.selection.end -= 1;
      this.$nextTick(() => { // 为了解决 长按触发删除按钮时，不会触发input框的blur事件，于是手动光标定位，并且确保在input框更新完值以后定位（不然会出现 光标先定位到最后位置 再跳到指定的位置的闪动）
        this.inputDom.setSelectionRange(this.selection.start, this.selection.end);
      });
    },
    //只能输入两位小数
    enterNumberPoint2 (value) {
      let newValue = value;
      let reg = new RegExp('^((?:(?:[1-9]{1}\\d*)|(?:[0]{1}))(?:\\.(?:\\d){0,2})?)(?:\\d*)?$'); //正则验证是否是数字(小数整数均可)
      let matchRes = `${value}`.match(reg);
      if (matchRes === null) { // 2..3 即不符合这个正则的，也就是不是正常的小数，会匹配到这里
        newValue = `${value}`.substring(0, value.length - 1);
      } else {
        //matchRes[0]是匹配的无限位的小数
        //matchRes[1]是小数点后两位前面符合的数值
        //如输入12.223 matchRes[0]是12.223 matchRes[1]12.22 此时input值改为matchRes[1]的值即可
        if (matchRes[1] !== matchRes[0]) {
          newValue = matchRes[1];
        }
      }
      return newValue;
    }
  }
};

</script>
<style lang="scss" scoped>
.softkeyboard_ipt{
  width: 100% !important;
}
.div_ipt{
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background: #f4f5f7;
  border-radius: 25px;
  padding-left: 20px;
  line-height: 28px;
  min-height: 40px;
}
</style>
