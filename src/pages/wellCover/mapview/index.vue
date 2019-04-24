<template>
<div class="page">
    <div class="page-title">设备分部</div>
    <div class="page-content">
        <el-amap v-if="mapCenter.length>0" class="amap-box" vid="device-map-view" :center="mapCenter" :zoom="12">
            <el-amap-marker v-for="(marker, index) in markers" :key="index" :vid="marker.id" :position="[marker.amapLongitude,marker.amapLatitude]" :content="marker.isWarning ? dom_jg_red : dom_jg" :offset="[-16,-14]" :events="{click: () => {
                  handleMarker(marker);
                }}"></el-amap-marker>
            <el-amap-info-window :position="windowDom.position" :visible="windowDom.visible" :content="windowDom.content" :offset="[0,-5]" :events="{close: () => {
                  closeWindow();
                }}"></el-amap-info-window>
        </el-amap>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            mapCenter: [],
            dom_jg: "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",
            dom_jg_red: "<img src='https://www.legendfly.site/image-shiding/pic_02.png' style='width:33px;height:33px;'></img>",
            markers: [],
            deviceInfo: {},
            windowDom: {
                position: [121.605699, 31.169571],
                visible: false,
                content: "<div class='prompt'>demo</div>"
            } // 窗体
        };
    },
    mounted() {
        this.getDeviceMap();
        this.getLocation();
    },
    methods: {
        // 根据IP定位，设置地图中心点
        getLocation() {
            axios
                .get(
                    "https://restapi.amap.com/v3/ip?output=json&key=7af099c49bc59b423c4998a8bc01706b"
                )
                .then(res => {
                    if (res.infocode === "10000") {
                        let a = res.rectangle.split(";");
                        let a1 = a[0].split(",");
                        let a2 = a[1].split(",");
                        let lng = (parseFloat(a1[0]) + parseFloat(a2[0])) / 2;
                        let lat = (parseFloat(a1[1]) + parseFloat(a2[1])) / 2;
                        this.mapCenter = [lng, lat];
                    }
                });
        },
        getDeviceMap() {
            let api = "wellCoverDevice/getDeviceMap";
            // let params = {};
            this.$fetch.post(api).then(res => {
                this.markers = res.data;
            });
        },
        async getDeviceById(id) {
            let api = `/wellCoverDevice/getDeviceById/${id}`;
            let res = await this.$fetch.post(api);
            if (res.code === 10000) {
                this.deviceInfo = res.data;
            } else {
                this.$message({
                    message: res.message,
                    type: "error"
                });
            }
        },
        handleMarker(device) {
            this.windowDom.visible = false;
            this.windowDom.position = [device.amapLongitude, device.amapLatitude];
            this.getDeviceById(device.id).then(() => {
                this.windowDom.content = `<strong>IMEI：${
          this.deviceInfo.deviceInfo.imei
        }</strong><br/><hr/><p class="my-desc"><strong>状态：${this.$options.filters[
          "wallCover_toWaringStarus"
        ](
          this.deviceInfo.deviceProps.warningStatus
        )}</strong> <br/> <strong>设备名称：</strong>${
          this.deviceInfo.deviceInfo.deviceName
        }<br/> <strong>地址：</strong>${
          this.deviceInfo.deviceInfo.address
        }</p>`;
                this.windowDom.visible = true;
            });
        },
        closeWindow() {
            this.windowDom.visible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.amap-box {
    width: 100%;
    height: 81vh;
}
</style>
