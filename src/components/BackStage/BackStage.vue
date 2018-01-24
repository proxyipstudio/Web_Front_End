<template>
  <div id="home">
    <div id="leftContainer">
      <nav-bar></nav-bar>
    </div>
    <div id="rightContainer">
      <el-card class="box-card" style="margin-bottom: 10px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">

          <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="{ path: item.route }"><span v-text="item.text"></span></el-breadcrumb-item>

          <!-- <el-breadcrumb-item :to="{ path: '/backstage/gathernodes' }">扫描节点</el-breadcrumb-item>
          <el-breadcrumb-item>扫描节点列表</el-breadcrumb-item> -->
        </el-breadcrumb>
      </el-card>

      <router-view></router-view>

    </div>

  </div>
</template>

<script>
import NavBar from "@/components/Nav/Nav";
import NavHeader from "@/components/Header/Header";
import { mapGetters } from 'vuex';

export default {
  components: {
    NavHeader,
    NavBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'breadcrumb'
    ])
  }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  padding-top: 70px;

  #leftContainer {
    float: left;
    height: 100%;
    width: 205px;
    padding-right: 10px;
    overflow-y: scroll;
    // overflow-x: hidden;
  }

  #rightContainer {
    float: left;
    height: 100%;
    width: calc(100% - 215px);
    overflow-y: scroll;
    // overflow-x: hidden;
  }
}
</style>
