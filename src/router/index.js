import Vue from 'vue'
import Router from 'vue-router'

import BackStage from '@/components/BackStage/BackStage'
import GatherNodes from '@/components/GatherNodes/GatherNodes'
import Users from '@/components/Users/Users'
import Hosts from '@/components/Hosts/Hosts'
import HostInfomation from '@/components/HostInfomation/HostInfomation'
import Login from '@/components/Login/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import Orders from '@/components/Orders/Orders'
import Earning from '@/components/Earning/Earning'
import Stat from '@/components/Stat/Stat'
import AccountSettings from '@/components/AccountSettings/AccountSettings'
import RuleConfiguration from '@/components/RuleConfiguration/RuleConfiguration'
import CheckConfiguration from '@/components/CheckConfiguration/CheckConfiguration'

Vue.use(Router)

export default new Router({
  routes: [
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
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'gathernodes',
          name: 'GatherNodes',
          component: GatherNodes
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
        }
      ]
    }
  ]
})
