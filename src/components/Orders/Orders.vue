<template>
  <div id="gn">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content">

          <div style="margin-bottom: 10px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px;">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
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
              <el-table-column
                prop="buyer"
                label="用户">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                >
              </el-table-column>
              <el-table-column
                prop="pay"
                label="消费"
                >
              </el-table-column>
              <el-table-column
                prop="date"
                label="时间"
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
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

export default {
  data() {
    return {
      input5: "",
      select: "",
      tableHeight: document.documentElement.clientHeight - 285,
      multipleSelection: [],
      curGatherNodeInfo: null,
      gnData: [
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        },
        {
          id: "12312",
          buyer: "12332122231",
          type: "套餐1",
          pay: "¥1123",
          date: "2013-11-32 22:11:23"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    })
  },
  created() {
    this.setNavActive("4-2");

    this.setBreadcrumb(Orders);
  }
};
</script>

<style lang="scss" scoped>

</style>
