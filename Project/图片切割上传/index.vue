<template>
  <div>
    <v-upload-image :imageObj="imageObj.doorQrCode"></v-upload-image>
  </div>
</template>

<script>
import vUploadImage from "./CropperUploadImg.vue";
export default {
  components: { vUploadImage },
  data () {
    return {
			imageObj: {
        doorQrCode: {
					imglable: "",
          avatar: "avatar",
          imgType: "oldman",
          imageUrl: ""
				}
			},
    };
  },

  async mounted () {
  },
  watch: {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
