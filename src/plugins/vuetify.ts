import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    default: false,
    themes: {
      light: {
        primary: "#2196f3",
        secondary: "#1976D2",
        accent: "#03A9F4",
        error: "#b71c1c",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: colors.blue.lighten3,
        secondary: "#1976D2"
      }
    }
  }
});
