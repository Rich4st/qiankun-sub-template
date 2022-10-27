const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')

module.exports = defineConfig({
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*', // 配置跨域
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`, // 子应用打包名称
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    },
  },
})
