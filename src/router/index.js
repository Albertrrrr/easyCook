import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ShoppingCart from '../views/ShoppingCart.vue'
import Account from "@/views/Account.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  }, {
    path: "/account",
    name: "account",
    component: Account,
  },
  {
    path: "/welcomeLogin",
    name: "welcomeLogin",
    component: () => import("@/views/welcomeLogin.vue"),
  },
  {
    path: "/shoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
]
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
})
export default router
