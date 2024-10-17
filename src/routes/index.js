import { createRouter, createWebHistory } from 'vue-router'
import LoginUsuario from '../components/Log-in-usuario.vue'
import LoginAdministrador from '../components/Log-in-prestador.vue'
import LoginPrestador from '../components/Log-in-administrador.vue'

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
    }
  ]
 
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;