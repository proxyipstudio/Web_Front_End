<template>
  <div>
    <el-tabs v-model="tab" @tab-click="handleClick" tab-position="left">
      <el-tab-pane label="订单统计" name="first">

        <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
          <v-tooltip />
          <v-axis />
          <v-line :position="'year*value'" />
          <v-point :position="'year*value'" :shape="'circle'"/>
        </v-chart>

      </el-tab-pane>
      <el-tab-pane label="收入统计" name="second">收入统计</el-tab-pane>
      <el-tab-pane label="用户统计" name="third">用户统计</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Stat } from '../../common/config/breadcrumb'

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const scale = [{
  dataKey: '值',
  min: 0,
},{
  dataKey: 'year',
  min: 0,
  max: 1,
}];

export default {
  data() {
    return {
      data,
      scale,
      height: 400,
      tab: 'first'
    }
  },
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    }),
    handleClick() {

    }
  },
  created() {
    this.setNavActive('5')

    this.setBreadcrumb(Stat)
  }
}
</script>