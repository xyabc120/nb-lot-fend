<template>
  <div class="page">
    <div class="page-title">设备编辑</div>
    <div class="page-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">基本信息</div>
          <el-form :model="device" :rules="rules" ref="ruleForm" label-width="90px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="imei" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备名称" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备型号" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="安装人员" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="使用单位" prop="userName">
                  <el-input v-model="device.imei"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同状态" prop="userName">
                  <el-select v-model="device.userType" placeholder="请选择合同状态" style="width:100%;">
                    <el-option label="试用" :value="1"></el-option>
                    <el-option label="正式" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="接入运营商" prop="userName">
                  <el-select v-model="device.userType" placeholder="请选择运营商" style="width:100%;">
                    <el-option
                      v-for="(platform, index) in platformList"
                      :key="index"
                      :label="platform.name"
                      :value="platform.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="userName">
                  <el-input type="textarea" :rows="4" v-model="device.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>

        <el-col :span="12">
          <div class="title">GIS信息</div>
          <div class="amap-page-container mb20">
            <el-amap
              v-if="mapCenter.length>0"
              ref="map"
              vid="amapDemo"
              :amap-manager="amapManager"
              :center="mapCenter"
              :zoom="zoom"
              :plugin="plugin"
              :events="events"
              class="amap-demo"
            >
              <el-amap-marker
                v-if="device.postion.length>0"
                :position="device.postion"
                :content="dom_jg"
                :animation="'AMAP_ANIMATION_DROP'"
                :offset="[-16,-14]"
              ></el-amap-marker>
            </el-amap>
          </div>
          <el-form :model="device" :rules="rules" ref="ruleForm" label-width="50px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="经度" prop="userName">
                  <el-input v-model="device.postion[0]" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="纬度" prop="userName">
                  <el-input v-model="device.postion[1]" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址" prop="userName">
                  <el-input v-model="device.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" class="mt20">
          <el-form :model="device" :rules="rules" ref="ruleForm" label-width="90px">
            <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
import axios from "axios";
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      rules: {},
      platformList: [],
      device: {
        id: "", // 	id	唯一标识
        imei: "", // 	设备编号
        deviceName: "", // 	设备名称
        address: "", // 	地址
        deviceStatus: "", // 	设备状态	(0:离线，1:在线)
        platform: "", // 	接入运营商
        createDate: "", // 	创建日期
        lastConnetTime: "", // 	最后在线时间
        postion: [], // 	位置	[31.345654,121.2323]
        installer: "", // 	安装人员
        deviceNo: "", // 	设备型号
        contacts: "", // 	联系人
        remark: "", // 	备注
        useGroup: "", // 	使用单位
        contractStatus: "" // 	合同状态
      },

      markers: [],
      icon_jg: require("../../../assets/imgs/jg.png"),
      dom_jg:
        "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",

      amapManager,
      zoom: 12,
      mapCenter: [],
      events: {
        init: o => {
          // console.log(o.getCenter());
          // console.log(this.$refs.map.$$getInstance());
          o.getCity(result => {
            // console.log(result);
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          this.setPostion(e.lnglat.lng, e.lnglat.lat);
          this.getAddress(e.lnglat.lng, e.lnglat.lat);
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              // console.log(o);
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.getLocation();
    this.getPlatforms();
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

    // 地图上选择井盖点位置
    setPostion(lng, lat) {
      this.device.postion = [lng, lat];
    },
    // 通过 经纬度获取 地址详情
    getAddress(lng, lat) {
      axios
        .get(
          `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&poitype=号&key=7af099c49bc59b423c4998a8bc01706b&radius=1000&extensions=all`
        )
        .then(res => {
          if (res.infocode === "10000") {
            this.device.address = res.regeocode.formatted_address;
          }
        });
    },

    // 获取运营商
    getPlatforms() {
      let api = "/common/getPlatforms";
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.platformList = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 15px;
  font-weight: 600;
  font-family: Extra large;
  line-height: 40px;
  color: #2d3e50;
}
.amap-page-container {
  height: 280px;
}
</style>
