<template>
  <Dialog :visible.sync="visibleVal" title="选择床位" :before-close="close" :width="width" :height="height">
    <div class="bedList">
      1
    </div>
    <div slot="footer" class="footer">
      <van-button type="primary" @click="saveBed">确认</van-button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from './dialog'
export default {
  components: {
    Dialog
  },
  props: {
    visibleVal: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  mounted () { },
  created () { },
  destroyed () { },
  methods: {
    close () {
      this.$emit('update:visibleVal', false)
    },
    saveBed () {}
  }
}
</script>
