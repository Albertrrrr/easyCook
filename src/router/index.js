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
import {Message} from "element-ui";
import dash from "@/views/Dash.vue";
import detailpage from "@/views/detailpage.vue";
import orderpage from "@/views/orderpage.vue";
import settingpage from "@/views/settingpage.vue";
import address from "@/components/address.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: welcomeLogin,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
    meta: { requiredType: 'user' },
  },
  {
    path: "/shoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart,
    meta: { requiredType: 'user' },
  },
  {
    path: "/index",
    name: "Index",
    component: HomeView,
    meta: { requiredType: 'user' },
  },
  {
    path: '/search/:query',
    name: 'search',
    component: Search,
    props: true,
    meta: { requiredType: 'user' },
  },
  {
    path: '/category/:CategoryID',
    name: 'categorySearch',
    component: CategorySearch,
    props: true,
    meta: { requiredType: 'user' },
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { requiredType: 'manager' },
  },
  {
    path: '/customerOrder',
    name: 'CustomerOrder',
    component: CustomerOrder,
    meta: { requiredType: 'manager' },
  },
  {
    path: '/myProduct',
    name: 'MyProduct',
    component: MyProdcut,
    meta: { requiredType: 'manager' },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { requiredType: 'manager' },
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
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiredType: 'manager' },
  },
  {
    path: "/address",
    name: "address",
    component: address,
    meta: { requiredType: 'user' },
   },
     {
    path: "/settingpage",
    name: "settingpage",
    component: settingpage,
    meta: { requiredType: 'user' },
   }, {
    path: "/orderpage",
    name: "orderpage",
    component: orderpage,
    meta: { requiredType: 'user' },
   },{
    path: "/detailpage",
    name: "detailpage",
    component: detailpage,
    meta: { requiredType: 'user' },
   }, {
    path: "/dash",
    name: "dash",
    component: dash,
    meta: { requiredType: 'user' },
  },{
    path:'/orderDetails/:orderId',
    name: 'orderdetail',
    component: detailpage,
    meta: { requiredType: 'user' },
    props: true
}

];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});


router.beforeEach((to, from, next) => {
  const requiredType = to.meta.requiredType;
  const userType = localStorage.getItem('type');
  if (requiredType && userType !== requiredType) {
    next('/login');
    Message.error('Unsuccessful：' + "Users have not yet logged in, please log in first and then operate.");
  } else {
    next();
  }
});

export default router;
