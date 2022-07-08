import axios from "axios";

// const _api = 'https://us-central1-mk-d-b59f2.cloudfunctions.net/fintech/quote2?item=BMGAX';
const _api = 'https://us-central1-mk-d-b59f2.cloudfunctions.net/fintech/quote2?item=GOOG';

const state = {
  quote: null
};

const getters = {}
const mutations = {
  SET_QUOTE: (state, payload) => (state.quote = payload)
};

const actions = {
  getQuote({ commit }) {
    commit("SET_QUOTE", null);
    axios.get(_api).then(response => {
        commit("SET_QUOTE", response.data);
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
