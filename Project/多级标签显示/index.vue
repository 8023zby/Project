<template>
  <div :id="'cintainer' + curPosition" class="labelPart" style="height: 100%;">
    <scroll :speed="20">
      <ul :id="'ulDocument' + curPosition">
        <template v-for="(item,index) of levelTree.children">
          <div :id="'li_one_title_' + index + '_' + curPosition" :key="index" style="display: flex;" class="li_one_title" :class="{'aaa': getUlHeight(index)}">
          </div>
        </template>
      </ul>
    </scroll>
  </div>
</template>

<script>

import $ from "jquery";

class TreeNode {
  constructor (value) {
    this.value = value
    this.children = []
    this.labels = []
  }

  addChild (child) {
    this.children.push(child)
  }

  findChild (name) {
    return this.children.find(v => v.value === name)
  }

  addLabels (label) {
    this.labels.push(label)
  }
}
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      labelDataVal: [],
      levelTree: {}
    }
  },
  mounted () {
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData () {
      const P = {}
      Api.select(P).then(res => {
        this.labelDataVal = [...res.data]
        this.treeDel()
      }).catch(res => {
        this.$toast(labelObj.classFlag + ' 数据出现异常请联系管理员')
      })
    },
    treeDel () {
      // 创建树
      this.levelTree = new TreeNode('root')

      console.log('this.labelDataVal', this.levelTree)

      this.createTeenode()
    },
    createTeenode () {
      for (let i = 0; i < this.labelDataVal.length; i++) {
        const labelNameArr = this.labelDataVal[i].labelName.split(window.lableTypeDelimiter)
        this.nodeDel(labelNameArr, this.levelTree, this.labelDataVal[i])
      }
    },
    nodeDel (arr, parent, val) {
      if (!arr || !arr.length) return
      const item = arr.shift()
      const child = parent.findChild(item)
      if (child) {
        this.nodeDel(arr, child, val)
      } else {
        const newNode = new TreeNode(item)
        if (arr.length === 0) {
          newNode.addLabels(val)
        }
        parent.addChild(newNode)

        this.nodeDel(arr, newNode, val)
      }
    },
    // 滚动起来并且是最后一个时增加下边框分开
    getUlHeight (index) {
      if (index !== this.levelTree.children.length - 1) {
        return false
      }
      this.$nextTick(() => {
        const container = $('#cintainer' + this.curPosition)[0]
        const ulDocument = $('#ulDocument' + this.curPosition)[0]
        if ((ulDocument.offsetHeight > container.offsetHeight) && (index === this.levelTree.children.length - 1)) {
          $('#li_one_title_' + index + '_' + this.curPosition).addClass('borderBottom')
        } else {
          $('#li_one_title_' + index + '_' + this.curPosition).removeClass('borderBottom')
        }
      })
    }
  }
}
</script>
