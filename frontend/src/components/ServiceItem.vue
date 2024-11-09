<script setup>
import { formatCurrency } from '../helpers'
import { useAppointmentsStore } from '../stores/appointments'
import { ref } from 'vue'

const images = [
    '/as.jpg',
    '/asd.jpg',
    '/comida.jpg',
    '/corgi.jpg',
    '/paseoperro.jpg',
]

const appointments = useAppointmentsStore()
const randomImage = ref(images[Math.floor(Math.random() * images.length)])

defineProps({
    service: {
        type: Object
    }
})
</script>

<template>
    <div
        class="relative p-5 rounded-lg cursor-pointer bg-cover bg-center"
        :class="appointments.isServiceSelected(service._id) ? 'bg-black opacity-100 text-white' : 'bg-black opacity-65 text-white'"
        :style="{ backgroundImage: `url(${randomImage})` }"
        @click="appointments.onServiceSelected(service)"
    >
        <div class="relative z-10 space-y-5">

            <p class="text-4xl font-main-title text-white" style="text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, 1px 1px 2px black;">{{ service.nombre }}</p>

            <p class="text-4xl font-light text-white" style="text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, 1px 1px 2px black;">{{ service.categoria }}</p>

            <p :class="appointments.isServiceSelected(service._id) ? 'text-violet-500' : 'text-white'" class="text-4xl font-black" style="text-shadow: 1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, 1px 1px 2px black;">
               {{ formatCurrency(service.precio) }}
            </p>
        </div>
    </div>
</template>