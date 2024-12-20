<template>
  <!--医护排班-->
  <div id="conId" class="container yhpb-container">
    <div v-for="(itemChild,key) in arr" :key="key" v-longpress="longpress" class="doctor positionRe" :data-id="itemChild.id">
      长按
    </div>
  </div>
</template>

<script>

export default {
  name: 'DoctorScheduling',
  components: {
  },
  data () {
    return {
      arr: [{
        id: 1
      }],
      curId: ''
    }
  },
  watch: {},
  activated () {
  },
  mounted () { },
  destroyed () {
  },
  methods: {
    longpress (id) {
      this.curId = id
    }
  }
}
</script>
