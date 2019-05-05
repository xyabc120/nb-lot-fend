<template>
<div class="base-set">
    <div class="center-content">
        <div class="title ">
            微信设置
        </div>
        <div class="card ">
            <el-form ref="wechatForm" :model="wechatConfig" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="开启微信推送">
                            <el-switch v-model="wechatConfig.isOpen" active-text="启用 / 关闭" :active-value="1" inactive-text="" :inactive-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="!!wechatConfig.isOpen" :span="24">
                        <el-form-item label="微信推送对象">
                            <el-transfer :titles="['未开通', '已开通']" v-model="wechatConfig.activeUsers" :data="wechatConfig.allUsers"></el-transfer>
                            <el-alert class="mt10" type="warning" description="只有关注过微信公众号【物知物联】的用户才能被添加到 推送到队列中 ！请与需要推送消息的用户进行核实。" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" :loading="fullscreenLoading" @click="updateWeChatMessageByUserList">保存并更新</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="title ">
            短信设置
        </div>
        <div class="card ">
            <el-form ref="messageForm" :model="messageConfig" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="开启短信推送">
                            <el-switch v-model="messageConfig.isOpen" active-text="启用 / 关闭" :active-value="1" inactive-text="" :inactive-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="!!messageConfig.isOpen" :span="24">
                        <el-form-item label="短信推送对象">
                            <el-transfer :titles="['未开通', '已开通']" v-model="messageConfig.activeUsers" :data="messageConfig.allUsers"></el-transfer>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" :loading="fullscreenLoading" @click="updateNoticeSmsMessageByUserList">保存并更新</el-button>
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
    name: 'BaseSet',
    data() {
        return {
            fullscreenLoading: false,
            wechatConfig: {
                isOpen: 0,
                switch: 1,
                allUsers: [],
                activeUsers: []
            },
            messageConfig: {
                isOpen: 0,
                allUsers: [],
                activeUsers: []
            }
        }
    },
    mounted() {
        this.getUsersByWeChatMessages();
        this.getUsersBySmsMessages();
    },
    methods: {
        getUsersByWeChatMessages() {
            let api = '/user/getUsersByWeChatMessages'
            this.$fetch.post(api).then(res => {
                if (res.code === 10000) {
                    this.wechatConfig.activeUsers = res.data.activeUsers;
                    this.wechatConfig.allUsers = res.data.allUsers;
                    this.wechatConfig.isOpen = res.data.isOpen;
                }
            })
        },
        getUsersBySmsMessages() {
            let api = '/user/getUsersBySmsMessages'
            this.$fetch.post(api).then(res => {
                if (res.code === 10000) {
                    this.messageConfig.activeUsers = res.data.activeUsers;
                    this.messageConfig.allUsers = res.data.allUsers;
                    this.messageConfig.isOpen = res.data.isOpen;
                }
            })
        },

        updateWeChatMessageByUserList () {
            this.fullscreenLoading = true;
            let api = 'user/updateWeChatMessageByUserList  '
            let params = {
                activeUsers: this.wechatConfig.activeUsers,
                isOpen: this.wechatConfig.isOpen
            }
            this.$fetch.post(api, params).then(res => {
                if (res.code === 10000) {
                    this.$message({
                        message: "请求成功！",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: "error"
                    });
                }
                this.fullscreenLoading = false;
            }).catch(err => {
                this.$message.error(err.message);
                this.fullscreenLoading = false;
            });
        },
        updateNoticeSmsMessageByUserList() {
            this.fullscreenLoading = true;
            let api = 'user/updateNoticeSmsMessageByUserList '
            let params = {
                activeUsers: this.messageConfig.activeUsers,
                isOpen: this.messageConfig.isOpen
            }
            this.$fetch.post(api, params).then(res => {
                if (res.code === 10000) {
                    this.$message({
                        message: "请求成功！",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: "error"
                    });
                }
                this.fullscreenLoading = false;
            }).catch(err => {
                this.$message.error(err.message);
                this.fullscreenLoading = false;
            });
        }
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
</style>
