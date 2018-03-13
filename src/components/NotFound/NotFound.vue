<template>
  <div id="notfound">
    404
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { NotFound } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    })
  },
  mounted() {
    this.setNavActive("");
    this.setBreadcrumb(NotFound);
    utils.setScpoe(this);
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';

  #notfound {
    @extend .pager;
  }

</style>
