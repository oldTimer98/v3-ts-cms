/* eslint-env node */
//用于指定 ESLint 执行环境为 Node.js 环境。
require('@rushstack/eslint-patch/modern-module-resolution')
//引入了 @rushstack/eslint-patch/modern-module-resolution 模块，用于解决模块解析的问题。

module.exports = {
  root: true, //表示该配置文件为 ESLint 根配置文件，停止在父级目录中查找其他配置文件
  extends: [
    'plugin:vue/vue3-essential', //扩展了 Vue.js 3 项目的基本配置。
    'eslint:recommended', //扩展了 ESLint 官方推荐的规则配置。
    '@vue/eslint-config-typescript', //扩展了与 TypeScript 一起使用的 Vue.js 配置。
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest' //指定 ECMAScript 的版本为最新版本。
  },
  env: {
    browser: true,
    es2021: true,
    node: true // 加上这行
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off'
  }
}
