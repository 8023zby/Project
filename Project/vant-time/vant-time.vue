<template>
  <div>
    <span v-if="leftRightArrow" class="triangle-left" @click="changeDate(-1)" />
    <van-popover v-model="showPopover" trigger="click" placement="top-end">
      <van-datetime-picker
        v-model="value1"
        :style="'width:' + width"
        type="date"
        :confirm-button-text="''"
        :cancel-button-text="''"
        :item-height="itemHeight"
        visible-item-count="5"
        :min-date="minDate"
        :max-date="maxDate"
      >
        <slot name="default">
          <div class="textAlignC w-100 fontSize28">{{ title }}</div>
        </slot>

      </van-datetime-picker>
      <template #reference>
        <van-field
          :style="{'border': border ? ' 0.10417vw solid ' + border : 'none','border-radius': border ? '00.26042vw' : '','width': labelWidth} "
          input-align="center"
          readonly
          clickable
          class="fontSize24"
          name="datetimePicker"
          :value="targetDate"
          label=""
          placeholder="点击选择时间"
        />
      </template>

      <div class="border-solid timeBtnContainer">
        <div class="textAlignC cnacelBtn" @click="showPopover = false">取消</div>
        <div class="textAlignC confirmBtn" @click="checkDate">确定</div>
      </div>

    </van-popover>

    <span v-if="leftRightArrow" class="triangle-right" @click="changeDate(1)" />
  </div>

</template>

<script>
/**
 * 时间查询，支持上一日下一日===20210512--yxb
 */
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
  name: 'VantTime',
  components: {

  },
  props: {
    title: { // 时间选择标题
      type: String,
      default: function () {
        return ''
      }
    },
    width: { // 传以vm为单位数据
      type: String,
      default: function () {
        return '33.85417vw'
      }
    },
    itemHeight: { // 选项高度
      type: String,
      default: function () {
        return '3.125vw'
      }
    },
    leftRightArrow: { // 是否需要左右日期切换
      type: Boolean,
      default: function () {
        return true
      }
    },
    minDate: {
      type: Date,
      default: function () {
        return new Date(dayjs(this.serverTime).year() - 1, 0, 1)
      }
    },
    maxDate: {
      type: Date,
      default: function () {
        return new Date(dayjs(this.serverTime).year() + 1, 11, 31)
      }
    },
    border: { // 传入颜色，显示边框
      type: String,
      default: function () {
        return ''
      }
    },
    labelWidth: {
      type: String,
      default: function () {
        return '10vw'
      }
    }
  },
  data () {
    return {
      startYear: 2020,
      showPopover: false,
      value1: new Date(),
      targetDate: dayjs(this.serverTime).subtract(0, 'days').format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters(['serverTime']) // 通过服务器发来的时间
  },
  watch: {

  },
  created () {

  },
  beforeDestroy () {

  },
  methods: {
    checkDate () {
      this.showPopover = false
      this.targetDate = dayjs(this.value1).format('YYYY-MM-DD')
      this.$emit('checkDate', this.targetDate)
    },
    changeDate (day) {
      const d = new Date(this.targetDate)
      d.setDate(d.getDate() + day)

      this.targetDate = dayjs(d).format('YYYY-MM-DD')

      this.$emit('changeDate', this.targetDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.timeBtnContainer {
  display: flex;
    height: 70px;
    align-items: center;
}

.confirmBtn {
  padding: 20px;
  flex: 1;
  color: var(--color);
  font-size: 24px;
}

.cnacelBtn {
  font-size: 24px;
  border-right: 1px solid var(--colorD8D8D8);
  flex: 1;
  padding: 20px;
}

.triangle-left {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-right: 16px solid var(--color);
  border-bottom: 8px solid transparent;
  margin-right: 15px;
}
.triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-left: 16px solid var(--color);
  border-bottom: 9px solid transparent;
  margin-left: 15px;
}

// 修改时间 默认字号大小
/deep/.van-picker-column {
  font-size: 24px;
}

/deep/.van-picker-column__item--selected {
  color:var(--color) !important;
}

/deep/.van-picker__toolbar {
  height: 80px;
}

</style>
