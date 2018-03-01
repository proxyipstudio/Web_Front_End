<template>
  <div id="AddNode">
    <el-form ref="form" :model="addData" label-width="80px">
      <el-form-item label="节点名称">
        <el-input v-model="addData.Name"></el-input>
      </el-form-item>
      <el-form-item label="节点版本">
        <el-input v-model="addData.Version"></el-input>
      </el-form-item>
      <el-form-item label="主机ID">
        <el-select v-model="addData.HostId" placeholder="">
          <el-option label="主机1" value="1"></el-option>
          <el-option label="主机2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节点类型">
        <el-radio-group v-model="addData.NodeType">
          <el-radio label="采集节点"></el-radio>
          <el-radio label="校验节点"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { AddNode } from "../../common/config/breadcrumb";
import utils from '../../assets/js/utils.esm';
import API from '../../common/config/api';

export default {
  data() {
    return {
      addData: {
        HostId: '',
        Name: '',
        Version: '',
        NodeType: ''
      }
    };
  },
  methods: {
    ...mapMutations({
      setNavActive: "setNavActive",
      setBreadcrumb: "setBreadcrumb"
    }),
    async add() {
      let addData = JSON.parse(JSON.stringify(Object.assign(this.addData)));
      addData.NodeType = (addData.NodeType === '采集节点' ? 1 : 2);

      try {
        const data = await utils.post(API.AU_NODE, addData);
      } catch (e) {

      }
    }
  },
  mounted() {
    this.setNavActive("1-2");
    this.setBreadcrumb(AddNode);
    utils.setScpoe(this);
  }
};
</script>
