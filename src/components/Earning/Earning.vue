<template>
  <div id="earning">
    <el-row :gutter="10" class="mb10">


      <el-col :span="12" class="alertpanel">
        <div class="grid-content">
          <el-card class="box-card" style="background: #3B87D5">
            <div class="title">今日订单数</div>
            <div class="content">213单</div>
          </el-card>
        </div>  
      </el-col>

      <el-col :span="12" class="alertpanel">
        <div class="grid-content">
          <el-card class="box-card" style="background: #3B87D5">
            <div class="title">今日收入</div>
            <div class="content">¥11,213</div>
          </el-card>
        </div>  
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>今日订单</span>
            </div>
            
            <div>
              <el-table
                :data="tableData"
                border
                style="width: 100%; border: 0 none;">
                <el-table-column
                  prop="buyer"
                  label="购买人">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="购买类型">
                </el-table-column>
                <el-table-column
                  prop="pay"
                  label="消费">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间">
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
import { Earning } from "../../common/config/breadcrumb";

export default {
  data() {
    return {
      tableData: [
        {
          id: "12312",
          buyer: "1234232221",
          type: "套餐1",
          pay: "¥1123",
          date: "22:11:33"
        },
        {
          id: "12312",
          buyer: "1234232221",
          type: "套餐1",
          pay: "¥1123",
          date: "22:11:33"
        },
        {
          id: "12312",
          buyer: "1234232221",
          type: "套餐1",
          pay: "¥1123",
          date: "22:11:33"
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
    this.setNavActive("4-1");

    this.setBreadcrumb(Earning);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable.scss";

#earning {
  .alertpanel {
    .title {
      font-size: 1.3rem;
      padding-bottom: 10px;
      color: $white;
      font-weight: 700;
    }

    .content {
      font-size: 1.1rem;
      color: $white;
      font-weight: 200;
    }
  }
}
</style>
