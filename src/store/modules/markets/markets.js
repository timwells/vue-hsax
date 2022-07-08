import axios from "axios";

const state = {
  markets: null
};

const getters = {
}

const mutations = {
  SET_MARKETS: (state, payload) => (state.markets = payload)
};

const actions = {
  getMarkets({ commit }) {
    commit("SET_MARKETS", null);
    axios.get(`./data/markets.json`).then(response => {
        commit("SET_MARKETS", response.data);
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
