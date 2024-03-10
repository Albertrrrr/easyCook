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
import Welcome from "@/views/Welcome.vue";
import User from "@/views/User.vue"
import CustomerOrder from "@/views/CustomerOrder.vue"
import MyProdcut from "@/views/MyProdcut.vue"
import Category from "@/views/Category.vue"


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
      path: '/search/:query',
      name: 'search',
      component: Search,
      props: true
  },
  {
      path: '/category/:CategoryID',
      name: 'category',
      component: CategorySearch,
      props: true
  },

  {
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome
  },

{
  path: '/user',
      name: 'user',
    component: User
},
{
  path: '/customerOrder',
      name: 'CustomerOrder',
    component: CustomerOrder
},
{
  path: '/myprodcut',
      name: 'MyProdcut',
    component: MyProdcut
},
  {
    path: '/category',
    name: 'Category',
    component: Category
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
