<template>
  <div class="device">
    <div class="device-info">
      <el-row :gutter="1">
        <el-col :span="16">
          <div class="card h260">
            <div class="card-title">{{device.deviceInfo.imei}}</div>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">设备(imei):</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.imei}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">设备名称:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.deviceName}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">设备型号:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.deviceNo}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">安装人员:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.installer}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">使用单位:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.useGroup}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">合同状态:</el-col>
                  <el-col
                    :span="18"
                    class="value"
                  >{{device.deviceInfo.contractStatus | toContractStatus}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">创建时间:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.createTime}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">接入运营商:</el-col>
                  <el-col :span="18" class="value">{{device.deviceInfo.platform | formatPlatform}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">归属运营商:</el-col>
                  <el-col :span="18" class="value">{{device.sim.belongPlatform | formatPlatform}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">激活日期:</el-col>
                  <el-col :span="18" class="value">{{device.sim.activeDate}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">有效期至:</el-col>
                  <el-col :span="18" class="value">{{device.sim.endDate}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">卡编号:</el-col>
                  <el-col :span="18" class="value">{{device.sim.imsi}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="line"></div>
            <el-row class="mt20">
              <el-col :span="2" class="lable">备注:</el-col>
              <el-col :span="22" class="value">{{device.deviceInfo.remark}}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card h260">
            <div class="card-title">状态信息</div>
            <el-row class="mt20">
              <el-col :span="6" class="lable" style="line-height:32px;">设备状态:</el-col>
              <el-col :span="18" class="value">
                <el-tag
                  :type="device.deviceInfo.deviceStatus ? 'primary' : 'warning'"
                  disable-transitions
                >{{device.deviceInfo.deviceStatus | toDeviceStatus}}</el-tag>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="6" class="lable">最后链接时间:</el-col>
              <el-col :span="18" class="value">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{device.deviceInfo.lastConnetTime}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="device-info mt20">
      <el-row :gutter="1">
        <el-col :span="24">
          <div class="card h150">
            <div class="card-title">属性信息</div>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">告警状态:</el-col>
                  <el-col
                    :span="18"
                    class="value"
                  >{{device.deviceProps.warningStatus | wallCover_toWaringStarus}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">信号强度:</el-col>
                  <el-col :span="18" class="value">{{device.deviceProps.signalStrength}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">亮度值:</el-col>
                  <el-col :span="18" class="value">{{device.deviceProps.brightness}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">电池电压:</el-col>
                  <el-col :span="18" class="value">{{device.deviceProps.battery}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">水位距离:</el-col>
                  <el-col :span="18" class="value">{{device.deviceProps.waterLevel}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="6" class="lable">是否倾斜:</el-col>
                  <el-col :span="18" class="value">{{device.deviceProps.isTilt}}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="device-info mt20">
      <el-row :gutter="1">
        <el-col :span="24">
          <div class="card h260">
            <div class="card-title">位置信息</div>
            <el-amap
              class="amap-box"
              :vid="'amap'+new Date()"
              :zoom="18"
              :center="device.deviceInfo.postion"
            >
              <el-amap-marker
                :position="device.deviceInfo.postion"
                :content="dom_jg"
                :animation="'AMAP_ANIMATION_DROP'"
                :offset="[-16,-14]"
                :events="{click: () => {
                  handleMarker();
                }}"
              ></el-amap-marker>
              <el-amap-info-window
                :position="windowDom.position"
                :visible="windowDom.visible"
                :content="windowDom.content"
                :offset="[0,-5]"
                @close="closeWindow()"
              ></el-amap-info-window>
            </el-amap>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Device",
  data() {
    return {
      dom_jg:
        "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",
      windowDom: {
        position: [121.605699, 31.169571],
        visible: false,
        content: "<div class='prompt'>demo</div>"
      }, // 窗体

      device: {
        deviceInfo: {
          id: null, //	id
          imei: "1234567654321", //	设备编号
          deviceName: "测试井盖", //	设备名称
          address: "上海市浦东新区张江科技园", //	地址
          deviceStatus: "在线", //	设备状态
          platform: "电信物联网平台", //	接入运营商
          createDate: "2019-04-03", //	创建日期
          lastConnetTime: "2019-04-04 21:37:27", //	最后在线时间
          postion: [121.605699, 31.169571], //	位置
          installer: "建华", //	安装人员
          deviceNo: "NO.879HVCT", //	设备型号
          contacts: "蔡老板", //	联系人
          remark:
            "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。", //	备注
          useGroup: "契通集团", //	使用单位
          contractStatus: "已签约" //	合同状态
        },
        deviceProps: {
          battery: "3.5V", //	电量
          waterLevel: "2000 MM", //	水位
          brightness: "500 cd/m2", //	亮度
          isTilt: "未发生倾斜", //	是否倾斜
          signalStrength: "正常", //	信号强度
          warningStatus: "正常" //	告警状态
        },
        sim: {
          imsi: "892737237988283982389899", // 	编号
          belongPlatform: "电信", // 	归属运营商
          activeDate: "2019-01-01", // 	激活日期
          endDate: "2019-12-31" // 	有效期
        }
      }
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.getDeviceById(this.id);
  },
  methods: {
    toWaringStarus(code) {
      switch (code) {
        case 0:
          return "正常";
        case 2:
          return "信号弱";
        case 3:
          return "倾斜大";
        case 4:
          return "水位高";
        case 5:
          return "亮度高";
        case 6:
          return "电量低";
        default:
          return "";
      }
    },
    getDeviceById(id) {
      let api = `/wellCoverDevice/getDeviceById/${id}`;
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.device = { ...res.data };
          this.device.deviceInfo.postion = [
            this.device.deviceInfo.amapLongitude,
            this.device.deviceInfo.amapLatitude
          ];
          console.log(this.device);
        }
      });
    },
    handleMarker() {
      this.windowDom.position = this.device.deviceInfo.postion;
      this.windowDom.content = `<strong>IMEI：${
        this.device.deviceInfo.imei
      }</strong><br/><hr/><p class="my-desc"><strong>状态：${this.toWaringStarus(
        this.device.deviceInfo.deviceStatus
      )}</strong> <br/> <strong>设备名称：</strong>${
        this.device.deviceInfo.deviceName
      }<br/> <strong>地址：</strong>${this.device.deviceInfo.address}</p>`;
      this.windowDom.visible = !this.windowDom.visible;
    },
    closeWindow() {
      this.windowDom.visible = !this.windowDom.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 4px;
  padding: 0 10px;
  .card-title {
    font-size: 18px;
    font-weight: 600;
    font-family: Extra large;
    line-height: 40px;
    color: #2d3e50;
  }
  .line {
    height: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .lable {
    color: #888888;
    font-weight: 400;
  }
  .value {
    color: #2d3e50;
    font-weight: 500;
  }
  .amap-box {
    width: 100%;
    height: 200px;
  }
}
</style>
