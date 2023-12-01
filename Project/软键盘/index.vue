<template>
  <section class="h dis-flex dis-flex-center">
    <van-field name="infusionTotal" label="输液总量：" type="tel" v-model="infusion.infusionTotal">
        <!-- 注意 ref和name一定要写，值同van-field name，value同van-field v-model的值 -->
        <template #input>
          <softkeyboard-input ref="infusionTotal" name="infusionTotal" :value="infusion.infusionTotal" :keyboardShow="keyboardShow" @input="setValue" @focus="handleKeyboardShow" />
        </template>
        <template #button>
          <span class="txt">ml</span>
        </template>
      </van-field>
      <!-- 软键盘 -->
      <softkeyboard :keyboardData="keyboardData" :show="keyboardShow" @handleInput="handleInput" @handleDelete="handleDelete" @handleClose="handleClose">
      </softkeyboard>
  </section>
</template>

<style lang="scss" scoped>
/deep/ .van-field__control{
  width: 66%;
}
</style>
<script src="./index.js"></script>
