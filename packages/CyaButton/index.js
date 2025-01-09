/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:42:51
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 14:16:07
 */
/*
通过添加install方法 以便将来可以 通过 Vue.use()的方式在全局注册使用,添加的install方法并不影响组件本身 只是向
Vue 提供了一个安装接口。通过 Vue.use(CyaButton) 可以全局注册该组件。
*/
import CyaButton from "./CyaButton.vue";
CyaButton.install = function (Vue) {
  if (CyaButton.install.installed) return;
  if (!CyaButton.name) {
    console.error("Component is missing a name:");
  } else {
    Vue.component(CyaButton.name, CyaButton);
  }
  CyaButton.install.installed = true;
};
export { CyaButton }; //为了能够按需引用
export default CyaButton; //为了能够全局注册使用
