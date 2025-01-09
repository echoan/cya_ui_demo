'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CyaButton = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn_cya",class:[_vm.type, { disabled: _vm.disabled, loading: _vm.loading }],attrs:{"disabled":_vm.disabled || _vm.loading},on:{"click":_vm.handleClick}},[(_vm.loading)?_c('span',{staticClass:"btn_spinner"}):_vm._e(),_vm._v(" "),_vm._t("default")],2)},
staticRenderFns: [],
  name: 'CyaButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      console.log('按钮点击事件');
      this.$emit('click');
    },
  },
};

/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:42:51
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 14:16:07
 */
CyaButton.install = function (Vue) {
  if (CyaButton.install.installed) return;
  if (!CyaButton.name) {
    console.error("Component is missing a name:");
  } else {
    Vue.component(CyaButton.name, CyaButton);
  }
  CyaButton.install.installed = true;
};
 //为了能够全局注册使用

/*
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:44:10
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 10:31:49
 */
console.log("当前版本：", "1.0.0");
const components = [CyaButton]; // index.js 建立的目的 在于 将来如果定义的组件多了 可以统一通过这个入口文件 全部引用
//定义 install 方法 用于将组件库注册为 Vue 的插件
const install = function (Vue) {
  if (install.installed) return;
  components.map(component => {
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
var index = {
  install //install 方法，用于支持 Vue.use() 安装。
  //CyaButton, //具体的组件，便于按需引入和使用。
};

exports.CyaButton = CyaButton;
exports["default"] = index;
