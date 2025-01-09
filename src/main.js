/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:12:27
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-23 17:40:35
 */
import Vue from "vue";
import App from "./App.vue";
/*从组件的统一的入口文件引用  全部引用 全局注册 按钮1*/
// import CyaUi from "../packages/index";
// Vue.use(CyaUi);

//或者不进行全局注册 哪个地方用 在哪个地方引入 在要使用的地方 按钮2

/*从组件的统一入口文件引用 按需引用 全局注册 按钮3*/
// import { CyaButton } from "../packages/index";
// Vue.component("CyaButton", CyaButton);

/*不从组件的统一入口文件引用，直接从组件的入口文件导入 按需引用，全局注册 按钮3*/
// import CyaButton from "../packages/CyaButton";
// Vue.use(CyaButton); //全局注册

/*组件开发完，发布到npm后 通过npm install 安装后 在项目中全局注册使用 按钮 1 和 按钮3*/
import CyaUi from "cyaui";
import "cyaui/dist/styles/cya_vue_ui.css";
Vue.use(CyaUi);

/*组件开发完，发布到npm后 通过npm install 安装后 在项目中按需使用  打包时需要对样式进行特殊处理*/
// import { CyaButton } from "cyaui";
// import "cyaui/dist/styles/cya_vue_ui.css"; //按需引入时 引入了所有的样式表 此处应该进行优化
// Vue.use(CyaButton);
//Vue.use() 是 Vue 的插件安装机制，适用于通过 install 方法注册的组件或插件, 使用 Vue.use() 注册的组件，未来可以方便地扩展，比如支持更多的配置选项，或者注册多个组件。
//Vue.component("CyaButton", CyaButton);
//Vue.component() 用于单独注册一个组件，适用于直接在 Vue 实例中注册单个组件，而不是作为插件注册。它可以在局部注册或全局注册时使用，但不提供像 Vue.use() 那样的安装和初始化机制。

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
