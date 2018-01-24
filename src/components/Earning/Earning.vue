<template>
  <div>
    earning
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Earning } from '../../common/config/breadcrumb'

export default {
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    }),
  },
  created() {
    this.setNavActive('4-1')

    this.setBreadcrumb(Earning)
  }
}
</script>
