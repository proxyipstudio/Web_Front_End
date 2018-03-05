<template>
  <nav id="nav">
    <el-row class="tac">
      <el-col :span="24" style="width: 208px;">
        <el-menu
          :default-active="curNavActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          >
          <el-menu-item index="0" @click="goto('/backstage/dashboard')">
            <i class="fa fa-dashboard"></i>
            <span slot="title">信息汇总</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-navicon"></i>
              <span>扫描节点</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goto('/backstage/gathernode/scadanode')">节点管理</el-menu-item>
              <el-menu-item index="1-2" @click="goto('/backstage/versions')">版本管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2" @click="goto('/backstage/hosts')">
            <i class="fa fa-desktop"></i>
            <span slot="title">主机信息</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="fa fa-money"></i>
              <span>营销相关</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="goto('/backstage/earning')">营收情况</el-menu-item>
              <el-menu-item index="4-2" @click="goto('/backstage/orders')">历史订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="fa fa-navicon"></i>
              <span>规则配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="goto('/backstage/ruleconfiguration')">采集规则</el-menu-item>
              <el-menu-item index="5-2" @click="goto('/backstage/checkconfiguration')">校验规则</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="7" @click="goto('/backstage/ipprice')">
            <i class="fa fa-code"></i>
            <span slot="title">IP价格表</span>
          </el-menu-item>
          <el-menu-item index="8" @click="goto('/backstage/stat')">
            <i class="fa fa-bar-chart"></i>
            <span slot="title">统计</span>
          </el-menu-item>
          <el-menu-item index="10" @click="goto('/backstage/users')">
            <i class="fa fa-users"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="9" @click="goto('/backstage/accountsettings')">
            <i class="fa fa-cogs"></i>
            <span slot="title">账户设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goto(route) {
      this.$router.push(route);
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["curNavActive"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#nav {
  height: 100%;
  width: 208px;
}
</style>
