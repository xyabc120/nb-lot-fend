<template>
<div class="page">
    <div class="page-title">设备编辑</div>
    <div class="page-content">
        <el-row :gutter="20">
            <!-- 左边 -->
            <el-col :span="12">
                <div class="title">基本信息</div>
                <el-form :model="device" :rules="rules" ref="deviceRuleForm1" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="imei" prop="deviceInfo.imei">
                                <el-input v-model="device.deviceInfo.imei" maxlength="15" placeholder="请输入imei"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="设备名称" prop="deviceInfo.deviceName">
                                <el-input v-model="device.deviceInfo.deviceName" placeholder="请输入设备名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="设备型号" prop="deviceInfo.deviceNo">
                                <el-input v-model="device.deviceInfo.deviceNo" placeholder="请输入设备型号" maxlength="30"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="安装人员" prop="deviceInfo.installer">
                                <el-input v-model="device.deviceInfo.installer" placeholder="请输入安装人员" maxlength="20"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系人" prop="deviceInfo.contacts">
                                <el-input v-model="device.deviceInfo.contacts" placeholder="请输入联系人" maxlength="20"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话" prop="deviceInfo.userName">
                                <el-input v-model="device.deviceInfo.contactsPhone" placeholder="请输入联系电话" maxlength="11"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="使用单位" prop="deviceInfo.useGroup">
                                <el-input v-model="device.deviceInfo.useGroup" placeholder="请输入使用单位" maxlength="30"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同状态" prop="deviceInfo.contractStatus">
                                <el-select v-model="device.deviceInfo.contractStatus" placeholder="请选择合同状态" style="width:100%;">
                                    <el-option label="试用" value="1"></el-option>
                                    <el-option label="正式" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="接入运营商" prop="deviceInfo.platform">
                                <el-select v-model="device.deviceInfo.platform" placeholder="请选择运营商" style="width:100%;">
                                    <el-option v-for="(platform, index) in platformList" :key="index" :label="platform.name" :value="platform.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="title">SIM信息</div>
                <el-form :model="device" :rules="rules" ref="deviceRuleForm2" label-width="90px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="imsi编号" prop="imsi">
                                <el-input v-model="device.sim.imsi" placeholder="请输入imsi" maxlength="30"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="归属运营商" prop="sim.belongPlatform">
                                <el-select v-model="device.sim.belongPlatform" placeholder="请选择运营商" style="width:100%;">
                                    <el-option v-for="(platform, index) in platformList" :key="index" :label="platform.name" :value="platform.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="激活日期" prop="sim.activeDate">
                                <el-date-picker v-model="device.sim.activeDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="有效期至" prop="sim.endDate">
                                <el-date-picker v-model="device.sim.endDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row></el-row>
                </el-form>
            </el-col>
            <!-- 右边 -->
            <el-col :span="12">
                <div class="title">GIS信息</div>
                <div class="amap-page-container mb20">
                    <el-amap v-if="mapCenter.length>0" ref="map" vid="amapDemo" :amap-manager="amapManager" :center="mapCenter" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                        <el-amap-marker v-if="device.deviceInfo.amapLongitude && device.deviceInfo.amapLatitude" :position="[device.deviceInfo.amapLongitude, device.deviceInfo.amapLatitude]" :content="dom_jg" :animation="'AMAP_ANIMATION_DROP'" :offset="[-16,-14]"></el-amap-marker>
                    </el-amap>
                </div>
                <el-form :model="device" :rules="rules" ref="deviceRuleForm3" label-width="50px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="经度" prop="deviceInfo.amapLongitude">
                                <el-input v-model="device.deviceInfo.amapLongitude" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="纬度" prop="deviceInfo.amapLatitude">
                                <el-input v-model="device.deviceInfo.amapLatitude" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="地址" prop="deviceInfo.address">
                                <el-input v-model="device.deviceInfo.address" placeholder="地址信息"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-form :model="device" :rules="rules" ref="deviceRuleForm4" label-width="90px">
                <el-col :span="24">
                    <el-form-item label="备注" prop="deviceInfo.remark">
                        <el-input type="textarea" :rows="3" v-model="device.deviceInfo.remark" placeholder="备注信息" maxlength="200"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="saveDevice('deviceRuleForm1','deviceRuleForm2','deviceRuleForm3','deviceRuleForm4')">保存</el-button>
                        <el-button @click="() => this.$router.back()">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
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
            rules: {
                'deviceInfo.imei': [{
                        required: true,
                        message: "请输入imei 编号",
                        trigger: "blur"
                    },
                    {
                        min: 15,
                        message: 'imei必须是15 个字符',
                        trigger: 'blur'
                    }
                ],
                'deviceInfo.deviceName': [{
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '设备名称长度为1到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                'deviceInfo.platform': [{
                    required: true,
                    message: "请选择运营商",
                    trigger: "blur"
                }],
                'deviceInfo.amapLongitude': [{
                    required: true,
                    message: "请选择地理信息",
                    trigger: "blur"
                }],
                'deviceInfo.amapLatitude': [{
                    required: true,
                    message: "请选择地理信息",
                    trigger: "blur"
                }],
                'deviceInfo.address': [{
                    required: true,
                    message: "请输入地址信息",
                    trigger: "blur"
                }],
                'sim.activeDate': [{
                    required: true,
                    message: "请选择激活日期",
                    trigger: "blur"
                }],
                'sim.endDate': [{
                    required: true,
                    message: "请选择有效期",
                    trigger: "blur"
                }]
            },
            platformList: [],
            device: {
                deviceInfo: {
                    id: this.$route.params.id, // 	id	唯一标识
                    imei: "", // 	设备编号
                    deviceName: "", // 	设备名称
                    address: "", // 	地址
                    province: "",
                    city: "",
                    district: "",
                    deviceStatus: "", // 	设备状态	(0:离线，1:在线)
                    platform: "", // 	接入运营商
                    createDate: "", // 	创建日期
                    lastConnetTime: "", // 	最后在线时间
                    amapLongitude: "",
                    amapLatitude: "",
                    installer: "", // 	安装人员
                    deviceNo: "", // 	设备型号
                    contacts: "", // 	联系人
                    remark: "", // 	备注
                    useGroup: "", // 	使用单位
                    contractStatus: "1" // 	合同状态
                },
                sim: {
                    imsi: "", // 	编号
                    belongPlatform: "", // 	归属运营商
                    activeDate: "", // 	激活日期
                    endDate: "" // 	有效期	精确度到天
                }
            },
            fullscreenLoading: false,
            markers: [],
            dom_jg: "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",
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
        this.getPlatforms(); // 获取运营商信息
        this.init(); // 初始化数据
    },
    methods: {
        init() {
            if (this.device.deviceInfo.id == "0") {
                this.device.deviceInfo.id = "";
            } else {
                this.getDeviceByid(this.device.deviceInfo.id);
            }
        },
        getDeviceByid(id) {
            let api = `/wellCoverDevice/getDeviceById/${id}`;
            this.$fetch.post(api).then(res => {
                if (res.code === 10000) {
                    this.device = res.data;
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
            this.device.deviceInfo.amapLongitude = lng;
            this.device.deviceInfo.amapLatitude = lat;
        },
        // 通过 经纬度获取 地址详情
        getAddress(lng, lat) {
            axios
                .get(
                    `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&poitype=号&key=7af099c49bc59b423c4998a8bc01706b&radius=1000&extensions=all`
                )
                .then(res => {
                    if (res.infocode === "10000") {
                        this.device.deviceInfo.province =
                            res.regeocode.addressComponent.province || "";
                        this.device.deviceInfo.city =
                            res.regeocode.addressComponent.city == false ?
                            "" :
                            res.regeocode.addressComponent.city;
                        this.device.deviceInfo.district =
                            res.regeocode.addressComponent.district || "";
                        this.device.deviceInfo.address =
                            res.regeocode.formatted_address || "";
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
        },
        async formValidate(deviceRuleForm1, deviceRuleForm2, deviceRuleForm3, deviceRuleForm4) {
            let validate1 = await this.$refs[deviceRuleForm1].validate();
            let validate2 = await this.$refs[deviceRuleForm2].validate();
            let validate3 = await this.$refs[deviceRuleForm3].validate();
            let validate4 = await this.$refs[deviceRuleForm4].validate();
            return Promise.all([validate1, validate2, validate3, validate4]);
        },
        saveDevice(deviceRuleForm1, deviceRuleForm2, deviceRuleForm3, deviceRuleForm4) {
            this.formValidate(deviceRuleForm1, deviceRuleForm2, deviceRuleForm3, deviceRuleForm4).then(validate => {
                if (validate) {
                    this.submit();
                }
            }).catch(err => {
                this.$notify({
                    title: "提示",
                    message: "表单验证失败！",
                    type: "error"
                });
            })
        },
        submit() {
            let api = "/wellCoverDevice/saveDeviceInfo";
            let params = {
                deviceInfo: this.device.deviceInfo,
                sim: this.device.sim
            };
            this.fullscreenLoading = true;
            this.$fetch.post(api, params).then(res => {
                if (res.code === 10000) {
                    this.fullscreenLoading = false;
                    this.$router.back();
                } else {
                    this.fullscreenLoading = false;
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
    height: 330px;
}
</style>
