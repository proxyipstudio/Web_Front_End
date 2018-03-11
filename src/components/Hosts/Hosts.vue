<template>
  <div id="gn">

    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content">

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>主机列表</span>
            </div>
            <el-table
            :data="vpsData"
            border
            v-loading="loadingflag"
            :height="tableHeight"
            style="width: 100%; border: 0 none"
            ref="gnTable"
            :row-class-name="tableRowClassName">
              <el-table-column
                label="主机名">
                <template slot-scope="scope">
                  <el-popover
                    ref="popover4"
                    placement="right"
                    width="400"
                    trigger="hover">
                    <el-table :data="gridData">
                      <el-table-column width="150" property="date" label="日期"></el-table-column>
                      <el-table-column width="100" property="name" label="姓名"></el-table-column>
                      <el-table-column width="300" property="address" label="地址"></el-table-column>
                    </el-table>
                    <el-button size="mini" type="primary">查看更多</el-button>
                  </el-popover>
                  <span v-popover:popover4 v-text="scope.row.HostName" style="color: #409EFF;cursor: pointer;"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="IPIn"
                label="内网IP"
                >
              </el-table-column>
              <el-table-column
                prop="IPOut"
                label="外网IP"
                >
              </el-table-column>
              <el-table-column
                prop="Cpu"
                label="CPU">
              </el-table-column>
              <el-table-column
                prop="RAM"
                label="内存">
              </el-table-column>
              <el-table-column
                prop="IsOpen"
                label="主机状态">
                <template slot-scope="scope">
                  
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="detail(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="block" style="text-align: center;">
              <el-pagination
                @size-change="aaa"
                @current-change="aaa"
                :current-page="1"
                :page-size="20"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>

          </el-card>
          
          <div class="empty"></div>

        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Hosts } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  mounted() {},
  data() {
    return {
      value1: false,
      tableHeight: document.documentElement.clientHeight - 235,
      total: 0,
      vpsData: [],

      loadingflag: true,

      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    };
  },
  methods: {
    detail(index, row) {
      this.$router.push({
        path: `/backstage/hosts/${row.ID}`
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    aaa() {
      console.log(this.multipleSelection);
    },
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    // 获取主机信息
    async getVPSList(pageIndex = 1) {
      this.loadingflag = true;
      try {
        const data = await utils.post(API.GET_VPS_LIST, {
          pageIndex,
          pageNumber: 20
        });

        if (data.status) {
          this.total = data.data.count;

          data.data.List.forEach(item => {

            for (let i in item) {
              if (item[i] === null) item[i] = '';
            }
            this.vpsData.push(item);

          });
          this.loadingflag = false;
          return;
        }

        utils.error(data.msg);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.setNavActive("2");
    this.setBreadcrumb(Hosts);
    utils.setScpoe(this);
    this.getVPSList();
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable.scss';

#gn {
  @extend .pager;
  .detailInfo {
    font-size: 0.9rem;

    .grid-content {
      margin-bottom: 5px;
    }
  }
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
