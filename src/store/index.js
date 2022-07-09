import Vue from "vue";
import Vuex from "vuex";

// Store Modules
import app from "./modules/app/app";
import ww from "./modules/ww/ww";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    ww
    //auth,
    //funds,
    //markets,
    //quote,
    //trends,
    //indicators,
    //newsfeed,
    //sa
  }
});
