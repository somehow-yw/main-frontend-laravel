export default {
  showToolBar ({commit}) {
    console.log('showToolBar')
    commit('hideToolBar', false)
  },
  hideToolBar ({commit}) {
    console.log('hideToolBar')
    commit('hideToolBar', true)
  }
}
