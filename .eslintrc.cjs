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
    '@vue/eslint-config-prettier/skip-formatting', //扩展了与 Prettier 配合使用时需要跳过的规则配置。
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest' //指定 ECMAScript 的版本为最新版本。
  },
  rules: {
    //配置具体的 ESLint 规则
    'prettier/prettier': [
      //与 Prettier 格式化工具集成的规则及其配置
      'warn', //表示规则的级别为警告级别，如果违反规则，ESLint 将发出警告。
      {
        singleQuote: true, //使用单引号而非双引号来表示字符串。
        semi: false, //不在语句末尾添加分号。
        printWidth: 80, //限制每行代码的最大宽度为 80。
        trailingComma: 'none', //不使用尾随逗号
        endOfLine: 'auto' //根据操作系统自动选择换行符。
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] //通过 ignores 指定了忽略的组件名称，如 'index'
      }
    ],
    'vue/no-setup-props-destructure': ['off'] //这是 vue/no-setup-props-destructure 规则，用于检查 Vue 组件是否在设置阶段解构 props 对象。'off' 表示规则被禁用，即不会检查这个规则。
  }
}
