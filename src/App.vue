<template>
  <div>
    <div id="nav-header" v-if="this.$route.path !== '/login'">
      <nav-header />
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/Header/Header";

export default {
  name: "App",
  components: {
    NavHeader
  }
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/variable.scss";

#nav-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  background-color: $blue;
}

#app {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}

@media (max-width: 1300px) {
  #app {
    width: 1300px;
  }

  #nav-header {
    width: 1300px;
  }
}
</style>
