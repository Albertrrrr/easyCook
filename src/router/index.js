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
    name: 'categorySearch', // 注意这里的命名要保持唯一性
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
    path: '/myProduct', // 路径小写，保持一致性
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
  // 登录和注册路由不需要限制
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
    path: "/dash",
    name: "dash",
    component: dash,
  },{
    path:'/orderDetails/:orderId',
    name: 'orderdetail',
    component: detailpage,
        props: true
}
  // 添加任何其他不需要身份验证的路由
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// 添加全局前置守卫进行身份验证
router.beforeEach((to, from, next) => {
  const requiredType = to.meta.requiredType;
  const userType = localStorage.getItem('type'); // 从localStorage获取用户类型
  if (requiredType && userType !== requiredType) {
    next('/login'); // 如果用户类型不匹配，重定向到登录页面
    Message.error('Unsuccessful：' + "Users have not yet logged in, please log in first and then operate.");
  } else {
    next(); // 用户类型匹配，允许访问
  }
});

export default router;
