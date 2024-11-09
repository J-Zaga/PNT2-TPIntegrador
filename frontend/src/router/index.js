import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue'
import Login from '@/components/Login.vue'
import SignIn from '@/components/Sign-in.vue'
import Historial from '@/components/Historial.vue'
import PublicarServicio from '@/components/PublicarServicio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SignIn,
    },
    {
    path: '/historial',
    name: 'Historial',
    component: Historial
    },
    {
      path: '/publicar-servicio',
      name: 'PublicarServicio',
      component: PublicarServicio
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      children: [
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),

            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),

            }
          ]
        }
      ]
    }
  ]
})

export default router
