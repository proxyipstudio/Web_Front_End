<template>
  <div id="tasks">
    Tasks
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Tasks } from "../../common/config/breadcrumb";
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
    this.setNavActive("11");
    this.setBreadcrumb(Tasks);
    utils.setScpoe(this);
  }
};
</script>