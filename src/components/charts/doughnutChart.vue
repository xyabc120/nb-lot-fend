<template>
  <v-chart :options="option"/>
</template>
<script>
export default {
  name: "doughnutChart",
  props: ["chartId", "title", "dataSet"],
  data() {
    return {
      option: {
        title: {
          text: this.title,
          textStyle: { color: "#3CBFA6", fontSize: 15 }
        },
        color: ["#43D3B1", "#FCC687", "#09BDFE"],
        textStyle: {
          height: "30px",
          width: "30px"
        },
        tooltip: {
          trigger: "item",
          position: "right",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            center: ["55%", 75],
            radius: ["50%", "60%"],
            label: { fontSize: 9 },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.dataSet
          }
        ]
      }
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
