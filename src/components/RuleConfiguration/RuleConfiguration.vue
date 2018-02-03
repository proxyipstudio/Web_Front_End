<template>
  <div id="rc">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>规则表配置项</span>
            </div>
            <div>
              
              <el-table
                :data="tableData5"
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
                          <input type="text" v-model="curRuleData.url" class="editInput">
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
                          <input type="text" v-model="curRuleData.regIp" class="editInput">
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
                          <input type="text" v-model="curRuleData.regPort" class="editInput">
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
                          <input type="text" v-model="curRuleData.regAnomymous" class="editInput">
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
                          <input type="text" v-model="curRuleData.regType" class="editInput">
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
                          <input type="text" v-model="curRuleData.regCountry" class="editInput">
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
                          <input type="text" v-model="curRuleData.regAddress" class="editInput">
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
                          <el-button type="primary" size="mini">保存</el-button>
                        </div>
                      </el-col>
                    </el-row>

                  </template>
                </el-table-column>
                <el-table-column
                  label="采集地址">
                  <template slot-scope="scope">
                    {{ scope.row.url | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="IP">
                  <template slot-scope="scope">
                    {{ scope.row.regIp | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="端口">
                  <template slot-scope="scope">
                    {{ scope.row.regPort | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="匿名度">
                  <template slot-scope="scope">
                    {{ scope.row.regAnomymous | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="类型">
                  <template slot-scope="scope">
                    {{ scope.row.regType | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="国家">
                  <template slot-scope="scope">
                    {{ scope.row.regCountry | formatTableDataLength }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="省市">
                  <template slot-scope="scope">
                    {{ scope.row.regAddress | formatTableDataLength }}
                  </template>
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
    }),
    setRuleData(row, eRows) {
      this.curRuleData = Object.assign({}, row);
      this.curRuleDataBackUp = Object.assign({}, row);
      if (this.curExRow) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    }
  },
  mounted() {
    this.setBreadcrumb(RuleConfiguration);
    this.setNavActive("5-1");
  },
  data() {
    return {
      tableData5: [
        {
          id: 1,
          url: "https:www.baiduy.ciom",
          regIp: "[a-zA-Z]",
          regPort: "[0-9]",
          regAnomymous: ".*+",
          regCountry: "^[^0-9]*$",
          regAddress: "/a{10}/",
          regType: "/type/"
        },
        {
          id: 2,
          url: "https:www.baiduy.ciom",
          regIp: "[a-zA-Z]",
          regPort: "[0-9a-zA-Zfdsafdsafdsa]",
          regAnomymous: ".*+",
          regCountry: "^[^0-9]*$",
          regAddress: "/a{10}/",
          regType: "/type/"
        }
      ],
      curRuleData: {},
      curExRow: null
    };
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

#rc {
  .editItem {
    margin-bottom: 15px;

    .editInput {
      width: 100%;
      border: 0 none;
      outline: none;
      background: transparent;
      // border-bottom: 2px solid $blue;
      padding: 3px;
      transition: all .2s; 

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
