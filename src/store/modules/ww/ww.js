import axios from "axios"

const HOST = process.env.VUE_APP_WW_API_HOST
const API_KEY = process.env.VUE_APP_WW_API_KEY

const HEADERS = { 'x-api-key' : API_KEY }

const state = {
    results: null,
}

const getters = {}
const mutations = {
  SET_RESULTS: (state, payload) => (state.results = payload)
}

const actions = {
    getResults({ commit },{ path }) {
        commit("SET_RESULTS", null);
        const options = { method: 'GET', headers: HEADERS, url: `${HOST}${path}` }
        axios.request(options).then((response) => {
            commit("SET_RESULTS", response.data);
        }).catch((error) => {
            commit("SET_RESULTS", error);
        });
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
