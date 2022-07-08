import axios from "axios";
const apiKey = process.env.VUE_APP_POLYGON_API_KEY;

const state = {
  news: null
};

const getters = {
}

const mutations = {
  SET_NEWS: (state, payload) => (state.news = payload)
};

const actions = {
  getNews({ commit }) {
    commit("SET_NEWS", null);
    axios.get(`https://api.polygon.io/v2/reference/news?limit=150&order=descending&sort=published_utc&apiKey=${apiKey}`).then(response => {
        commit("SET_NEWS", response.data);
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
