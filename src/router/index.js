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
          path: '/backstage/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/backstage/gathernodes',
          name: 'GatherNodes',
          component: GatherNodes
        },
        {
          path: '/backstage/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/backstage/hosts',
          name: 'Hosts',
          component: Hosts
        },
        {
          path: '/backstage/hosts/:id',
          component: HostInfomation
        },
        {
          path: '/backstage/orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: '/backstage/earning',
          name: 'Earning',
          component: Earning
        },
        {
          path: '/backstage/stat',
          name: 'Stat',
          component: Stat
        },
        {
          path: '/backstage/accountsettings',
          name: 'AccountSettings',
          component: AccountSettings
        }
      ]
    }
  ]
})
