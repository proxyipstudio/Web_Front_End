<template>
  <div>
    CheckConfiguration
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { CheckConfiguration } from "../../common/config/breadcrumb";

export default {
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    })
  },
  mounted() {
    this.setBreadcrumb(CheckConfiguration);
    this.setNavActive("5-2");
  }
};
</script>
