<template>
  <div id="clientinformation">

    <el-tabs tab-position="left">
      <el-tab-pane label="客户端管理">

        <el-card body-style="padding: 0;">
          <div slot="header" class="clearfix">
            <span>客户端列表</span>
          </div>
          <div>

          <el-table
            v-loading="loadingDataClient"
            :data="tbClients"
            border
            ref="tb"
            style="width: 100%; border: 0;"
            @expand-change="setRuleDataClient">
            <el-table-column type="expand">
              <template slot-scope="props">
                
                <el-form ref="form" :model="curClient" label-width="80px">
                  <el-form-item label="英文名">
                    <el-input v-model="curClient.C_Key"></el-input>
                  </el-form-item>
                  <el-form-item label="中文名">
                    <el-input v-model="curClient.C_Name"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="curClient.C_Description"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" size="mini" @click="updateClient">保存</el-button>
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
                <el-button type="danger" size="mini" @click="delClient(scope.row.CodeId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="添加客户端">
        <el-form :model="addClientForm" label-width="100px">
          <el-form-item label="模块英文名">
            <el-input v-model="addClientForm.C_Key"></el-input>
          </el-form-item>
          <el-form-item label="模块中文名">
            <el-input v-model="addClientForm.C_Name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addClientForm.C_Description"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="addClient">添 加</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

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
      showClientForm: false,
      curClient: {},
      curClientBackup: {},
      curExRow: null,

      loadingDataClient: true,

      addClientForm: {
        ParentId: this.$route.params.id,
        C_Key: '',
        C_Name: '',
        C_Description: ''
      },

      tbClients: []
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),

    setRuleDataClient(row, eRows) {
      this.curClient = Object.assign({}, row);
      this.curClientBackup = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },

    // 删除客户端
    async delClient(id) {
      if (id === '') {
        utils.error('无效操作');
        return;
      }

      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { status, data, msg } = await utils.post(API.DELETE_CODE, {id});

          if (status) {
            utils.success(msg);
            this.tbClients.forEach((item, index) => {
              if (item.CodeId === id) this.tbClients.splice(index, 1);
            });
            return;
          }

          utils.error(msg);
        } catch (e) {
          utils.errormsg();
        }
      }).catch(() => {});

    },

    // 跳转到详情
    toInfo(id) {
      if (id === '') {
        utils.error('无效操作');
        return;
      }

      this.$router.push({
        path: `/backstage/modules/clients/${this.$route.params.id}/versions/${id}`
      });
    },

    // 更新客户端
    async updateClient() {
      if (this.curClient.CodeId === '') {
        utils.error('无效操作');
        return;
      }

      if (this.curClient.C_Key === '' || this.curClient.C_Name === '' || this.curClient.C_Description === '') {
        utils.error('信息填写不完整');
        return;
      }

      let updateCurClientData = Object.assign({}, this.curClient);
      updateCurClientData.Id = updateCurClientData.CodeId;
      updateCurClientData.ParentId = updateCurClientData.C_ParentCodeId;
      delete updateCurClientData.C_ParentCodeId;
      delete updateCurClientData.CodeId;

      try {
        const { status, data, msg } = await utils.post(API.AU_CLIENT, updateCurClientData);

        if (status) {
          utils.success(msg);

          this.tbClients.forEach(item => {
            if (item.CodeId === updateCurClientData.Id) {
              item.C_Key = updateCurClientData.C_Key;
              item.C_Name = updateCurClientData.C_Name;
              item.C_Description = updateCurClientData.C_Description;
            }
          });

          return;
        }

        utils.error(msg);
      } catch (e) {
        utils.errormsg();
      }
    },

    // 添加客户端
    async addClient() {
      if (this.addClientForm.ParentId === '') {
        utils.error('无效操作');
        return;
      }

      if (this.addClientForm.C_Key === '' || this.addClientForm.C_Name === '' || this.addClientForm.C_Description === '') {
        utils.error('信息填写不完整');
        return;
      }

      try {
        const { status, data, msg } = await utils.post(API.AU_CLIENT, this.addClientForm);

        if (status) {
          utils.success(msg);
          this.getClientList();
          return;
        }

        utils.error(msg);
      } catch (e) {
        utils.errormsg();
      }
    },

    // 获取客户端列表
    async getClientList() {
      this.loadingDataClient = true;
      if (this.$route.params.id === '') {
        utils.error('无效操作');
        return;
      }

      try {
        const { status, data, msg } = await utils.post(API.GET_CLIENT , {ModuleId: this.$route.params.id});

        if (status) {
          this.tbClients = data.list;
          this.tbClients.forEach(item => {
            for (let i in item) item[i] = item[i] || '';
          });
          this.loadingDataClient = false;
          return;
        }
        utils.error(msg);
      } catch (e) {
        utils.errormsg();
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
