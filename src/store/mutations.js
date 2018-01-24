const mutations = {
  setUsrName(state, usrname) {
    state.usrname = usrname
  },
  setNavActive(state, active) {
    state.curNavActive = active
  },
  setBreadcrumb(state, bread) {
    state.breadcrumb = bread
  }
}

export default mutations
