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
                            <el-switch v-model="wechatConfig.switch" active-text="启用 / 关闭" :active-value="1" inactive-text="" :inactive-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="!!wechatConfig.switch"  :span="24">
                        <el-form-item label="微信推送对象">
                            <el-transfer v-model="wechatConfig.sendUsers" :data="users"></el-transfer>
                            <el-alert class="mt10" type="warning" description="只有关注过微信公众号【物知物联】的用户才能添加到 被推送到队列中 ！请与需要推送消息到用户进行核实。"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary">保存并更新</el-button>
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
                            <el-switch v-model="messageConfig.switch" active-text="启用 / 关闭" :active-value="1" inactive-text="" :inactive-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col  v-if="!!messageConfig.switch" :span="24">
                        <el-form-item label="短信推送对象">
                            <el-transfer v-model="messageConfig.sendUsers" :data="users"></el-transfer>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary">保存并更新</el-button>
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
            users:[],
            wechatConfig: {
                switch: 1,
                sendUsers: []
            },
            messageConfig: {
                switch: 1,
                sendUsers: []
            }
        }
    },
}
</script>

<style lang="scss">
</style>
