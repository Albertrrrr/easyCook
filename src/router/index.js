import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ShoppingCart from '../views/ShoppingCart.vue'
import Account from "@/views/Account.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import welcomeLogin from "@/views/welcomeLogin.vue";
import dash from "@/views/Dash.vue";
import detailpage from "@/views/detailpage.vue";
import orderpage from "@/views/orderpage.vue";
import detail2page from "@/views/detail2page.vue";
import settingpage from "@/views/settingpage.vue";
import address from "@/components/address.vue";

Vue.use(VueRouter)
const routes = [
     {
    path: "/address",
    name: "address",
    component: address
   },
     {
    path: "/settingpage",
    name: "settingpage",
    component: settingpage
   }, {
    path: "/orderpage",
    name: "orderpage",
    component: orderpage
   },{
    path: "/detailpage",
    name: "detailpage",
    component: detailpage
   }, {
    path: "/detail2page",
    name: "detail2page",
    component: detail2page
   },{
    path: "/dash",
    name: "dash",
    component: dash,
  }, {
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
  },{
    path:'/orderDetails/:orderId',
    name: 'orderdetail',
    component: detailpage,
        props: true
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
