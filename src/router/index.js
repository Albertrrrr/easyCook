import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ShoppingCart from '../views/ShoppingCart.vue'
import Account from "@/views/Account.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import welcomeLogin from "@/views/welcomeLogin.vue";
import Search from "@/views/Search.vue";
import CategorySearch from "@/views/CategorySearch.vue";

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
  },
  {
      path: '/search/:query', // 动态路由
      name: 'search',
      component: Search,
      props: true // 允许将路由参数作为props传递给组件
  },
  {
      path: '/category/:CategoryID', // 动态路由
      name: 'category',
      component: CategorySearch,
      props: true
  },

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
