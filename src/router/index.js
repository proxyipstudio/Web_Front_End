import Vue from 'vue';
import Router from 'vue-router';

import BackStage from '@/components/BackStage/BackStage';
import ScadaNode from '@/components/ScadaNode/ScadaNode';
import Users from '@/components/Users/Users';
import Hosts from '@/components/Hosts/Hosts';
import HostInfomation from '@/components/HostInfomation/HostInfomation';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import Orders from '@/components/Orders/Orders';
import Earning from '@/components/Earning/Earning';
import Stat from '@/components/Stat/Stat';
import AccountSettings from '@/components/AccountSettings/AccountSettings';
import RuleConfiguration from '@/components/RuleConfiguration/RuleConfiguration';
import CheckConfiguration from '@/components/CheckConfiguration/CheckConfiguration';
import IPPrice from '@/components/IPPrice/IPPrice';
import Versions from '@/components/Versions/Versions';
import CheckNode from '@/components/CheckNode/CheckNode';
import AddNode from '@/components/AddNode/AddNode';
import GatherNode from '@/components/GatherNode/GatherNode';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/backstage',
      name: 'BackStage',
      component: BackStage,
      redirect: '/backstage/dashboard',
      children: [{
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
        },
        {
          path: 'hosts',
          name: 'Hosts',
          component: Hosts
        },
        {
          path: 'hosts/:id',
          component: HostInfomation
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: 'earning',
          name: 'Earning',
          component: Earning
        },
        {
          path: 'stat',
          name: 'Stat',
          component: Stat
        },
        {
          path: 'ruleconfiguration',
          name: 'RuleConfiguration',
          component: RuleConfiguration
        },
        {
          path: 'checkconfiguration',
          name: 'CheckConfiguration',
          component: CheckConfiguration
        },
        {
          path: 'accountsettings',
          name: 'AccountSettings',
          component: AccountSettings
        },
        {
          path: 'ipprice',
          name: 'IPPrice',
          component: IPPrice
        },
        {
          path: 'versions',
          name: 'Versions',
          component: Versions
        },
        {
          path: 'gathernode',
          redirect: '/backstage/gathernode/scadanode',
          component: GatherNode,
          children: [
          {
            path: 'scadanode',
            name: 'ScadaNode',
            component: ScadaNode
          },
          {
            path: 'checknode',
            name: 'CheckNode',
            component: CheckNode
          }]
        },{
          path: 'addnode',
          name: 'AddNode',
          component: AddNode
        }
      ]
    }
  ]
});
