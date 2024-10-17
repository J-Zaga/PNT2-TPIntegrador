import { createRouter, createWebHistory } from 'vue-router'
import LoginUsuario from '../components/Log-in-usuario.vue'
import LoginAdministrador from '../components/Log-in-prestador.vue'
import LoginPrestador from '../components/Log-in-administrador.vue'
import SignIn from '../components/Sign-in.vue'
import Home from '../components/Home.vue'

const routes = [
    {
        path: '/usuario',
        name: 'Login Usuario',
        component: LoginUsuario,
    },
    {
        path: '/administrador',
        name: 'Login Admninistrador',
        component: LoginAdministrador
    },
    {
        path: '/prestador',
        name: 'Login Prestador',
        component: LoginPrestador
    },
    {
        path: '/usuario/signin',
        name: 'Sign in Usuario',
        component: SignIn,
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