<template>
<div class="page">
    <div class="page-title">系统设置</div>
    <div class="page-content">
        <el-tabs v-model="active" type="card">
            <el-tab-pane label="基本设置" name="first">
              <base-set></base-set>
            </el-tab-pane>
            <el-tab-pane label="告警设置" name="second" :lazy="true">
              <alarm-set></alarm-set>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import AlarmSet from './AlarmSet'
import BaseSet from './BaseSet'
export default {
    components:{
      AlarmSet,
      BaseSet
    },
    data() {
        return {
            active: "first"
        };
    },
    mounted() {},
    methods: {}
};
</script>
