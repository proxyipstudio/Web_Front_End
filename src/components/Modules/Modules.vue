<template>
  <div id="modules">

    <el-row>
      <el-button type="primary" style="margin: 10px 0;" @click="showAddModuleForm = true">创建模块</el-button>

      <el-dialog
        title="创建模块"
        :visible.sync="showAddModuleForm"
        width="50%">
        <el-form :model="addModuleForm" label-width="100px">
          <el-form-item label="模块英文名">
            <el-input v-model="addModuleForm.C_Key"></el-input>
          </el-form-item>
          <el-form-item label="模块中文名">
            <el-input v-model="addModuleForm.C_Name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addModuleForm.C_Description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddModuleForm = false">取 消</el-button>
          <el-button type="primary" @click="addModule">添 加</el-button>
        </span>
      </el-dialog>

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
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="toInfo(scope.row.CodeId)">详情</el-button>
                    <el-button type="danger" size="mini" @click="delModule(scope.row.CodeId)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
    <div class="empty"></div>
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

      loadingDataModule: true,

      showAddModuleForm: false,
      addModuleForm: {
        C_Key: '',
        C_Name: '',
        C_Description: ''
      }
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

    // 查看详情
    toInfo(id) {
      if (id === '') {
        utils.error('无效操作');
        return;
      }
      this.$router.push({
        path: `/backstage/modules/clients/${id}`
      });
    },

    // 添加模块
    async addModule() {

      if (this.addModuleForm.C_Key === '' || this.addModuleForm.C_Name === '') {
        utils.error('信息填写不完整');
        return;
      }

      try {
        const {status, data, msg} = await utils.post(API.AU_MODULE, this.addModuleForm);

        if (status) {
          utils.success(msg);
          return;
        }

        utils.error(msg);

      } catch (e) {
        utils.errormsg();
      }

    },

    //删除模块
    async delModule(id) {
      if (id === '') return utils.error('无效操作');

      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const {status, data, msg} = await utils.post(API.DELETE_CODE, {id});

          if (status) {
            this.tbModule.forEach((item, index) => {
              if (item.CodeId === id) {
                this.tbModule.splice(index, 1);
              }
            });
            utils.success(msg);
            return;
          }
          utils.error(msg);
        } catch (e) {
          utils.errormsg();
        }
      }).catch(() => {});
    },

    // 获取模块
    async getModules() {
      try {
        const { status, data, msg } = await utils.post(API.GET_MODULE);

        if (status) {
          this.tbModule = data.list;

          this.tbModule.forEach(item => {
            for (let i in item) item[i] = item[i] || '';
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
  
  #modules {
    @extend .pager;
  }
</style>
