<template>
  <div class="container">
    <vantTime :title="'选择日期'" :left-right-arrow="true" :max-date="maxDate" :label-width="'8vw'" @checkDate="getData" @changeDate="getData" />
  </div>
</template>

<script>

export default {
  components: {
    'vantTime': () => import('./vant-time')
  },
  data () {
    return {
      maxDate: new Date(),
      Time: ''
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    getData (date) {
      date && (this.Time = date)
    }
  }
}
</script>
