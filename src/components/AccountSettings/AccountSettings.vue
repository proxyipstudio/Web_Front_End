<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="基础信息修改" name="first">基础信息修改</el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newpwd" type="password" @blur="checkSame"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmNewpwd" type="password" @blur="checkSame"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" :disabled="canUpdate">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { AccountSettings } from '../../common/config/breadcrumb'

export default {
  data() {
    return {
      activeName: 'second',
      form: {
        oldpwd: '',
        newpwd: '',
        confirmNewpwd: ''
      },
      canUpdate: true
    }
  },
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    }),
    handleClick() {
      
    },
    checkSame() {
      if (this.form.newpwd === '' && this.form.confirmNewpwd === '') return this.canUpdate = false
      if (this.form.newpwd === this.form.confirmNewpwd){
        this.canUpdate = false
        return
      }
      this.canUpdate = true
      this.$notify({
        title: '警告',
        message: '两次输入密码不同',
        type: 'warning'
      })
    }
  },
  created() {
    this.setNavActive('7')

    this.setBreadcrumb(AccountSettings)
  }
}
</script>
