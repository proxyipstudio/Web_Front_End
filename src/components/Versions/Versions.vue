<template>
  <div id="versions">

    <el-tabs tab-position="left">
      <el-tab-pane label="版本控制">
        <el-card>
          <div>
            <el-row class="curVersionInfo">
              <el-col :span="4">
                <div class="grid-content">
                  当前版本
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content">
                  Version 1.1.1
                </div>
              </el-col>
            </el-row>
            
            <el-row class="curVersionInfo">
              <el-col :span="4">
                <div class="grid-content">
                  描述
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content">
                  地方撒
                </div>
              </el-col>
            </el-row>

            <el-row class="curVersionInfo">
              <el-col :span="4">
                <div class="grid-content">
                  版本文件
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content">
                  <a href="">下载</a>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-card>
        <div class="empty"></div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>客户端版本管理</span>
                </div>
                <div>
                  
                <el-table
                  v-loading="loadingData"
                  :data="tbClients"
                  border
                  ref="tb"
                  style="width: 100%; border: 0 none;"
                  @expand-change="setRuleData">
                  <el-table-column type="expand">
                    <template slot-scope="props">

                      <el-form ref="form" :model="curVersionData" label-width="80px">
                        <el-form-item label="版本号">
                          <el-input v-model="curVersionData.VersionNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                          <el-input v-model="curVersionData.Description"></el-input>
                        </el-form-item>
                        <el-form-item label="版本文件">
                          <el-upload
                            class="upload-demo"
                            :action="addpostapi"
                            :limit="1"
                            :data="curVersionData"
                            :before-upload="updatecheck"
                            name="VersionFile"
                            :on-error="updateerror"
                            :on-success="updatesuccess"
                            ref="updateForm"
                            :auto-upload="false"
                            :file-list="fileList">
                            <el-button size="small" type="primary">选择文件</el-button>
                            <span slot="tip" class="el-upload__tip">&emsp;只能上传zip文件</span>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="">
                          <el-checkbox v-model="isUpdateVersionFile">修改版本文件</el-checkbox>                              
                        </el-form-item>
                        <el-form-item label="">
                          <el-button size="small" type="success" @click="updateClient">上传到服务器</el-button>        
                        </el-form-item>
                      </el-form>                      

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="版本号">
                    <template slot-scope="scope">
                      {{ scope.row.VersionNumber }}
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="描述">
                    <template slot-scope="scope">
                      {{ scope.row.Description }}
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="版本文件">
                    <template slot-scope="scope">
                      <a :href="scope.row.VersionAddress" target="_blank">下载</a>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini">设置为当前客户端</el-button>
                      <el-button type="danger" size="mini" @click="deleteVersion(scope.row.ID)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="block" style="text-align: center;">
                  <el-pagination
                    @current-change="setPage"
                    :current-page="1"
                    :page-size="20"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>

              </div>
            </el-card>
          </div>
        </el-col>

      </el-row>
      </el-tab-pane>
      <el-tab-pane label="添加版本">

        <el-form ref="form" :model="addVersionData" label-width="80px">
          <el-form-item label="版本号">
            <el-input v-model="addVersionData.VersionNumber"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addVersionData.Description"></el-input>
          </el-form-item>
          <el-form-item label="版本文件">
            <el-upload
              class="upload-demo"
              :action="addpostapi"
              :limit="1"
              :data="addVersionData"
              :before-upload="checkext"
              name="VersionFile"
              :on-error="adderror"
              :on-success="addsuccess"
              ref="addForm"
              :auto-upload="false"
              :file-list="fileList">
              <el-button size="small" type="primary">选择文件</el-button>
              <span slot="tip" class="el-upload__tip">&emsp;只能上传zip文件</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="">
            <el-button size="small" type="success" @click="addClient">上传到服务器</el-button>        
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { Tasks } from "../../common/config/breadcrumb";
import utils from "../../assets/js/utils.esm";
import API from "../../common/config/api";

