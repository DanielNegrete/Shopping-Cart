import { createRouter, createWebHistory } from 'vue-router'
import Products from '../components/Products.vue'
import ShoppingCart from '../components/ShoppingCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Products
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
