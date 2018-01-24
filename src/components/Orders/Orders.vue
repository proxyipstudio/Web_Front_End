<template>
  <div>
    Orders
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Orders } from '../../common/config/breadcrumb'

export default {
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    }),
  },
  created() {
    this.setNavActive('4-2')

    this.setBreadcrumb(Orders)
  }
}
</script>
