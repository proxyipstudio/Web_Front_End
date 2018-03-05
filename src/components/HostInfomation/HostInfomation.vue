<template>
  <div id="hostinfo">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>主机信息</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
                  </div>
                  <div v-loading="loading">
                    
                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          主机名
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.HostName"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          编号
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.SerialNumber"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          IP - 内网
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.IPIn"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          IP - 外网
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.IPOut"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          远程桌面用户名
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.adminstrator"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          远程桌面密码
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span style="color: #409EFF; cursor: pointer">点击查看</span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          宽带用户名
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span v-text="hostInfo.KDUser"></span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          宽带密码
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                          <span style="color: #409EFF; cursor: pointer">点击查看</span>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="8">
                        <div class="grid-content">
                          节点数
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="grid-content gray">
                        112
                        </div>
                      </el-col>
                    </el-row>

                  </div>            
                </el-card>
                <div class="mb10"></div>
                <el-card class="box-card" body-style="padding: 0;">
                  <div slot="header" class="clearfix">
                    <span>节点列表</span>
                  </div>
                  <el-table
                  v-loading="loading"
                  :data="gnData"
                  border
                  style="width: 100%; border: 0 none"
                  ref="gnTable">
                    <el-table-column
                      prop="hostid"
                      label="宿主机编号" />
                    <el-table-column
                      prop="programname"
                      label="程序名称" />
                    <el-table-column
                      prop="runtime"
                      label="运行时间" />
                    <el-table-column
                      prop="scanrate"
                      label="扫描速率" />
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini">关闭</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>  
            </el-col>

            <el-col :span="12">
              <div class="grid-content">
            
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>操作</span>
                  </div>
                  <div v-loading="loading">

                    <el-row class="mb10">
                      <el-col :span="9">
                        <div class="grid-content">
                          运行状态
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="grid-content gray">
                          
                          <el-switch
                            v-model="value1"
                            active-text="开"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            inactive-text="关">
                          </el-switch>

                        </div>
                      </el-col>
                    </el-row>

                  </div>
                </el-card>
                <div class="mb10"></div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>硬件使用率</span>
                  </div>
                  <div v-loading="loading">

                    <el-row class="mb10">
                      <el-col :span="9">
                        <div class="grid-content">
                          CPU使用率
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="grid-content gray">
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="94" status="exception"></el-progress>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row class="mb10">
                      <el-col :span="9">
                        <div class="grid-content">
                          内存
                          <small class="gray">{{ memory.using }}M / {{ memory.total }}M</small>
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="grid-content gray">
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="memoryrate" :status="memorybarstatus"></el-progress>
                        </div>
                      </el-col>
                    </el-row>

                  </div>
                </el-card>
                <div class="mb10"></div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>磁盘详情</span>
                  </div>
                
                  <div v-loading="loading">
                    <el-row class="mb10">
                      <el-col :span="9">
                        <div class="grid-content">
                          <i class="fa fa-hdd-o"></i>
                          磁盘1 (C:/) <br>
                          <small class="gray">120G / 2000G</small>
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="grid-content gray">
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="69" status="success"></el-progress>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="9">
                        <div class="grid-content">
                          <i class="fa fa-hdd-o"></i>
                          磁盘2 (D:/) <br>
                          <small class="gray">120G / 2000G</small>
                        </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="grid-content gray">
                          <el-progress :text-inside="true" :stroke-width="18" :percentage="10" status="success"></el-progress>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                </el-card>

              </div>  
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="empty"></div>
  </div>  
</template>

<script>
import { mapMutations } from "vuex";
import { HostInfomation } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      loading: true,
      value1: true,

      hostInfo: {},

      memory: {
        total: 8192,
        using: 1322
      },
      memoryrate: 22,
      memorybarstatus: "success",
      gnData: [
        {
          id: "1112",
          version: "12",
          programname: "呱呱",
          runtime: "199s",
          starttime: "2017-1-1",
          scanrate: "33/s",
          scancount: "998",
          hostip: "127.0.1.2",
          hostid: "9"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    async loadHostInfomation() {
      try {
        const data = await utils.post(API.GET_VPS_BY_ID, {
          Id: this.$route.params.id
        });

        if (data.status) {
          this.hostInfo = data.data.info;
          this.loading = false;
        }

      } catch (e) {
        utils.errormsg();
      }
    }
  },
  mounted() {
    this.setNavActive("2");
    this.setBreadcrumb(HostInfomation);
    utils.setScpoe(this);
    this.loadHostInfomation();

    setInterval(() => {
      let using = parseInt(Math.random() * 8192);

      let rate = parseInt(using / this.memory.total * 100);

      this.memory.using = using;
      this.memoryrate = rate;
      this.memorybarstatus = rate > 75 ? "exception" : "success";
    }, 2000);
  }
};
</script>


<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';
  
  #hostinfo {
    @extend .pager;
  }
</style>
