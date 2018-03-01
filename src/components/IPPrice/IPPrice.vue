<template>
  <div>
    IPPrice 
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { IPPrice } from "../../common/config/breadcrumb";

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
    this.setNavActive("7");
    this.setBreadcrumb(IPPrice);
  }
};
</script>
