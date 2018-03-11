<template>
  <div id="ipprice">
    <el-tabs tab-position="left">
      <el-tab-pane label="价格表管理">

        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>IP价格表</span>
                </div>
                <div>
                  
                  <el-table
                    v-loading="loadingData"
                    :data="tbData"
                    :height="tableHeight"
                    border
                    ref="tb"
                    style="width: 100%; border: 0 none;"
                    @expand-change="setRuleData">
                    <el-table-column type="expand">
                      <template slot-scope="props">

                        <el-form ref="form" :model="curRuleData" label-width="80px">
                          <el-form-item label="价格">
                            <el-input-number v-model="curRuleData.Price" :min="1" :max="999999999" label="原价"></el-input-number>
                          </el-form-item>
                          <el-form-item label="折扣">
                            <el-input-number v-model="addData.Discount" :min="0" :max="1" label="折扣" :step="0.01"></el-input-number>
                          </el-form-item>
                          <el-form-item label="可用天数">
                            <el-input-number v-model="curRuleData.UseTime" :min="1" :max="999999999" label="可用天数"></el-input-number>
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="curRuleData.Description"></el-input>
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-radio-group>

                              <el-upload
                                class="upload-demo"
                                ref="updater"
                                :action="updatepostapi"
                                :file-list="fileList"
                                name="Pic"
                                :data="curRuleData"
                                :on-error="updateerror"
                                :on-success="updatesuccess"
                                :before-upload="checkext"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary" style="width: 100px">选取文件</el-button>
                              </el-upload>

                            </el-radio-group>
                          </el-form-item>

                          <el-form-item label=" ">
                            <el-radio-group>
                              <el-button style="width: 100px" size="small" type="success" @click="submitupdater">修改</el-button>
                            </el-radio-group>
                          </el-form-item>
                        </el-form>

                      </template>
                    </el-table-column>
                    <el-table-column
                      label="原价">
                      <template slot-scope="scope">
                        {{ scope.row.Price }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="折扣">
                      <template slot-scope="scope">
                        {{ scope.row.Discount }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="可用天数">
                      <template slot-scope="scope">
                        {{ scope.row.UseTime }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="图片">
                      <template slot-scope="scope">
                        <a :href='scope.row.PicPath' target="_blank">查看</a>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="描述">
                      <template slot-scope="scope">
                        {{ scope.row.Description | formatTableDataLength }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleter(scope.row.ID)">删除</el-button>
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

      <!-- 
        添加ip价格表
      -->
      <el-tab-pane label="添加价格表">

        <el-form ref="form" :model="addData" label-width="120px">
          <el-form-item label="原价">
            <el-input-number v-model="addData.Price" :min="1" :max="999999999" label="原价"></el-input-number>
          </el-form-item>
          <el-form-item label="折扣">
            <el-input-number v-model="addData.Discount" :min="0" :max="1" label="折扣" :step="0.01"></el-input-number>
          </el-form-item>
          <el-form-item label="可用天数">
            <el-input-number v-model="addData.UseTime" :min="1" :max="999999999" label="可用天数"></el-input-number>            
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addData.Description"></el-input>
          </el-form-item>
          
          <el-form-item label="图片">
            <el-radio-group>

              <el-upload
                class="upload-demo"
                ref="upload"
                :action="addpostapi"
                :file-list="fileList"
                :on-error="adderror"
                :on-success="addsuccess"
                name="Pic"
                :data="addData"
                :before-upload="checkext"
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
import { IPPrice } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      addpostapi: API.AU_IP_PRICE,
      updatepostapi: API.AU_IP_PRICE,

      addData: {
        Price: 0,
        Discount: 1,
        UseTime: 0,
        Description: '',
      },

      fileList: [],

      total: 0,
      tableHeight: document.documentElement.clientHeight - 230,
      
      tbData: [],
      curRuleData: {},
      curRuleDataBackUp: {},
      curExRow: null,

      loadingData: true
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    // 分页切换
    setPage(index) {
      this.getRuleList(index);
    },
    setRuleData(row, eRows) {
      this.curRuleData = Object.assign({}, row);
      this.curRuleDataBackUp = Object.assign({}, row);

      if (this.curExRow && this.curExRow.ID !== row.ID) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    },
    // 获取ip价格列表
    async getIpPriceList(pageIndex = 1) {
      this.loadingData = true;
      try {
        const data = await utils.post(API.GET_IP_PRICE_LIST, {
          pageIndex,
          pageNumber: 20
        });

        if (data.status) {
          this.total = data.data.count;

          this.tbData = data.data.list;
          this.tbData.forEach(item => {
            for (let i in item) {
              if (item[i] === null) item[i] = '';
            }
          });

          this.loadingData = false;
        }
      
      } catch (e) {
        utils.errormsg();
      }
    },
    // 添加
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 添加失败处理程序
    adderror() {
      utils.errormsg();
    },
    // 添加成功处理程序
    addsuccess(res) {
      console.log(res);
    },
    // 修改失败处理程序
    updateerror() {
      utils.errormsg();
    },
    // 修改成功处理程序
    updatesuccess(res) {
      console.log(res);
    },
    // 修改
    submitupdater() {
      this.$refs.updater.submit();
    },
    // 后缀判断
    checkext(file) {
      const ext = file.name.split('.').pop();

      if (ext !== 'bmp' && ext !== 'jpg' && ext !== 'png' && ext !== 'gif') {
        return false;
      }

      console.log(this.curRuleData);
      return true;
    },
    // 删除
    async deleter(id) {
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
          const data = await utils.post(API.DELETE_IP_PRICE, { id });

          if (data.status) {
            utils.success(data.msg);

            for (let i = 0; i < this.tbData.length; i ++) {
              if (this.tbData[i].ID === id) {
                this.tbData.splice(i, 1);
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
  mounted() {
    this.setNavActive("7");
    this.setBreadcrumb(IPPrice);
    utils.setScpoe(this);
    this.getIpPriceList();
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

#ipprice {
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
