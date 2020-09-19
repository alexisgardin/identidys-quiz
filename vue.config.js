module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/identidys-quiz/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  }
};
