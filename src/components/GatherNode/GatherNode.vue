<template>
  <div id="gathernode">
    <div id="nodecontainer">
      <el-tabs tab-position="left" @tab-click="handleClick" v-model="tabroute">
        <el-tab-pane label="采集节点" name="/backstage/gathernode/scadanode"><router-view></router-view></el-tab-pane>
        <el-tab-pane label="校验节点" name="/backstage/gathernode/checknode"><router-view></router-view></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabroute: '/backstage/gathernode/scadanode'
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push(tab.name);
    }
  },
  mounted() {
    switch (this.$route.name) {
      case 'CheckNode':
        this.tabroute = '/backstage/gathernode/checknode';
        break;
    
      case 'ScadaNode':
        this.tabroute = '/backstage/gathernode/scadanode';
        break;
      default:
        break;
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';

  #gathernode {
    @extend .pager;

    #nodecontainer {
      position: relative;
    }
  }
</style>
