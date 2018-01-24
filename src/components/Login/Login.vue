<template>
  <div>
    <el-row id="login">
      <el-col :span="8">
        <div class="grid-content">
        
        <el-card class="box-card" id="loginpanel">
          <div slot="header" class="clearfix">
            <span>代理IP采集销售系统 后台</span>
            <span style="float: right">登录</span>
          </div>

          <div>

            <el-row class="mb10">
              <el-col :span="8">
                <div class="grid-content">
                  <div style="line-height: 40px;">
                    用户名
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <el-input placeholder="用户名" v-model="usrname"></el-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="mb10">
              <el-col :span="8">
                <div class="grid-content">
                  <div style="line-height: 40px;">
                    密码
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <el-input placeholder="密码" v-model="pwd" type="password"></el-input>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <div class="grid-content">
                  &emsp;
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <el-button type="primary" @click="login">登陆</el-button>
                </div>
              </el-col>
            </el-row>

          </div>

        </el-card>
        
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      usrname: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      if (this.pwd === '' && this.usrname === '') {
        const loading = this.$loading({
          lock: true,
          text: '登陆中...',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          this.$notify.error({
            title: '提示',
            message: '用户名密码不能为空'
          });
          // this.setUsrName(this.usrname)
          // this.$router.push('/backstage')
        }, 1000)
        return;
      }
        
      const loading = this.$loading({
        lock: true,
        text: '登陆中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
        this.setUsrName(this.usrname)
        this.$router.push('/backstage')
      }, 1000)

        
      // this.$router.push('/backstage')
    },
    ...mapMutations({
      setUsrName: 'setUsrName'
    })
  }
}
</script>


<style lang="scss" scoped>
  #login {
    width: 100%;

    #loginpanel {
      position: fixed;
      left: 50%;
      top: 50%;
      // max-width: 40%;
      width: 500px;
      transform: translateX(-50%) translateY(-70%);
    }
  }

  @media (max-width: 700px){
  
    #login {
      #loginpanel {
        width: 100%;
      }
    }
  }
</style>
