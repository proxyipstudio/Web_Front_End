<template>
  <div>
    RuleConfiguration
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { RuleConfiguration } from '../../common/config/breadcrumb'

export default {
  methods: {
    ...mapMutations({
      setNavActive: 'setNavActive',
      setBreadcrumb: 'setBreadcrumb'
    }),
  },
  mounted() {
    this.setBreadcrumb(RuleConfiguration)
    this.setNavActive('5-1')
  }
}
</script>
