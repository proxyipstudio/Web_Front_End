<template>
  <header id="header">
    <div class="title">
      <i class="el-icon-edit"></i>
      <!-- 代理IP采集销售系统 -->
      IP - Seller
    </div>
    <div class="buttons">
      <span class="item">
        <i class="fa fa-user"></i>
        <span v-text="curUsrName"></span>
      </span>
      <span class="item" @click="logout">
        <i class="el-icon-arrow-right"></i>
        退出
      </span>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    logout() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  mounted() {
    // console.log(this.curUsrName);
  },
  computed: {
    ...mapGetters(["curUsrName"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#header {
  max-width: 1200px;
  height: 60px;
  margin: 0 auto;
  line-height: 60px;
  font-size: 1.5rem;
  color: $white;
  background-color: $blue;

  .title {
    float: left;
    font-weight: 200;
    color: $white;
  }

  .buttons {
    float: right;
    font-size: 1rem;
    font-weight: 100;
    text-align: center;
    transition: all 0.3s;

    .item {
      min-width: 50px;
      height: 60px;
      padding: 0 15px;
      display: inline-block;
      margin-left: 10px;
      cursor: pointer;
      color: $white;

      &:hover {
        background-color: $deep-blue;
      }

      &:first-child {
        &:hover {
          background-color: transparent;
          cursor: auto;
        }
      }
    }
  }
}
</style>
