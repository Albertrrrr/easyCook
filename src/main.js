import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

//引入Element UI
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/element-variables.scss"
import "@/assets/base.css"
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
