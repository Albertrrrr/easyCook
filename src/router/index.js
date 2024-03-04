import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ShoppingCart from '../views/ShoppingCart.vue'
import Account from "@/views/Account.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import welcomeLogin from "@/views/welcomeLogin.vue";

Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    name: "home",
    component: welcomeLogin,
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
     path: '/index',
    name: 'Index',
    component: HomeView
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
