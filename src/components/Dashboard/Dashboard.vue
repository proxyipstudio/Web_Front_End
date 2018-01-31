<template>
  <div>
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
