<template>
  <div id="gn">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content">

          <el-card class="box-card" body-style="padding: 0;">
            <div slot="header" class="clearfix">
              <span>主机列表</span>
            </div>
            <el-table
            :data="vpsData"
            border
            style="width: 100%; border: 0 none"
            ref="gnTable"
            :row-class-name="tableRowClassName">
              <el-table-column
                prop="id"
                label="主机编号">
              </el-table-column>
              <el-table-column
                prop="ip"
                label="外网IP"
                >
              </el-table-column>
              <el-table-column
                prop="nodecount"
                label="节点数量"
                >
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="CPU">
              </el-table-column>
              <el-table-column
                prop="memory"
                label="内存">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
                :total="20">
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
  import { mapMutations } from 'vuex';
  import { Hosts } from '../../common/config/breadcrumb'

  export default {
    mounted () {
      
    },
    data() {
      return {
        value1: false,
        // tableHeight: document.documentElement.clientHeight - 335,
        multipleSelection: [],
        vpsData: [
          {
            id: '15ASS11',
            ip: '112.225.212.221',
            nodecount: 16,
            cpu: '16%',
            memory: '46%'
          }
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)

        // const {href} = this.$router.resolve({
        //   path: `/backstage/hosts/${row.id}`
        // })

        // window.open(href, '_blank')

        this.$router.push({
          path: `/backstage/hosts/${row.id}`
        })
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      aaa() {
        console.log(this.multipleSelection)
      },
      ...mapMutations({
        setNavActive: 'setNavActive',
        setBreadcrumb: 'setBreadcrumb'
      }),
    },
    created() {
      this.setNavActive('2-1');

      this.setBreadcrumb(Hosts)
    }
  }
</script>

<style lang="scss" scoped>
  #gn {

    .detailInfo {
      font-size: .9rem;

      .grid-content {
        margin-bottom: 5px;
      }
    }
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
