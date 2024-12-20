import softkeyboardInput from './SoftKeyboardInput.vue';
import softkeyboard from './SoftKeyboard.vue';

let arr = ["infusion", "PPOF", "meanArterialPressure", "plasmaPenetrationPressure", "insulinDosage", "heartValve", "pneumothoraxCompressionArea"];
export default {
  name: 'calculator',
  mixins: [],
  components: { softkeyboard, softkeyboardInput },
  data () {
    return {
      keyboardShow: false,
      active: 0,
      keyboardData: {
        field: '',
        attr: {
          extra: [],
          shortcut: []
        },
        defaultValue: ''
      }
    };
  },
  computed: { },
  methods: {
    // 显示软键盘
    handleKeyboardShow (field) {
      this.$data.keyboardData = {
        field: field,
        type: "",
        attr: {
          extra: [],
          shortcut: []
        },
        defaultValue: ""
      };
      // 写法示例
      // if (field === "tiwen") {
      //   this.$set(this.$data.keyboardData, 'attr', {
      //     extra: ["."],
      //     shortcut: ["拒测", "外出", "请假", "不升"]
      //   });
      // }
      this.$data.keyboardShow = true;
    },
    // 关闭软键盘
    handleClose () {
      this.$data.keyboardShow = false;
    },
    // 输入键值
    handleInput (value, field, type) {
      this.$refs[field].input(value, type);
    },
    setValue (name, value) {
      let obj = this.$data[arr[this.$data.active]];
      obj[name] = value;
    },
    // 删除键值
    handleDelete (field) {
      let value = this.$data[arr[this.$data.active]][field];
      if (value) {
        this.$refs[field].delete();
      }
    }
  }
};
