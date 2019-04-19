<template>
  <div class="page">
    <div class="page-title">创建工单</div>
    <div class="page-content">
      <el-row :gutter="20">
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <el-form :model="workOrder" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="工单标题: " prop="title">
                <el-input v-model="workOrder.title" placeholder="请输入工单标题"></el-input>
              </el-form-item>
              <el-form-item label="优先级: " prop="level">
                <el-select v-model="workOrder.level" placeholder="请选择优先级" style="width:100%;">
                  <el-option label="非常紧急" :value="1"></el-option>
                  <el-option label="紧急" :value="2"></el-option>
                  <el-option label="一般" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="处理人: " prop="dispatchUser">
                <el-select
                  v-model="workOrder.dispatchUser"
                  filterable
                  placeholder="请输入姓名"
                  style="width:100%;"
                >
                  <el-option
                    v-for="user in userList"
                    :key="user.loginName"
                    :label="user.userName"
                    :value="user.loginName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工单流程: " prop="workFlowId">
                <el-select v-model="workOrder.workFlowId" placeholder="请选择工单流程" style="width:100%;">
                  <el-option
                    v-for="workFlow in workFlowList"
                    :key="workFlow.id"
                    :label="workFlow.name"
                    :value="workFlow.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否关联设备: " prop="isDevice">
                <el-radio-group v-model="workOrder.isDevice">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="workOrder.isDevice" label="关联设备: " prop="imeis">
                <el-select
                  v-model="workOrder.imeis"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入imei"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in tempImeis"
                    :key="item.imei"
                    :label="item.imei"
                    :value="item.imei"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工单描述: " prop="remark">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入工单描述"
                  v-model="workOrder.remark"
                ></el-input>
              </el-form-item>
              <el-form-item label="上传附件: " prop="fileList">
                <el-upload
                  class="upload-demo"
                  action="http://139.196.73.153:8091/iot-backend/common/uploadImage"
                  :on-change="handleChange"
                  :on-remove="removeOk"
                  :multiple="true"
                  :on-success="uploadOk"
                >
                  <el-button size="mini" type="info">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  @click="saveWorkOrder"
                >立即创建</el-button>
                <el-button @click="()=> this.$router.back()">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>

        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="amap-page-container mb20">
              <el-amap
                v-if="mapCenter.length>0"
                ref="map"
                vid="amapWorkOrder"
                :amap-manager="amapManager"
                :center="mapCenter"
                :zoom="zoom"
                :plugin="plugin"
                :events="events"
                class="amap-demo"
              >
                <el-amap-marker
                  v-if="workOrder.amapLongitude && workOrder.amapLatitude"
                  :position="[workOrder.amapLongitude, workOrder.amapLatitude]"
                  :content="dom_jg"
                  :animation="'AMAP_ANIMATION_DROP'"
                  :offset="[-16,-14]"
                ></el-amap-marker>
              </el-amap>
            </div>
            <el-form :model="workOrder" :rules="rules" ref="ruleForm" label-width="80px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="经度: ">
                    <el-input v-model="workOrder.amapLongitude" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="纬度:">
                    <el-input v-model="workOrder.amapLatitude" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工单地址: " prop="title">
                    <el-input v-model="workOrder.address" placeholder="请输入工单地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
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
      fullscreenLoading: false,
      rules: {},
      workOrder: {
        title: "",
        level: 2,
        dispatchUser: "",
        workFlowId: 1,
        isDevice: 1,
        imeis: [],
        remark: "",
        amapLongitude: "", //
        amapLatitude: "", //
        address: "",
        fileList: []
      },
      workFlowList: [],
      userList: [],
      tempImeis: [],
      loading: false,

      dom_jg:
        "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",

      amapManager,
      zoom: 10,
      mapCenter: [],
      events: {
        init: o => {
          // console.log(o.getCenter());
          // console.log(this.$refs.map.$getInstance());
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
    this.getLocation(); // 根据ip地址获取位置信息
    this.getWorkFlowList(); // 获取流程列表
    this.getUserList();
  },
  methods: {
    getWorkFlowList() {
      let api = "/workOrder/getWorkFlowList";
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.workFlowList = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    // 获取用户列表
    getUserList: function() {
      let api = "/user/getUserList ";
      let params = {
        pageIndex: 1,
        pageSize: 10000
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.userList = res.data;
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        let api = "/wellCoverDevice/getDeviceImeis";
        let params = {
          imei: query
        };
        this.$fetch.post(api, params).then(res => {
          this.loading = false;
          if (res.code === 10000) {
            this.tempImeis = res.data;
          }
        });
      } else {
        this.tempImeis = [];
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    uploadOk(res, file, fileList) {
      this.setFileList(fileList);
    },
    removeOk(file, fileList) {
      this.setFileList(fileList);
    },
    setFileList(fileList) {
      if (fileList && fileList.length) {
        let tempArr = [];
        fileList.map(file => {
          tempArr.push({
            name: file.name,
            url: file.response && file.response.data.url
          });
        });
        this.workOrder.fileList = tempArr;
      } else {
        this.workOrder.fileList = [];
      }
    },
    saveWorkOrder() {
      let api = "/workOrder/saveWellCoverWorkOrder";
      let params = {
        ...this.workOrder
      };
      this.fullscreenLoading = true;
      this.$fetch.post(api, params).then(res => {
        this.fullscreenLoading = false;
        if (res.code === 10000) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.back();
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },

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
      this.workOrder.amapLongitude = lng;
      this.workOrder.amapLatitude = lat;
    },
    // 通过 经纬度获取 地址详情
    getAddress(lng, lat) {
      axios
        .get(
          `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&poitype=号&key=7af099c49bc59b423c4998a8bc01706b&radius=1000&extensions=all`
        )
        .then(res => {
          if (res.infocode === "10000") {
            this.workOrder.address = res.regeocode.formatted_address;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-page-container {
  height: 350px;
}
</style>
