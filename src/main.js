import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

//引入Element UI
import ElementUI from "element-ui"
import locale from 'element-ui/lib/locale/lang/en'; // 引入英文语言包
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/element-variables.scss"
import "@/assets/base.css"
Vue.use(ElementUI, { locale }); // 使用英文语言包
new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
