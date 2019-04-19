<template>
  <div class="pageinfo">
    <div class="pageinfo-header">
      <div class="pageinfo-title">工单信息</div>
      <div class="card">
        <div class="card-title mb20">工单编号: {{workOrder.workOrderNumber}}</div>
        <div class="flow-step">
          <el-steps v-if="workFlow" :active="stepVal" align-center>
            <el-step v-for="node in workFlow" :key="node.id" :title="node.workName"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="card mt20">
        <el-row :gutter="10">
          <el-col :span="14" class="lable">
            <div class="card-title mb20">基本信息</div>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row>
                  <el-col :span="8" class="lable">工单标题:</el-col>
                  <el-col :span="16" class="value">{{workOrder.title}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="8" class="lable">创建人:</el-col>
                  <el-col :span="16" class="value">{{workOrder.createUser}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="8" class="lable">创建时间:</el-col>
                  <el-col :span="16" class="value">{{workOrder.createDate}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="mt20">
              <el-col :span="8">
                <el-row style="line-height:27px;">
                  <el-col :span="8" class="lable">工单流程:</el-col>
                  <el-col :span="16" class="value">{{workOrder.workFlowName}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row style="line-height:27px;">
                  <el-col :span="8" class="lable">当前处理人:</el-col>
                  <el-col :span="16" class="value" title="点击选择">
                    <el-button
                      v-if="!(stepVal == workFlow.length)"
                      size="mini"
                      type="text"
                      @click="dialogFormVisible=true,dispatchUser = workOrder.dispatchUserLoginName"
                    >{{workOrder.dispatchUser}}</el-button>
                    <span v-else>{{workOrder.dispatchUser}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row style="line-height:27px;">
                  <el-col :span="8" class="lable">处理时间:</el-col>
                  <el-col :span="16" class="value">{{workOrder.updateDate}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="!(stepVal == workFlow.length)" class="mt40">
              <el-col :span="24" class="lavalueble">
                <el-form ref="form" :model="submitData" label-width="60px" size="mini">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="submitData.remark"></el-input>
                  </el-form-item>
                  <el-form-item label="附件">
                    <el-upload
                      class="upload-demo"
                      action="http://139.196.73.153:8091/iot-backend/common/uploadImage"
                      :on-change="handleChange"
                      :on-remove="removeOk2"
                      :multiple="true"
                      :on-success="uploadOk2"
                      :file-list="submitData.files"
                    >
                      <el-button size="mini" type="info">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitNext">提交</el-button>
                    <el-button @click="()=>{this.$router.back()}">返回</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10" class="value">
            <div class="card-title mb20">位置信息</div>
            <div
              v-if="workOrder.amapLongitude && workOrder.amapLatitude"
              class="amap-container mb20"
            >
              <el-amap
                class="amap-box"
                :vid="'amap'+new Date()"
                :zoom="11"
                :center="[workOrder.amapLongitude, workOrder.amapLatitude]"
              >
                <el-amap-marker
                  :position="[workOrder.amapLongitude, workOrder.amapLatitude]"
                  :content="dom_jg"
                  :animation="'AMAP_ANIMATION_DROP'"
                  :offset="[-16,-14]"
                ></el-amap-marker>
              </el-amap>
            </div>
            <el-row>
              <el-col :span="4" class="lable">工单地址:</el-col>
              <el-col :span="20" class="value">{{workOrder.address}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="pageinfo-content mt10">
      <div class="card">
        <div class="card-title">工单流转记录</div>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(record,index) in recordList"
              :key="record.id"
              :icon="index ? '' : 'el-icon-more' "
              :type="index ? '' : 'primary' "
              :timestamp="record.submitUser+'  '+record.createDate"
              placement="top"
            >
              <el-card>
                <p>{{record.remark}}</p>
              </el-card>
              <div v-if="record.files.length>0" style="width:400px;">
                <el-upload
                  action="http://139.196.73.153:8091/iot-backend/common/uploadImage"
                  :disabled="true"
                  :on-change="handleChange"
                  :file-list="record.files"
                ></el-upload>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div v-if="!(stepVal == workFlow.length)" class="card-title mb20">备注信息</div>
        <div v-if="!(stepVal == workFlow.length)" class="comment mb20">
          <el-form ref="form" :model="comment" label-width="60px" size="mini">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="comment.remark"></el-input>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                action="http://139.196.73.153:8091/iot-backend/common/uploadImage"
                :on-change="handleChange"
                :on-remove="removeOk"
                :multiple="true"
                :on-success="uploadOk"
                :file-list="comment.fileList"
              >
                <el-button size="mini" type="info">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="SaveComment()">保存备注</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 提交至下一步弹框 -->
    <el-dialog title="处理人变化确认" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="comment" label-width="60px" size="mini">
        <el-form-item label="处理人">
          <el-select v-model="dispatchUser" filterable placeholder="请输入姓名" style="width:100%;">
            <el-option
              v-for="user in userList"
              :key="user.loginName"
              :label="user.userName"
              :value="user.loginName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changDispatchUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
import axios from "axios";
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      stepVal: 0,
      workOrder: {
        id: this.$route.params.id
      },
      workFlow: [],
      dom_jg:
        "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:33px;height:33px;'></img>",
      recordList: [],
      userList: [],
      dispatchUser: "",
      submitData: {
        workOrderId: this.$route.params.id,
        remark: "",
        files: []
      },

      comment: {
        workOrderId: this.$route.params.id,
        remark: "",
        fileList: []
      },
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getWorkOrderById(this.workOrder.id);
    this.getActives(this.workOrder.id);
    this.getUserList();
  },
  methods: {
    getWorkOrderById(id) {
      let api = `/workOrder/getWellCoverWorkOrderById/${id}`;
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.workOrder = res.data.workOrder;
          this.workFlow = res.data.workFlow;
          this.workFlow.some((itme, index) => {
            if (this.workOrder.workOrderStatus === itme.id) {
              return (this.stepVal = index + 1);
            }
          });
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    getActives(id) {
      let api = `workOrder/getWellCoverWorkCurrentRemarksById/${id}`;
      this.$fetch.post(api).then(res => {
        if (res.code === 10000) {
          this.recordList = res.data;
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
    submitNext() {
      this.$confirm("确定要提交到下一步吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          let api = "/workOrder/processWellCoverWorkOrder";
          let params = {
            ...this.submitData
          };
          this.$fetch.post(api, params).then(res => {
            if (res.code === 10000) {
              this.submitData.remark = "";
              this.submitData.files = [];
              this.getWorkOrderById(this.workOrder.id);
              this.getActives(this.workOrder.id);
              this.$message({
                message: "提交成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          console.log("您已取消了关闭操作");
        });
    },
    SaveComment() {
      let api = "/workOrder/saveWellCoverRemarks";
      let params = {
        remark: this.comment.remark,
        files: this.comment.fileList,
        workOrderId: this.workOrder.id
      };
      this.$fetch.post(api, params).then(res => {
        if (res.code === 10000) {
          this.comment.remark = "";
          this.comment.fileList = [];
          this.getActives(this.workOrder.id);
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    changDispatchUser() {
      let api = "/workOrder/updateDispatchUser";
      let params = {
        workOrderId: this.$route.params.id,
        dispatchUser: this.dispatchUser
      };
      this.$fetch.post(api, params).then(res => {
        this.dialogFormVisible = false;
        if (res.code === 10000) {
          this.getWorkOrderById(this.workOrder.id);
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
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
        this.comment.fileList = tempArr;
      } else {
        this.comment.fileList = [];
      }
    },
    uploadOk2(res, file, fileList) {
      this.setFileList2(fileList);
    },
    removeOk2(file, fileList) {
      this.setFileList2(fileList);
    },
    setFileList2(fileList) {
      if (fileList && fileList.length) {
        let tempArr = [];
        fileList.map(file => {
          tempArr.push({
            name: file.name,
            url: file.response && file.response.data.url
          });
        });
        this.submitData.files = tempArr;
      } else {
        this.submitData.files = [];
      }
    }
  }
};
</script>
<style lang="scss" scope>
.card {
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  .card-title {
    font-size: 15px;
    font-weight: 600;
    font-family: Extra large;
    line-height: 40px;
    color: #2d3e50;
  }
  .flow-step {
    width: 100%;
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
  .step-record {
    width: 100%;
    .record {
      width: calc(100% - 15px);
      border: 1px dashed #ebeef5;
      padding: 10px;
      .remark {
        min-height: 40px;
        background: #fafaf0;
      }
    }
  }
}
.amap-container {
  height: 220px;
}
</style>
