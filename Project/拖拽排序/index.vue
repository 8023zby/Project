<template>
  <div class="container">
    <draggable v-model="data" chosen-class="chosen" animation="300" delay="300" :scroll="true" force-fallback="true" group="people" @update="onEnd">
      <transition-group>
        <template v-for="(item, index) in data">
          <div :key="index" class="tit">
            {{ item.name }}{{ item.sex }}
          </div>
        </template>
      </transition-group>
    </draggable>

  </div>
</template>

<script>

import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data () {
    return {
      data: [{
        name: 1,
        sex: 1
      }, {
        name: 2,
        sex: 2
      }, {
        name: 3,
        sex: 3
      }]
    }
  },
  mounted () {

  },
  created () {
    this.setcolor = this.globalConfig ? this.globalConfig.labelColor : {}
  },
  methods: {
    // 拖拽结束事件
    onEnd (e) {
      console.log(this.data, '=====')
    }
  }
}
</script>
