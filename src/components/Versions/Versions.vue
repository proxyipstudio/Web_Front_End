<template>
  <div id="version">
    <el-tabs tab-position="left">
      <el-tab-pane label="版本管理">
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
                    :data="tbRules"
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
                              请求头
                            </div>
                          </el-col>
                          
                          <el-col :span="20">
                            <div class="grid-content">
                              <input type="text" v-model="curRuleData.ReqHead" class="editInput" placeholder="空" @keyup="checkReqJson('update')">

                              是否压缩(去除换行、空格): <el-switch v-model="updateIsCompress"></el-switch>
                              <span v-text="updateReqHeadCheckTips" style="color: red;"></span> 
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
                      label="版本">
                      <template slot-scope="scope">
                        {{ scope.row.Version | formatTableDataLength }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteTaskRule(scope.row.ID)">删除</el-button>
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

        <el-form ref="form" :model="addData" label-width="120px">
          <el-form-item label="版本号">
            <el-input v-model="addData.VersionNumber"></el-input>
          </el-form-item>
          <el-form-item label="版本名称">
            <el-input v-model="addData.VersionNumber"></el-input>
          </el-form-item>
          <el-form-item label="组件所有者">
            <el-radio-group v-model="addData.PartOwner">
              <el-radio label="采集模块"></el-radio>
              <el-radio label="中间件模块"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="版本文件">
            <el-radio-group>

              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" style="width: 100px">选取文件</el-button>
              </el-upload>

            </el-radio-group>
          </el-form-item>

          <el-form-item label=" ">
            <el-radio-group>
              <el-button style="width: 100px" size="small" type="success" @click="submitUpload">添加</el-button>
            </el-radio-group>
          </el-form-item>

        </el-form>

      </el-tab-pane>
    </el-tabs> 
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Versions } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      tbRules: [],
      curRuleData: {},
      curExRow: null,
      tableHeight: document.documentElement.clientHeight - 230,

      loadingData: true,

      total: 0,

      addData: {
        VersionNumber: '',
        PartName: '',
        PartOwner: 1
      },

      fileList: []
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    setPage() {

    },
    setRuleData(row, eRows) {
      this.curRuleData = Object.assign({}, row);
      this.curRuleDataBackUp = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },
    async getVersionList(pageIndex = 1) {
      try {
        const data = await utils.post(API.GET_VERSION_LIST, {
          pageIndex,
          pageNumber: 20
        });
      } catch (e) {

      }
    },

    submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  },
  mounted() {
    this.setNavActive("1-2");
    this.setBreadcrumb(Versions);
    utils.setScpoe(this);
    this.getVersionList();
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #version {
    @extend .pager;
  }
</style>
