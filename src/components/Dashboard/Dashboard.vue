<template>
  <div id="dashboard">
    DB
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Dashboard } from "../../common/config/breadcrumb";

export default {
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    })
  },
  created() {
    this.setNavActive("0");

    this.setBreadcrumb(Dashboard);
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #dashboard {
    @extend .pager;
  }
</style>
