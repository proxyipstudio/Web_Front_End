<template>
  <div id="checknode">
        <el-row :gutter="10">
      <el-col :span="24">
      <!-- <el-col :span="17"> -->
        <div class="grid-content">

          <div style="margin: 10px 0;">
            <el-button type="primary" icon="el-icon-success" @click="batchOp(false)" :disabled="isDisabled">打开节点</el-button>
            <el-button type="danger" icon="el-icon-error" @click="batchOp(true)" :disabled="isDisabled">关闭节点</el-button>
          </div>

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>校验节点列表</span>
            </div>
            
            <div>
              <el-table
              :data="gnData"
              border
              :height="tableHeight"
              style="width: 100%; border: 0 none"
              ref="gnTable"
              @selection-change="handleSelectionChange"
              :row-class-name="tableRowClassName">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="节点状态">
                  <template slot-scope="scope">
                    <div @click="curNode = scope.row">
                      <el-switch
                        v-model="scope.row.a.IsOpen"
                        active-color="#13ce66"
                        @change="setNodeState(scope.row)"
                        inactive-color="#ff4949"
                        :disabled="isDisabled">
                      </el-switch>
                      <span v-text="scope.row.a.IsOpen ? '开' : '关'"></span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="a.Name"
                  label="程序名称">
                </el-table-column>
                <el-table-column
                  prop="a.Version"
                  label="版本"
                  >
                </el-table-column>
                <el-table-column
                  prop="a.startTime"
                  label="开始时间"
                  >
                </el-table-column>
                <el-table-column
                  prop="a.Endtime"
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="a.ScanRate"
                  label="扫描速率">
                </el-table-column>
                <el-table-column
                  prop="a.ScanCount"
                  label="本次扫描数">
                </el-table-column>
                <el-table-column
                  prop="a.ScanSumCount"
                  label="总扫描数">
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
import { CheckNode } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      tableHeight: document.documentElement.clientHeight - 290,
      multipleSelection: [],
      curGatherNodeInfo: null,
      gnData: [],

      total: 0,
      curNode: {},

      isDisabled: false,
    };
  },
  methods: {

    // 批量操作
    async batchOp(stat) {
      // 判断是否选中节点
      if (this.multipleSelection.length === 0) {
        utils.error('请选择节点');
        return;
      }

      const statText = stat ? '关闭' : '开启';
      
      // 选取需要改变状态的节点
      let needOpNode = [];
      this.multipleSelection.forEach(item => {
        if (item.a.IsOpen === stat) needOpNode.push(item);
      });

      // 判断是否需要下一步操作
      if (needOpNode.length === 0) {
        utils.info(`选中的节点都处于${statText}状态`);
        return;
      }

      let total = needOpNode.length;
      let done = 0;

      this.isDisabled = true;

      utils.info(`开始批量${statText}节点`);

      for (let i = 0; i < total; i ++) {
        const Id = needOpNode[i].a.Id;
        const IsOpen = needOpNode[i].a.IsOpen ? 0 : 1;

        try {
          const { status, data, msg } = await utils.post(API.OPEN_NODE, { Id, IsOpen });

          if (status) {
            utils.msg(`第${i + 1}个节点${statText}成功`);
            needOpNode[i].a.IsOpen = !needOpNode[i].a.IsOpen;
            done ++;
          } else {
            utils.msgErr(`第${i + 1}个节点${statText}失败`);
          }

        } catch (e) {

          utils.msgErr(`第${i + 1}个节点${statText}失败`);

        }
      }

      utils.success(`共${statText}${total}个节点, ${statText}失败为${total - done}个`);
      this.isDisabled = false;

    },

    handleEdit(index, row) {
      console.log(index, row);
      this.curGatherNodeInfo = {
        id: 112,
        version: "12",
        programname: "呱呱",
        runtime: "199s",
        starttime: "2017-1-1",
        scanrate: "33/s",
        scancount: "998",
        hostip: "127.0.1.2",
        hostid: "9"
      };
    },
    async setNodeState(item) {
      const IsOpen = item.a.IsOpen ? 1 : 0;
      try {
        const { status, data, msg } = await utils.post(API.OPEN_NODE, { IsOpen, Id: item.a.Id });

        if (status) {
          utils.success(msg);
          return;
        }

        utils.error(msg);
        item.a.IsOpen = !item.a.IsOpen;
      } catch(e) {
        utils.errormsg();
        item.a.IsOpen = !item.a.IsOpen;
      }
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    async getGatherNodes(pageIndex = 1) {
      try {
        const { status, data, msg } = await utils.post(API.GET_NODE_INFO_LIST, {
          pageIndex,
          pageNumber: 20,
          NodeType: 2
        });

        if (status) {
          let cpData = data.list;
          cpData.forEach(item => {
            item.a.IsOpen = item.a.IsOpen ? true : false;
          });
          this.gnData = cpData;
          return;
        }
        this.total = data.count;
        utils.error(msg);
      } catch (e) {
        console.log(e);
        utils.errormsg();
      }

      
    },
  },
  mounted() {
    this.setNavActive("1-1");
    this.setBreadcrumb(CheckNode);
    utils.setScpoe(this);
    this.getGatherNodes();
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #checknode {
    .detailInfo {
      font-size: 0.9rem;

      .grid-content {
        margin-bottom: 5px;
      }
    }
  }
</style>
