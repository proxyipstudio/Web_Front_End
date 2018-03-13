<template>
  <div id="gn">
    <el-row :gutter="10">
      <el-col :span="24">
      <!-- <el-col :span="17"> -->
        <div class="grid-content">

          <div style="margin: 10px 0;">

            <el-button type="primary" icon="el-icon-success">打开节点</el-button>
            <el-button type="danger" icon="el-icon-error">关闭节点</el-button>
            <el-button type="danger" icon="el-icon-delete">删除节点</el-button>
          </div>

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>采集节点列表</span>
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
                  width="55"
                  prop="isrunning">
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
                <el-table-column
                  label="节点状态">
                  <template slot-scope="scope">
                    <div @click="curNode = scope.row">
                      <el-switch
                        v-model="scope.row.a.IsOpen"
                        active-color="#13ce66"
                        @change="setNodeSatate"
                        inactive-color="#ff4949">
                      </el-switch>
                      <span v-text="scope.row.a.IsOpen ? '开' : '关'"></span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
            </div>

          </el-card>
          
          <div class="empty"></div>

        </div>
      </el-col>
      <!-- <el-col :span="7">
        <div class="grid-content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>详细信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">噶？</el-button>
            </div>

            <div class="detailInfo">
              <div v-if="!curGatherNodeInfo" style="text-align: center;">
                暂无数据  
              </div>

              <div v-if="!!curGatherNodeInfo">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>节点状态</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            <el-switch
                              v-model="value1"
                              active-text="开"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                              inactive-text="关">
                            </el-switch>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>程序名称</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            生死对决
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>版本</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            12
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>运行时间</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            156小时
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>开始时间</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            1997-01-25 14:22:11
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>扫描速率</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            333条/秒
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>总扫描数</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            99966条
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>宿主机IP</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            129.332.112.124
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-row>
                        <el-col :span="9">
                          <div class="grid-content">
                            <span>宿主机编号</span>
                          </div>
                        </el-col>
                        <el-col :span="15">
                          <div class="grid-content">
                            ASDFKJ11245
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-button type="danger" style="width: 100%">删除节点</el-button>
                  </el-col>
                </el-row>
              </div>

            </div>
          </el-card>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { ScadaNode } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  mounted() {},
  data() {
    return {
      tableHeight: document.documentElement.clientHeight - 290,
      multipleSelection: [],
      curGatherNodeInfo: null,
      gnData: [
        {
          "a":{
              "Id":1,
              "HostId":1,
              "Name":"测试节点1",
              "Version":"1.0.0.0",
              "startTime":null,
              "Endtime":null,
              "ScanRate":"33/s",
              "ScanCount":198,
              "ScanSumCount":209,
              "IsOpen":false,
              "NodeType":1
          },
          "HostName":"vps测试节点1",
          "SerialNumber":null
        }
      ],

      total: 0,
      
      curNode: {},
    };
  },
  methods: {
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
    setNodeSatate(val) {
      try {
        
      } catch(e) {

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
          NodeType: 1
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
    this.setBreadcrumb(ScadaNode);
    utils.setScpoe(this);
    this.getGatherNodes();
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable.scss';

#gn {
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
