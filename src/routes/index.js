import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Log-in.vue'
import Signin from '../components/Sign-in.vue'
import Home from '../components/Home.vue'
import Cart from '../components/Cart.vue'


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/carrito',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;