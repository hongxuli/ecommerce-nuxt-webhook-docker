import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0f68baea = () => interopDefault(import('../pages/changeCIty.vue' /* webpackChunkName: "pages/changeCIty" */))
const _2c7dcac1 = () => interopDefault(import('../pages/detail.vue' /* webpackChunkName: "pages/detail" */))
const _70d719e4 = () => interopDefault(import('../pages/exit.vue' /* webpackChunkName: "pages/exit" */))
const _18c1ca29 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _67e4e78e = () => interopDefault(import('../pages/order.vue' /* webpackChunkName: "pages/order" */))
const _27aabe39 = () => interopDefault(import('../pages/order/_id.vue' /* webpackChunkName: "pages/order/_id" */))
const _84549bda = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _2763ac8a = () => interopDefault(import('../pages/cart/_id.vue' /* webpackChunkName: "pages/cart/_id" */))
const _794dc496 = () => interopDefault(import('../pages/products/_keyword.vue' /* webpackChunkName: "pages/products/_keyword" */))
const _4f1a2712 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/changeCIty",
    component: _0f68baea,
    name: "changeCIty"
  }, {
    path: "/detail",
    component: _2c7dcac1,
    name: "detail"
  }, {
    path: "/exit",
    component: _70d719e4,
    name: "exit"
  }, {
    path: "/login",
    component: _18c1ca29,
    name: "login"
  }, {
    path: "/order",
    component: _67e4e78e,
    name: "order",
    children: [{
      path: ":id?",
      component: _27aabe39,
      name: "order-id"
    }]
  }, {
    path: "/register",
    component: _84549bda,
    name: "register"
  }, {
    path: "/cart/:id?",
    component: _2763ac8a,
    name: "cart-id"
  }, {
    path: "/products/:keyword?",
    component: _794dc496,
    name: "products-keyword"
  }, {
    path: "/",
    component: _4f1a2712,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
