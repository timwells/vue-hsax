import axios from "axios";

const HOST = "https://seeking-alpha.p.rapidapi.com"
const API_KEY = process.env.VUE_APP_RAPID_API_KEY;
const HEADER_API_KEY_NAME = 'X-RapidAPI-Key'
const HEADER_HOST_NAME = 'X-RapidAPI-Host'
const HEADER_HOST_VALUE= 'seeking-alpha.p.rapidapi.com'
const HEADERS = { 'X-RapidAPI-Key' : API_KEY, 'X-RapidAPI-Host': HEADER_HOST_VALUE }
const SELF = 'https://seekingalpha.com'

// https://seeking-alpha.p.rapidapi.com/article/4520248-onewater-marine-new-m-and-a-4x-pe-rising-estimates
// https://seekingalpha.com/article/4520248-onewater-marine-new-m-and-a-4x-pe-rising-estimates

const state = {
    self: SELF,    
    trending: null
};

const getters = {}
const mutations = {
  SET_TRENDING: (state, payload) => (state.trending = payload)
};

const actions = {
    getTrending({ commit }) {
        commit("SET_TRENDING", null);
        const options = {
            method: 'GET',
            url: `${HOST}/articles/v2/list`,
            params: { until: '0', since: '0', size: '20', number: '1', category: 'latest-articles' },
            headers: HEADERS
        }
        axios.request(options).then((response) => {
            console.log( response.data)
            commit("SET_TRENDING", response.data);
        }).catch(function (error) {
            // console.error(error);
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
