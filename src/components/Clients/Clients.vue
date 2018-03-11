<template>
  <div id="clients">
    <el-tabs tab-position="left">
      <el-tab-pane label="版本控制">

      </el-tab-pane>
      <el-tab-pane label="添加客户端">

      </el-tab-pane>
      <el-tab-pane label="模块管理">
        

        <el-row>
          <el-button type="primary" style="margin: 10px 0;">创建模块</el-button>
          
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>模块表</span>
                </div>
                <div>
                  <el-table
                    v-loading="loadingDataModule"
                    :data="tbModule"
                    border
                    ref="tb"
                    style="width: 100%; border: 0;"
                    @expand-change="setRuleDataModule">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        
                        <el-form ref="form" :model="curModule" label-width="80px">
                          <el-form-item label="英文名">
                            <el-input v-model="curModule.C_Key"></el-input>
                          </el-form-item>
                          <el-form-item label="中文名">
                            <el-input v-model="curModule.C_Name"></el-input>
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="curModule.C_Description"></el-input>
                          </el-form-item>
                          <el-form-item label="">
                            <el-button type="primary" size="mini" @click="updateModule">保存</el-button>
                          </el-form-item>
                        </el-form>

                      </template>
                    </el-table-column>
                    <el-table-column
                      label="英文名">
                      <template slot-scope="scope">
                        {{ scope.row.C_Key }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="中文名">
                      <template slot-scope="scope">
                        {{ scope.row.C_Name }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </div>
          </el-col>

        </el-row>

        <div class="empty"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Clients } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      tbModuleTotal: 0,
      tableHeight: document.documentElement.clientHeight - 230,
      
      tbModule: [],
      curModule: {},
      curModuleBackup: {},
      curExRow: null,

      loadingDataModule: true
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive", 
      setBreadcrumb: "setBreadcrumb"
    }),

    // 模块管理相关
    setRuleDataModule(row, eRows) {
      this.curModule = Object.assign({}, row);
      this.curModuleBackup = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },

    // 获取模块
    async getModules() {
      try {
        const { status, data, msg } = await utils.post(API.GET_MODULE);

        if (status) {
          this.tbModule = data.list;

          this.tbModule.forEach(item => {
            for (let i in item) {
              item[i] = item[i] || '';
            }
          });
          
          this.loadingDataModule = false;
        }

      } catch (e) {
        this.utils.errormsg();
      }
    },

    // 修改模块
    async updateModule() {
      try {
        this.curModule.Id = this.curModule.CodeId; 
        const {status, data, msg} = await utils.post(API.AU_MODULE, this.curModule);

        if (status) {
          utils.success(msg);

          this.tbModule.forEach(item => {
            if (item.CodeId === this.curModule.Id) {
              item.C_Key = this.curModule.C_Key;
              item.C_Name = this.curModule.C_Name;
              item.C_Description = this.curModule.C_Description;
            }
          });

          return;
        }

        utils.error(msg);
      } catch (e) {
        console.log(e);
        utils.errormsg();
      }
    }
  },

  /**
   * 挂载后加载
   */
  mounted() {
    this.setNavActive("1-2");
    this.setBreadcrumb(Clients);
    utils.setScpoe(this);

    this.getModules();
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #clients {
    @extend .pager;
  }
</style>