export default {
  data() {
    return {
      addVersionData: {
        VersionNumber: "",
        Description: "",
        PartOwner: this.$route.params.clientid
      },

      addpostapi: API.AU_VERSION,

      fileList: [],

      curVersionData: {},
      curVersionDataBackUp: {},

      tbClients: [],
      loadingData: true,

      total: 0,
      curPage: 1,

      isUpdateVersionFile: false,

      VersionBreadcrumb: [
        {
          text: "模块",
          route: "/backstage/modules"
        },
        {
          text: "客户端管理",
          route: `/backstage/modules/clients/${this.$route.params.id}`
        },
        {
          text: "版本管理"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),

    updatecheck(file) {
      const ext = file.name.split(".").pop();

      if (ext !== "zip") {
        utils.error("压缩文件后缀必须为zip");
        return false;
      }

      if (
        this.curVersionData.VersionNumber === "" ||
        this.curVersionData.Description === "" ||
        this.curVersionData.PartOwner === ""
      ) {
        utils.error("信息填写不完整");
        return false;
      }

      return true;
    },

    // 修改失败回调
    updateerror() {
      utils.errormsg();
    },

    // 修改成功回调
    updatesuccess({ status, data, msg }) {
      if (status) {
        utils.success(msg);
        for (let i = 0, len = this.tbClients.length; i < len; i ++) {
          if (this.tbClients[i].ID === this.curVersionData.ID) {
            this.tbClients[i].VersionNumber = this.curVersionData.VersionNumber;
            this.tbClients[i].Description = this.curVersionData.Description;
            break;
          }
        }
        return;
      } else {
        utils.error(msg);
      }
      this.fileList = [];
    },

    // 修改版本
    async updateClient() {
      if (!this.isUpdateVersionFile) {
        try {
          const res = await utils.post(API.AU_VERSION, {
            ID: this.curVersionData.ID,
            VersionNumber: this.curVersionData.VersionNumber,
            PartOwner: this.curVersionData.PartOwner,
            Description: this.curVersionData.Description
          });

          if (res.status) {
            this.updatesuccess(res);
            return;
          }
          utils.error(res.msg);
        } catch (e) {
          console.log(e);
          utils.errormsg();
        }
        return;
      }
      this.$refs.updateForm.submit();
    },

    async deleteVersion(Id) {
      if (Id === '') {
        utils.error('无效操作');
        return;
      }

      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        try {
          const { status, data, msg } = await utils.post(API.DELETE_VERSION, { Id });

          if (status) {
            for (let i = 0, len = this.tbClients.length; i < len; i ++) {
              if (this.tbClients[i].ID === Id) {
                this.tbClients.splice(i, 1);
                break;
              }
            }
            utils.success(msg);
            return;
          }
          utils.errror(msg);
        } catch (e) {
          utils.errormsg();
        }

      }).catch(() => {});

    },

    /**
     * 管理相关内容
     *
     *
     */

    setPage(index) {
      this.getClientsList(index);
      this.curPage = index;
    },

    setRuleData(row, eRows) {
      this.curVersionData = Object.assign({}, row);
      this.curVersionDataBackUp = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID)
        this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },

    /**
     * 添加客户端 相关内容
     *
     *
     */

    // 添加成功回调
    addsuccess({ status, data, msg }) {
      if (status) {
        utils.success(msg);
        this.setPage(this.curPage);
        this.fileList = [];
        return;
      }
      utils.error(msg);
    },

    // 添加失败回调
    adderror() {
      utils.errormsg();
    },

    // 添加文件后缀校验
    checkext(file) {
      const ext = file.name.split(".").pop();

      if (ext !== "zip") {
        utils.error("压缩文件后缀必须为zip");
        return false;
      }

      if (
        this.addVersionData.VersionNumber === "" ||
        this.addVersionData.Description === "" ||
        this.addVersionData.PartOwner === ""
      ) {
        utils.error("信息填写不完整");
        return false;
      }

      return true;
    },

    // 添加版本
    addClient() {
      this.$refs.addForm.submit();
    },

    // 获取版本
    async getClientsList(pageIndex = 1) {
      this.loadingData = true;
      try {
        const { status, data, msg } = await utils.post(API.GET_VERSION_LIST, {
          pageIndex,
          pageNumber: 20,
          ClientId: this.$route.params.clientid
        });

        if (status) {
          this.loadingData = false;
          this.total = data.count;
          this.tbClients = data.List;
          return;
        }

        this.loadingData = false;
        utils.error(msg);
      } catch (e) {
        this.loadingData = false;
        utils.errormsg();        
      }
    }
  },
  mounted() {
    this.setNavActive("1-2");
    this.setBreadcrumb(this.VersionBreadcrumb);
    utils.setScpoe(this);
    this.getClientsList();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#versions {
  @extend .pager;

  .curVersionInfo {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
