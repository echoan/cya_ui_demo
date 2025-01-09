/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 10:35:36
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-23 17:27:10
 */

//组件库 打包  这里使用的是 rollup 来打包，使用rollup 来打包的前 先安装相关依赖
/*
    这里将rollup 打包相关的依赖安装到根目录下 这样能够避免在项目根目录和组件库根目录都安装node_modules(组件库和根目录都安装node_modules的情况下，有时候导致
    两个不同的node_modules下安装版本不同的同一个依赖进而在组件库打包的时候出现冲突错误)

    rollup 打包的相关依赖

    rollup-plugin-vue2（适配vue2.x的版本）(rollup-plugin-vue2 依赖了 vue-template-compiler，比如如果在组件根目录下安装这个插件，有可能会导致根目录下 Vue 和
    当前根目录中的 node_modules下的vue-template-compiler版本不一致（vue 和 vue-template-compiler版本必须一致），否则会导致编译失败)
    @rollup/plugin-babel
    rollup@2(适配 @rollup/plugin-babel)
    rollup-plugin-replace(版本注入插件)
    rollup-plugin-css-only(处理组件库样式)
    npm install rollup-plugin-vue2 @rollup/plugin-babel rollup@2 rollup-plugin-replace rollup-plugin-css-only -D
*/

import path from "path";
import vue from "rollup-plugin-vue2"; //用于处理 Vue 文件
import babel from "@rollup/plugin-babel"; //用于 Babel 转译
import replace from "rollup-plugin-replace"; //用于替换环境变量,注入版本号
import css from "rollup-plugin-css-only"; // 用于提取 CSS 文件
import pkg from "./package.json"; //引入 package.json，用于获取库的相关信息

export default {
  input: "./index.js",
  output: [
    {
      file: path.resolve(__dirname, "dist/cya_vue_ui.common.js"),
      format: "cjs",
      exports: "named", //值有两种  named/default named 适用于既有命名导出又有默认导出的情况  default 仅适用于只有默认导出的情况
    },
    {
      file: path.resolve(__dirname, "dist/cya_vue_ui.esm.js"),
      format: "esm",
      exports: "named",
    },
    {
      file: path.resolve(__dirname, "dist/cya_vue_ui.umd.js"),
      format: "umd",
      name: "CyaVueUI",
      exports: "named",
      globals: {
        vue: "Vue" /*
                UMD 格式中 Vue 作为全局变量引入,在 UMD 格式下，告诉 Rollup 在打包时 Vue 是一个全局变量。也就是说，
                当使用 UMD 格式的组件库时，Vue 会作为全局对象存在，而不是作为模块打包进来。
                */,
      },
    },
  ],
  plugins: [
    vue({
      css: true, //使插件 处理组件中的css
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      babelHelpers: "bundled", // 显式配置 babelHelpers
    }),
    replace({
      "process.env.VERSION": JSON.stringify(pkg.version), // 使用引入的版本号
    }),
    css({ output: "styles/cya_vue_ui.css" }), // 提取 CSS 到 dist 目录
  ],
  external: ["vue"], // 声明 Vue 是外部依赖，而不是将其包含进最终的打包文件中
};
