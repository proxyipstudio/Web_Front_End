<template>
  <div id="gn">
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
      <el-tab-pane label="用户管理" name="first">
        <el-row :gutter="10">
          <el-col :span="24">
            <div class="grid-content">
              <div style="margin-bottom: 10px;">
                <el-input placeholder="搜索" style="margin-bottom: 10px;"></el-input>
                <el-button type="danger" icon="el-icon-delete">删除用户</el-button>
              </div>

              <el-card class="box-card" body-style="padding: 0;">
                <div slot="header" class="clearfix">
                  <span>用户列表</span>
                </div>
                <el-table
                  :data="usrData"
                  @selection-change="handleSelectionChange"
                  border
                  style="width: 100%; border: 0 none;">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="用户账号"
                    prop="account">
                  </el-table-column>
                  <el-table-column
                    label="用户昵称"
                    prop="nickname">
                  </el-table-column>
                  <el-table-column
                    label="联系方式"
                    prop="phone">
                  </el-table-column>
                  <el-table-column
                    label="账户权限"
                    prop="jurisdiction">
                  </el-table-column>
                  <el-table-column
                    label="邮箱"
                    prop="email">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">初始化密码</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
              <div class="empty"></div>

                </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="添加用户" name="second">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加用户</span>
          </div>
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="账号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="权限">

                <el-select v-model="value5" multiple placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Users } from "../../common/config/breadcrumb";

export default {
  mounted() {},
  data() {
    return {
      activeName: "first",
      tableHeight: document.documentElement.clientHeight - 335,
      multipleSelection: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      usrData: [
        {
          id: "sdafsa",
          account: "safjeakkd",
          nickname: "NISAL",
          phone: "13223323212",
          jurisdiction: "管理员",
          email: "fdaslkdf@qq.cc"
        },
        {
          id: "sdafsa",
          account: "safjeakkd",
          nickname: "NISAL",
          phone: "13223323212",
          jurisdiction: "管理员",
          email: "fdaslkdf@qq.cc"
        },
        {
          id: "sdafsa",
          account: "safjeakkd",
          nickname: "NISAL",
          phone: "13223323212",
          jurisdiction: "管理员",
          email: "fdaslkdf@qq.cc"
        },
        {
          id: "sdafsa",
          account: "safjeakkd",
          nickname: "NISAL",
          phone: "13223323212",
          jurisdiction: "管理员",
          email: "fdaslkdf@qq.cc"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "节点相关"
        },
        {
          value: "选项2",
          label: "主机相关"
        },
        {
          value: "选项3",
          label: "用户相关"
        }
      ],
      value5: []
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      const loading = this.$loading({
        lock: true,
        text: "请求中...",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$notify.error({
          title: "提示",
          message: "请求失败"
        });
      }, 1000);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    aaa() {
      console.log(this.multipleSelection);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onSubmit() {
      console.log("submit!");
    },
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    handleClick() {}
  },
  created() {
    this.setNavActive("10");

    this.setBreadcrumb(Users);
  }
};
</script>

<style lang="scss" scoped>
#gn {
  .detailInfo {
    font-size: 0.9rem;

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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
