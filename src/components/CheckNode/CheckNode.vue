<template>
  <div id="checknode">
    CheckNode 
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { CheckNode } from "../../common/config/breadcrumb";

export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
  },
  created() {
    this.setNavActive("1-1");
    this.setBreadcrumb(CheckNode);
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #checknode {

  }
</style>
