<template>
  <div>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'">
        <el-amap-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :icon="icon_jg"
          :content="marker.warningStatus === '1' ? dom_jg_red : dom_jg"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon_jg: require("../../../assets/imgs/jg.png"),
      icon_jg_red: require("../../../assets/imgs/jg_red.png"),
      dom_jg:
        "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",
      dom_jg_red:
        "<img src='https://www.legendfly.site/image-shiding/pic_02.png' style='width:33px;height:33px;'></img>",
      markers: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let api = "/position/gisList";
      let params = {};
      this.$fetch.post(api).then(res => {
        this.markers = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
