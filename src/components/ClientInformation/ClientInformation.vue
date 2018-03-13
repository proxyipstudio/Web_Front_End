<template>
  <div id="clientinformation">
    {{ this.$route.params.id }}
    <el-card body-style="padding: 0;">
      <div slot="header" class="clearfix">
        <span>dddd</span>
      </div>
      <div>
        
        <el-table
          :data="tableData"
          border
          style="width: 100%;border: 0 none;">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { ClientInformation } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    // 获取客户端列表
    async getClientList() {
      if (this.$route.params.id === '') {
        utils.error('无效操作');
        return;
      }

      try {
        const { status, data, msg } = await utils.post(API.GET_CLIENT , {ModuleId: this.$route.params.id});
      } catch (e) {

      }
    }
  },
  mounted() {
    this.setNavActive("1-2");
    this.setBreadcrumb(ClientInformation);
    utils.setScpoe(this);
    this.getClientList();
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';

  #clientinformation {
    @extend .pager;
  }
</style>
