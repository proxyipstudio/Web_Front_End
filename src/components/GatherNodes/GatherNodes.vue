<template>
  <div id="gn">
    <el-row :gutter="10">
      <el-col :span="17">
        <div class="grid-content">

          <div style="margin-bottom: 10px;">
            <el-input placeholder="搜索" style="margin-bottom: 10px;"></el-input>

            <el-button type="primary" icon="el-icon-success">打开节点</el-button>
            <el-button type="primary" icon="el-icon-error">关闭节点</el-button>
            <el-button type="danger" icon="el-icon-delete">删除节点</el-button>
          </div>

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>扫描节点列表</span>
              <div style="float: right; padding: 3px 0">
                <span style="color: #409EFF; cursor: pointer;" @click="curTable = 'check'"><span v-if="curTable === 'gather'">&emsp;</span><i class="el-icon-check" v-if="curTable === 'check'"></i>&nbsp;校验节点</span>
                &emsp;
                <span style="color: #409EFF; cursor: pointer;" @click="curTable = 'gather'"><span v-if="curTable === 'check'">&emsp;</span><i class="el-icon-check" v-if="curTable === 'gather'"></i>&nbsp;采集节点</span>
              </div>
             
            </div>
            
            <div v-if="curTable === 'check'">
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
                  prop="hostid"
                  width="100"
                  label="宿主机编号">
                </el-table-column>
                <el-table-column
                  prop="programname"
                  label="程序名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="runtime"
                  label="运行时间"
                  >
                </el-table-column>
                <el-table-column
                  prop="scanrate"
                  sortable
                  width="120"
                  label="扫描速率">
                </el-table-column>
                <el-table-column
                  prop="scancount"
                  label="总扫描数">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="block" style="text-align: center;">
                <el-pagination
                  @size-change="aaa"
                  @current-change="aaa"
                  :current-page="1"
                  :page-sizes="[10, 20, 40, 100]"
                  :page-size="20"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
                </el-pagination>
              </div>
            </div>

            <div v-if="curTable === 'gather'">
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
                  prop="hostid"
                  width="100"
                  label="宿主机编号">
                </el-table-column>
                <el-table-column
                  prop="programname"
                  label="程序名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="runtime"
                  label="运行时间"
                  >
                </el-table-column>
                <el-table-column
                  prop="scanrate"
                  sortable
                  width="120"
                  label="我是菜鸡">
                </el-table-column>
                <el-table-column
                  prop="scancount"
                  label="总扫描数">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="block" style="text-align: center;">
                <el-pagination
                  @size-change="aaa"
                  @current-change="aaa"
                  :current-page="1"
                  :page-sizes="[10, 20, 40, 100]"
                  :page-size="20"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="50">
                </el-pagination>
              </div>
            </div>

          </el-card>
          
          <div class="empty"></div>

        </div>
      </el-col>
      <el-col :span="7">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { GatherNodes } from "../../common/config/breadcrumb";

export default {
  mounted() {},
  data() {
    return {
      curTable: "check",
      value1: false,
      tableHeight: document.documentElement.clientHeight - 335,
      multipleSelection: [],
      curGatherNodeInfo: null,
      gnData: [
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "38/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        },
        {
          id: 112,
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        }
      ]
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
    })
  },
  created() {
    this.setNavActive("1");

    this.setBreadcrumb(GatherNodes);
  }
};
</script>

<style lang="scss" scoped>
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
