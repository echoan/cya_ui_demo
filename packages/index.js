/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:44:10
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 10:31:49
 */
console.log("当前版本：", process.env.VERSION);
import CyaButton from "./CyaButton/index";
const components = [CyaButton]; // index.js 建立的目的 在于 将来如果定义的组件多了 可以统一通过这个入口文件 全部引用
//定义 install 方法 用于将组件库注册为 Vue 的插件
const install = function (Vue) {
  if (install.installed) return;
  components.map((component) => {
    if (!component.name) {
      console.error("Component is missing a name:", component);
    } else {
      Vue.component(component.name, component);
    }
  });
};
//检查是否直接以 <script> 标签的方式引入 如果检测到 window.Vue 存在，说明 Vue 已经被全局引入，直接调用 install 方法完成自动安装。
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { CyaButton };
export default {
  install, //install 方法，用于支持 Vue.use() 安装。
  //CyaButton, //具体的组件，便于按需引入和使用。
};
