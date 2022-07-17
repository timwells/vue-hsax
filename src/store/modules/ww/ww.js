import axios from "axios"

const HOST = process.env.VUE_APP_API_HOST
const API_KEY = process.env.VUE_APP_API_KEY

const HEADERS = { 'x-api-key' : API_KEY }

const state = {
    results: null,
    contentType : null
}

const getters = {}
const mutations = {
  SET_RESULTS: (state, payload) => (state.results = payload),
  SET_CONTENT_TYPE: (state, payload) => (state.contentType = payload)
}

const actions = {
    getResults({ commit },{ path, contentType }) {
        commit("SET_RESULTS", null);
        commit("SET_CONTENT_TYPE", null);
        HEADERS['Accept'] = contentType;
        const options = { 
            method: 'GET', 
            headers: HEADERS,             
            url: `${HOST}${path}` 
        }
        
        axios.request(options).then((response) => {
            commit("SET_RESULTS", response.data);
            commit("SET_CONTENT_TYPE", response.headers['content-type'].split(';')[0]);
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
