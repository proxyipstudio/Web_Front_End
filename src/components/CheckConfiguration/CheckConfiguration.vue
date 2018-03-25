<template>
  <div id="cc">
    <el-tabs tab-position="left" @tab-click="tabRefresh">
      <el-tab-pane label="规则">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>规则表配置项</span>
                </div>
                <div>
                  
                  <el-table
                    v-loading="loadingData"
                    :data="tbChecks"
                    :height="tableHeight"
                    border
                    ref="tb"
                    style="width: 100%; border: 0 none;"
                    @expand-change="setRuleData">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              采集地址
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.Url" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              IP
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegIp" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              端口
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegPort" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              匿名度
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegAnonymous" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              类型
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegType" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              国家
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegCountry" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              省市
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegProvince" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">
                              省市
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.RegCity" class="editInput" placeholder="空">
                            </div>
                          </el-col>
                        </el-row>

                        <el-row class="editItem">
                          <el-col :span="4">
                            <div class="grid-content title">

                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <el-button type="primary" size="mini" @click="update" :loading="updating" style="width: 70px;">保存</el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="采集地址">
                      <template slot-scope="scope">
                        {{ scope.row.Url | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="IP">
                      <template slot-scope="scope">
                        {{ scope.row.RegIp | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="端口">
                      <template slot-scope="scope">
                        {{ scope.row.RegPort | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="匿名度">
                      <template slot-scope="scope">
                        {{ scope.row.RegAnonymous | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="类型">
                      <template slot-scope="scope">
                        {{ scope.row.RegType | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="国家">
                      <template slot-scope="scope">
                        {{ scope.row.RegCountry | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="省">
                      <template slot-scope="scope">
                        {{ scope.row.RegProvince | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="市">
                      <template slot-scope="scope">
                        {{ scope.row.RegCity | formatTableDataLength }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteTaskRule(scope.row.ID)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </div>
              </el-card>
            </div>
          </el-col>

        </el-row>

      </el-tab-pane>
      <el-tab-pane label="添加">

        <el-form ref="form" :model="addData" label-width="120px">
          <el-form-item label="*采集地址">
            <el-input v-model="addData.Urls"></el-input>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="addData.RegIp"></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="addData.RegPort"></el-input>
          </el-form-item>
          <el-form-item label="匿名度">
            <el-input v-model="addData.RegAnonymous"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="addData.RegType"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-model="addData.RegCountry"></el-input>
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="addData.RegProvince"></el-input>
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="addData.RegCity"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add" :loading="adding">添加</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { CheckConfiguration } from "../../common/config/breadcrumb";
import API from "../../common/config/api";
import utils from "../../assets/js/utils.esm";
import { throws } from 'assert';
// import axios from 'axios';


export default {
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    setRuleData(row, eRows) {
      this.curRuleData = Object.assign({}, row);
      this.curRuleDataBackUp = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },
    // tab切换后刷新添加数据
    tabRefresh() {
      this.getRuleList();
    },
    // 添加规则
    async add() {
      if (this.addData.Urls === '') {
        utils.error('采集地址不能为空');

        return;
      }

      if (!utils.verify('url', this.addData.Urls.toLowerCase())) {
        utils.error('采集地址格式不正确');

        return;
      }

      this.adding = true;
      try {
        const data = await utils.post(API.AU_CHECK_RULE, this.addData);

        if (data.status) {
          
          utils.success(data.msg);

          for (let i in this.addData) {
            this.addData[i] = '';
          }

          this.adding = false;          
          return;
        }

        utils.error(data.msg);
        this.adding = false;
      } catch (e) {
        utils.errormsg();
        this.adding = false;
        console.log(e);
      }
    },
    // 更新规则
    async update() {
      if (this.curRuleData.Url === '') {
        utils.error('采集地址不能为空');
        return;
      }

      if (!utils.verify('url', this.curRuleData.Url.toLowerCase())) {
        utils.error('采集地址格式不正确');

        return;
      }
      
      const updateData = {
        Urls: this.curRuleData.Url,
        RegIp: this.curRuleData.RegIp,
        RegPort: this.curRuleData.RegPort,
        RegAnonymous: this.curRuleData.RegAnonymous,
        RegType: this.curRuleData.RegType,
        RegCountry: this.curRuleData.RegCountry,
        RegProvince: this.curRuleData.RegProvince,
        RegCity: this.curRuleData.RegCity,
        ID: this.curRuleData.ID
      }

      this.updating = true;

      try {
        const data = await utils.post(API.AU_CHECK_RULE, updateData);

        if (data.status) {
          utils.success(data.msg);

          for (let i = 0; i < this.tbChecks.length; i ++) {
            if (this.tbChecks[i].ID === updateData.ID) {
              Object.assign(this.tbChecks[i], updateData);
              this.tbChecks[i].Url = updateData.Urls;
              break;
            }
          } 
          this.updating = false;
          return;
        }
 
        utils.error(data.msg);
        this.updating = false;
      } catch (e) {
        this.updating = false;
        utils.errormsg();
      }
    },
    // 加载采集规则
    async getRuleList() {
      this.loadingData = true;
      try {
        const data = await utils.post(API.GET_CHECK_RULE_LIST);

        let tbData = data.data.list;

        tbData.forEach(item => {
          for(let i in item) {
            if (item.hasOwnProperty(i)) {
              if (item[i] === null) item[i] = '';
            }
          }
        });
        
        this.tbChecks = tbData;
        this.loadingData = false;
      } catch (e) {
        this.loadingData = false;
        utils.errormsg();
        console.log(e);
      }
    },
    // 删除采集规则
    async deleteTaskRule(id) {
      if (!id) {
        utils.error('无效操作');
        return;
      }

      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const data = await utils.post(API.DELETE_CHECK_RULE, { id });

          if (data.status) {
            utils.success(data.msg);

            for (let i = 0; i < this.tbChecks.length; i ++) {
              if (this.tbChecks[i].ID === id) {
                this.tbChecks.splice(i, 1);
                break;
              }
            }

            this.total -= 1;
            return;
          }

          utils.error(data.msg);
        } catch (e) {
          utils.errormsg();
          console.log(e);
        }
      }).catch(() => {});
      
    }
  },
  async mounted() {
    this.setBreadcrumb(CheckConfiguration);
    this.setNavActive("5-2");

    utils.setScpoe(this);
    
    this.getRuleList();
  },
  data() {
    return {
      tbChecks: [],
      curRuleData: {},
      curExRow: null,
      tableHeight: document.documentElement.clientHeight - 197,

      updating: false,
      loadingData: true,
      adding: false,

      addData: {
        Urls: '',
        RegIp: '',
        RegPort: '',
        RegAnonymous: '',
        RegType: '',
        RegCountry: '',
        RegProvince: '',
        RegCity: '',
      },
    };
  },
  filters: {
    formatTableDataLength(val) {
      if (val.length > 12) {
        return val.substring(0, 12) + "...";
      }
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#cc {
  @extend .pager;
    
  .editItem {
    margin-bottom: 15px;

    .editInput {
      width: 100%;
      border: 0 none;
      outline: none;
      background: transparent;
      // border-bottom: 2px solid $blue;
      padding: 3px;
      transition: all 0.2s;

      &:focus {
        border-bottom: 2px solid $red;
        font-size: 1.1rem;
      }
    }

    .title {
      padding: 5px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
