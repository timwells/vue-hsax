import axios from "axios";

const state = {
  indicators: null
};

const getters = {
}

const mutations = {
  SET_INDICATORS: (state, payload) => (state.indicators = payload)
};

const actions = {
  getIndicators({ commit }) {
    commit("SET_INDICATORS", null);
    axios.get(`./data/indicators.json`).then(response => {
        commit("SET_INDICATORS", response.data);
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
