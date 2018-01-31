<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>规则表配置项</span>
            </div>
            <div>
              <el-table
    :data="tableData"
    border
    style="width: 100%;border: 0 none;">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
            </div>
          </el-card>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { RuleConfiguration } from "../../common/config/breadcrumb";

export default {
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    })
  },
  mounted() {
    this.setBreadcrumb(RuleConfiguration);
    this.setNavActive("5-1");
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
