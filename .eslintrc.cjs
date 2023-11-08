/* eslint-env node */
//用于指定 ESLint 执行环境为 Node.js 环境。
require('@rushstack/eslint-patch/modern-module-resolution')
//引入了 @rushstack/eslint-patch/modern-module-resolution 模块，用于解决模块解析的问题。

module.exports = {
  root: true, //表示该配置文件为 ESLint 根配置文件，停止在父级目录中查找其他配置文件
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['simple-import-sort'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^vue', // vue放在首行
            // 以字母(或数字或下划线)或“@”后面跟着字母开头的东西,通常为nodeModules引入
            '^@?\\w',
            '^@(/.*|$)', // 内部导入 "@/"
            '^\\.\\.(?!/?$)', // 父级导入. 把 `..` 放在最后.
            '^\\.\\./?$',
            // 同级导入. 把同一个文件夹.放在最后
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            '^.+\\.?(css|less|scss)$', // 样式导入.
            '^\\u0000' // 带有副作用导入，比如import 'a.css'这种.
          ]
        ]
      }
    ]
  }
}
