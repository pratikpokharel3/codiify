const { defineConfig } = require("@vue/cli-service");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Codiify | Test your HTML, CSS, & JS Code With Our Online Editor";
      return args;
    });
  },
  productionSourceMap: process.env.NODE_ENV != 'production'
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin({
  //       analyzerPort: process.env.VUE_CLI_MODERN_BUILD ? 8888 : 9999
  //     })
  //   ]
  // }
});
