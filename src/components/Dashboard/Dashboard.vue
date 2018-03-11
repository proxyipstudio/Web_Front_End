<template>
  <div id='dashboard'>
    <el-card class="box-card" style="margin-bottom: 10px;">
      <div>
        <el-row :gutter="5" id="firSection">
          <el-col :span="6">
            <div class="grid-content a">

              <el-row :gutter="10">
                <el-col :span="4">
                  <div class="grid-content iconr">
                    <i class="fa fa-cny"></i>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    <div class="title">今日营收</div>
                    <div class="content">123,111,222.00 元</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content b">

              <el-row :gutter="10">
                <el-col :span="4">
                  <div class="grid-content iconr">
                    <i class="fa fa-money"></i>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    <div class="title">今日订单</div>
                    <div class="content">128 单</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content c">

              <el-row :gutter="10">
                <el-col :span="4">
                  <div class="grid-content iconr">
                    <i class="fa fa-desktop"></i>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    <div class="title">运行中的主机</div>
                    <div class="content">157 台</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content d">

              <el-row :gutter="10">
                <el-col :span="4">
                  <div class="grid-circle-o-notch iconr">
                    <i class="fa fa-circle-o-notch"></i>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    <div class="title">用户规模</div>
                    <div class="content">1665 人</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-row :gutter="10" style="margin-bottom: 10px;">
      <el-col :span="12">
        <div class="grid-content">
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>异常主机列表</span>
            </div>
            <div>

              <el-table
                :data="tbData"
                border
                style="width: 100%; border: 0 none">
                <el-table-column
                  prop="a"
                  label="主机名">
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="内网IP">
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="外网IP">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>最近五笔订单</span>
            </div>
            <div>

              <el-table
                :data="tbData"
                border
                style="width: 100%; border: 0 none">
                <el-table-column
                  prop="a"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="金额">
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="下单时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content">
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>今日访问统计</span>
            </div>
            <div>

              <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
                <v-tooltip />
                <v-axis />
                <v-line :position="'year*value'" />
                <v-point :position="'year*value'" :shape="'circle'"/>
              </v-chart>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <div class="empty"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Dashboard } from '../../common/config/breadcrumb';
import utils from '../../assets/js/utils.esm';


const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 }
];

const scale = [
  {
    dataKey: "值",
    min: 0
  },
  {
    dataKey: "year",
    min: 0,
    max: 1
  }
];

export default {
  data() {
    return {
      tbData: [
        {
          a: 1,
          b: 2
        },{
          a: 1,
          b: 2
        },{
          a: 1,
          b: 2
        },{
          a: 1,
          b: 2
        },{
          a: 1,
          b: 2
        }
      ],


      data,
      scale,
      height: 400,
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    })
  },
  mounted() {
    this.setNavActive('0');
    this.setBreadcrumb(Dashboard);
    utils.setScpoe(this);
  }
};
</script>

<style lang='scss' scoped>
  @import '../../assets/scss/variable.scss';

  #dashboard {
    @extend .pager;

    #firSection {

      .grid-content {
        color: $white;
        padding: 5px;

        .iconr {
          font-size: 2em;
          text-align: center;
        }

        .title {
          font-weight: 700;
        }

        .content {
          font-weight: 200;
          margin-top: 10px;
          word-wrap: break-word;
        }

      }

      .grid-content.a {
        background: $green;
      }

      .grid-content.b {
        background: $blue;
      }

      .grid-content.c {
        background: $red;
      }

      .grid-content.d {
        background: $yellow;
      }

    }
  }
</style>
