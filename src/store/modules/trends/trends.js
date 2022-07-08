import axios from "axios";

const state = {
  trends: null
};

const getters = {
}

const mutations = {
  SET_TRENDS: (state, payload) => (state.trends = payload)
};

const actions = {
  getTrends({ commit }) {
    commit("SET_TRENDS", null);
    axios.get(`./data/trends.json`).then(response => {
        commit("SET_TRENDS", response.data);
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
