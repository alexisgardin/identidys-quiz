import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    signedIn: false,
    themes: {
      "$primary-color-dark": "#1976D2",
      "$primary-color": "#2196F3",
      "$primary-color-light": "#BBDEFB",
      "$primary-color-text": "#FFFFFF",
      "$accent-color": "#03A9F4",
      "$primary-text-color": "#212121",
      "$secondary-text-color": "#757575",
      "$divider-color": "#BDBDBD"
    },
    quizzes: {},
    aws: {
      questions: {},
      quiz: {},
      title: ""
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
