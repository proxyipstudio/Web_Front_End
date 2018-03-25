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
import Modules from '@/components/Modules/Modules';
import ClientInformation from '@/components/ClientInformation/ClientInformation';
import CheckNode from '@/components/CheckNode/CheckNode';
import GatherNode from '@/components/GatherNode/GatherNode';
import Tasks from '@/components/Tasks/Tasks';
import NotFound from '@/components/NotFound/NotFound';
import Versions from '@/components/Versions/Versions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/backstage/notfound'
    }, 
    {
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
      children: [
        {
          path: 'notfound',
          component: NotFound,
          name: 'NotFound'
        },
        {
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
          path: 'modules',
          name: 'Modules',
          component: Modules
        },
        {
          path: 'modules/clients/:id',
          name: 'ClientInformation',
          component: ClientInformation
        },
        {
          path: 'modules/clients/:id/versions/:clientid',
          name: 'Versions',
          component: Versions
        },
        {
          path: 'tasks',
          name: 'Tasks',
          component: Tasks
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
            }
          ]
        }
      ]
    }
  ]
});
