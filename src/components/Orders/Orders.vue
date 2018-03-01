<template>
  <div id="orders">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content">

          <div style="margin-bottom: 10px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px;">
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>历史订单</span>
            </div>
            <el-table
            :data="gnData"
            border
            :height="tableHeight"
            style="width: 100%; border: 0 none"
            ref="gnTable">
            <el-table-column type="expand">
              <template slot-scope="props">

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      手机号
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.TelNum }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      到期时间
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.ExpireDate }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      提取码
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.Code }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      购买时间
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.BuyTime }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      购买价格
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.BuyMoney }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      当日提取数量
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.TakeCount }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      当日提取次数
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.TakeNumber }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      总提取数量
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.SumTakeCount }}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="itemInfo">
                  <el-col :span="6">
                    <div class="grid-content title">
                      总提取次数
                    </div>
                  </el-col>
                  
                  <el-col :span="18">
                    <div class="grid-content">
                      {{ props.row.SumTakeNumber }}
                    </div>
                  </el-col>
                </el-row>

              </template>
            </el-table-column>
              <el-table-column
                prop="TelNum"
                width="120"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="ExpireDate"
                label="到期时间"
                >
              </el-table-column>
              <el-table-column
                prop="BuyTime"
                label="购买时间"
                >
              </el-table-column>
              <el-table-column
                prop="BuyMoney"
                width="120"
                label="购买价格">
              </el-table-column>
              <el-table-column label="是否到期" width="100">
                <template slot-scope="scope">
                  <span v-if="comTime(scope.row.ExpireDate)" style="color: green">未到期</span>
                  <span v-if="!comTime(scope.row.ExpireDate)" style="color: red">已到期</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteOrder(scope.row.ID)">删除</el-button>
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
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>

          </el-card>
          
          <div class="empty"></div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Orders } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';


export default {
  data() {
    return {
      input5: "",
      select: "",
      tableHeight: document.documentElement.clientHeight - 285,

      total: 0,
      gnData: []
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    // 删除订单
    deleteOrder(id) {
      this.$confirm('是否删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const data = await utils.post(API.DELETE_ORDER, {Id: id});

          if (data.status) {
            utils.success(data.msg);

            for (let i = 0; i < this.gnData.length; i ++) {
              if (this.gnData[i].ID === id) {
                this.gnData.splice(i, 1);
                break;
              }
            }
            this.total --;
            return;
          }

          utils.error(data.msg);
        } catch (e) {
          console.log(e);
          utils.errormsg();
        }
      }).catch(() => {});
    },
    aaa() {
      
    },
    // 到期时间
    comTime(endTime) {
      return utils.compareTime(endTime, utils.getCurTime());
    },
    // 获取订单列表
    async getOrderList(pageIndex = 1) {
      try {
        const data = await utils.post(API.GET_ORDER_LIST, {
          pageIndex,
          pageNumber: 20
        });

        this.gnData = data.data.order;
        this.total = data.data.count;

      } catch (e) {
        console.log(e);
      }
    }
  },
  async mounted () {
    this.setNavActive("4-2");
    this.setBreadcrumb(Orders);

    utils.setScpoe(this);
    this.getOrderList();
  },
};
</script>

<style lang="scss" scoped>
  #orders {

    .itemInfo {
      width: 50%;
      float: left;
      font-size: 1rem;
      
      margin-bottom: 15px;
      .title {
        color: #99a9bf;
      }
    }
  }
</style>
