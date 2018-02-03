<template>
  <el-row id="cc">
    <el-col :span="24">
      <div class="grid-content">
        <el-card class="box-card" body-style="padding: 0;">
          <div slot="header" class="clearfix">
            <span>校验表配置项</span>
          </div>
          <div>
            
            <el-table
              :data="checkData"
              border
              ref="tb"
              style="width: 100%; border: 0 none;"
              @expand-change="setCheckData">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row class="editItem">
                    <el-col :span="4">
                      <div class="grid-content title">
                        校验地址
                      </div>
                    </el-col>
                    
                    <el-col :span="20">
                      <div class="grid-content">
                        <input type="text" v-model="curCheckData.url" class="editInput">
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
                        <input type="text" v-model="curCheckData.regIp" class="editInput">
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
                        <input type="text" v-model="curCheckData.regPort" class="editInput">
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
                        <input type="text" v-model="curCheckData.regAnomymous" class="editInput">
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
                        <input type="text" v-model="curCheckData.regType" class="editInput">
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
                        <input type="text" v-model="curCheckData.regCountry" class="editInput">
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
                        <input type="text" v-model="curCheckData.regAddress" class="editInput">
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
                label="校验地址">
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
</template>

<script>
import { mapMutations } from "vuex";
import { CheckConfiguration } from "../../common/config/breadcrumb";

export default {
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    setCheckData(row, eRows) {
      this.curCheckData = Object.assign({}, row);
      this.curCheckDataBackUp = Object.assign({}, row);
      if (this.curExRow) this.$refs.tb.toggleRowExpansion(this.curExRow, false);
      this.curExRow = row;
    }
  },
  mounted() {
    this.setBreadcrumb(CheckConfiguration);
    this.setNavActive("5-2");
  },
    data() {
    return {
      checkData: [
        {
          id: 1,
          url: "https:www.dsaf.ciom",
          regIp: "[a-zAfdasf-Z]",
          regPort: "[0-fdsa9]",
          regAnomymous: ".*+dd",
          regCountry: "^[^dfsafdsa0-9]*$",
          regAddress: "/a{10}/",
          regType: "/type/"
        },
        {
          id: 2,
          url: "https:www.baiduy.ciom",
          regIp: "[a-zA-Z]",
          regPort: "[0-9a-zAfdsa-Zfdsafdsafdsa]",
          regAnomymous: ".*+",
          regCountry: "^[^0fdsa-9]*$",
          regAddress: "/a{fdsa10}/",
          regType: "/tyfdape/"
        }
      ],
      curCheckData: {},
      curCheckDataBackUp: {},
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

#cc {
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
