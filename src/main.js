import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false


import ElementUI from "element-ui"
import locale from 'element-ui/lib/locale/lang/en';
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/element-variables.scss"
import "@/assets/base.css"
Vue.use(ElementUI, { locale });
new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
