module.exports = {
  namespaced: true,
  state: { menuTree: [] },
  getters: {
    menuTree: function(state) {
      return state.menuTree;
    },
  },
  mutations: {
    setMenuTree: function(state, data) {
      state.menuTree = data;
    },
  },
  actions: {},
  modules: {},
};
