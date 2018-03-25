<template>
  <div id="tasks">
    <el-tabs tab-position="left">
      <el-tab-pane label="任务管理">

        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>任务管理表</span>
                </div>
                <div>
                  
                  <el-table
                    v-loading="loadingData"
                    :data="tbTaskList"
                    :height="tableHeight"
                    border
                    ref="tb"
                    style="width: 100%; border: 0 none;"
                    @expand-change="setRuleData">
                    <el-table-column type="expand">
                      <template slot-scope="props">



                      </template>
                    </el-table-column>
                    <el-table-column
                      label="任务下发时间">
                      <template slot-scope="scope">
                        {{ scope.row.CollectGapSeconds }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="任务执行时间">
                      <template slot-scope="scope">
                        {{ scope.row.CollectSeconds }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="最后采集时间">
                      <template slot-scope="scope">
                        {{ scope.row.LastCollectTime }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="描述">
                      <template slot-scope="scope">
                        {{ scope.row.Description }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteTask(scope.row.ID)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="block" style="text-align: center;">
                    <el-pagination
                      @current-change="setTaskPage"
                      :current-page="1"
                      :page-size="20"
                      layout="total, prev, pager, next, jumper"
                      :total="totalTask">
                    </el-pagination>
                  </div>

                </div>
              </el-card>
            </div>
          </el-col>

        </el-row>

      </el-tab-pane>
      <el-tab-pane label="添加任务">

        <el-form ref="form" :model="addData" label-width="130px">
          <el-form-item label="任务下发时间间隔">
            <el-input-number v-model="addData.CollectGapSeconds" :step="1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="任务执行时间">
            <el-input-number v-model="addData.CollectSeconds" :step="1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="校验规则">
            <el-select
              v-model="addData.CheckRuleID"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%;"
              placeholder="校验规则">
              <el-option
                v-for="item in checkRuleList"
                :key="item.ID"
                :label="item.Url"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="addData.Description"></el-input>
          </el-form-item>
          <el-form-item label="采集规则">
            <el-button type="primary" @click="initRule">选择校验规则</el-button>
            <br>
            <span v-text="curTaskRuleUrl"></span>
            <el-dialog title="选择采集规则" :visible.sync="showSelectRuleTable">
              <el-table :data="showRuleList" border v-loading="loadingRule">
                <el-table-column property="url" label="URL"></el-table-column>
                <el-table-column
                  label="操作"
                  width="130">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" :disabled="scope.row.selected" @click="selectTaskRule(scope.row)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align: center;">
                <el-pagination
                  @current-change="setRulePage"
                  :current-page="1"
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="totalRule">
                </el-pagination>
              </div>
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addTask">立即创建</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Tasks } from "../../common/config/breadcrumb";
import utils from "../../assets/js/utils.esm";
import API from "../../common/config/api";


export default {
  data() {
    return {
      addData: {
        CollectGapSeconds: 0,
        CheckRuleID: "",
        CollectSeconds: 0,
        TaskRuleID: 0,
        Is_Vaild: 0,
        Description: ''
      },

      checkRuleList: [],
      ruleList: [],
      showSelectRuleTable: false,
      showRuleList: [],

      totalRule: 0,
      curTaskRuleUrl: "未选择",

      totalTask: 0,

      tableHeight: document.documentElement.clientHeight - 230,

      tbTaskList: [],

      curTaskData: {},
      curTaskDataBackup: {},
      curExRow: null,

      loadingData: true,
      loadingRule: true,
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),

    setRuleData(row, eRows) {
      this.curTaskData = Object.assign({}, row);
      this.curTaskDataBackup = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID)
        this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },

    // 添加任务
    async addTask() {
      const addData = Object.assign({}, this.addData);
      addData.CheckRuleID = addData.CheckRuleID.join(',');

      try {
        const { status, data, msg } = await utils.post(API.AU_COLLECTION_TASK, addData);

        if (status) {
          this.getTaskList();
          utils.success(msg);
          return;
        }
        utils.error(msg);
      } catch (e) {
        console.log(e);
        utils.errormsg();
      }
    },

    // 删除任务
    async deleteTask() {},

    selectTaskRule(item) {
      this.ruleList.forEach(item => {
        item.selected = false;
      });
      this.curTaskRuleUrl = item.url;
      item.selected = true;
      this.addData.TaskRuleID = item.id;
    },

    // 获取校验规则列表
    async getCheckRuleList() {
      try {
        const { status, data, msg } = await utils.post(API.GET_CHECK_RULE_LIST);

        if (status) {
          this.checkRuleList = data.list;
          return;
        }

        utils.error(msg);
      } catch (e) {
        utils.errormsg();
      }
    },

    // 设置任务分页
    setTaskPage(index) {
      this.getTaskList(index);
    },

    // 设置采集规则分页
    setRulePage(index) {
      this.showRuleList = [];
      for (let i = (index - 1) * 10; i < index * 10; i++) {
        if (this.ruleList[i]) {
          this.showRuleList.push(this.ruleList[i]);
        } else {
          break;
        }
      }
    },

    // 初始化采集规则
    async initRule() {
      this.showSelectRuleTable = true;

      if (this.ruleList.length === 0) {
        this.loadingRule = true;
        try {
          const { status, data, msg } = await utils.post(API.GET_TASK_RULE_LIST_ONLY_URL);

          if (status) {
            data.list.forEach(item => {
              item.selected = false;
            });
            this.ruleList = data.list;
            this.totalRule = this.ruleList.length;
            this.setRulePage(1);
            this.loadingRule = false;
            return;
          }
        } catch (e) {
          console.log(e);
          utils.errormsg();
          this.loadingRule = false;
        }
      }
    },

    // 获取采集任务列表
    async getTaskList(pageIndex = 1) {
      this.loadingData = true;
      try {
        const { status, data, msg } = await utils.post(
          API.GET_COLLECTION_TASK_LIST,
          {
            pageIndex,
            pageNumber: 20
          }
        );

        if (status) {
          this.loadingData = false;;
          this.totalTask = data.count;
          this.tbTaskList = data.list;
          return;
        }

        this.loadingData = false;;
      } catch (e) {
        this.loadingData = false;;
        console.log(e);
      }
    },
  },
  mounted() {
    this.setNavActive("11");
    this.setBreadcrumb(Tasks);
    utils.setScpoe(this);

    this.getCheckRuleList();
    this.getTaskList();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#tasks {
  @extend .pager;
}
</style>
