<template>
<div class="alarm-set">
    <div class="center-content">
        <div class="title">
            阀值设置
        </div>
        <div class="card">
            <el-form ref="boundaryForm" :model="boundary" label-width="40px">
                <el-row :gutter="20" class="mt20">
                    <el-col :span="12">
                        <el-form-item label="电量">
                            <el-input v-model="boundary.battery" placeholder="电量阀值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="水位">
                            <el-input v-model="boundary.waterLevel" placeholder="水位阀值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="亮度">
                            <el-input v-model="boundary.brightness" placeholder="亮度阀值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="信号">
                            <el-input v-model="boundary.signalStrength" placeholder="信号强度阀值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" :loading="fullscreenLoading" @click="saveWellCoverAlarmConfig">保存更新</el-button>
                            <!-- <el-button @click= "" >重置默认</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'AlarmSet',
    data() {
        return {
            fullscreenLoading: false,
            boundary: {
                battery: '', //	电量
                waterLevel: '', //		水位
                brightness: '', //		亮度
                isTilt: '', //		是否倾斜
                signalStrength: '', //		信号强度
            }
        }
    },
    mounted() {
        this.getWellCoverAlarmConfig()
    },
    methods: {
        getWellCoverAlarmConfig() {
            let api = '/config/getWellCoverAlarmConfig'
            this.$fetch.post(api).then(res => {
                if (res.code === 10000) {
                    this.boundary = res.data;
                } else {
                    this.$message({
                        message: res.message,
                        type: "error"
                    });
                }
            })
        },
        saveWellCoverAlarmConfig() {
            this.fullscreenLoading = true
            let api = '/config/saveWellCoverAlarmConfig'
            this.$fetch.post(api, this.boundary).then(res => {
                if (res.code === 10000) {
                    this.$message({
                        message: '保存成功！',
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: "error"
                    });
                }
                this.fullscreenLoading = false
            }).catch(err => {
                this.$message.error(err.message);
                this.fullscreenLoading = false;
            });
        },

    },
}
</script>

<style lang="scss">
.title {
    font-size: 18px;
    font-weight: 600;
    font-family: Extra large;
    line-height: 40px;
    color: #2d3e50;
}

.card {
    // padding: 20px;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // border-radius: 4px;
    // border: 1px solid #EBEEF5;
    // background-color: #FFFFFF;
    // overflow: hidden;
    // color: #303133;
    // -webkit-transition: 0.3s;
    // transition: 0.3s;

}
</style>
