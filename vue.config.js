const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Codiify | Test your HTML, CSS, & JS Code With Our Online Editor";
      return args;
    });
  }
});
