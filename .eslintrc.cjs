/* eslint-env node */
//用于指定 ESLint 执行环境为 Node.js 环境。
require('@rushstack/eslint-patch/modern-module-resolution')
//引入了 @rushstack/eslint-patch/modern-module-resolution 模块，用于解决模块解析的问题。

module.exports = {
  root: true, //表示该配置文件为 ESLint 根配置文件，停止在父级目录中查找其他配置文件
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', // 新增
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue', 'simple-import-sort'],

  rules: {
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
    ],
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    '@typescript-eslint/naming-convention': [0],
    curly: [1], //使用 if(){} 中的{}
    eqeqeq: [1], //使用全等
    'no-throw-literal': [1], //抛出字面量错误 throw "error";
    semi: [0], //关闭检测分号结尾
    'no-mixed-spaces-and-tabs': [0], //关闭空格 和 tab 混合缩进 检测
    'linebreak-style': [0, 'windows'] //取消對lf和crlf的檢測
  }
}
