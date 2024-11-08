<script setup>
import { computed } from "vue"
import { formatCurrency } from '@/helpers'
import SelectedService from '../../components/SelectedService.vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { useUserStore } from "@/stores/userStore"
import UsersAPI from "@/api/UsersAPI"

const user = useUserStore()
const usuarioActual = computed(() => user.usuarioRegistrado)
const appointments = useAppointmentsStore()

async function confirmPurchase() {
    const fechaDeCompra = new Date().toISOString()

    appointments.services.forEach(service => {
        if (!usuarioActual.value.serviciosComprados.some(s => s._id === service._id)) {
            service.fechaDeCompra = fechaDeCompra
            usuarioActual.value.serviciosComprados.push(service)
        }
    })

    try {
        await UsersAPI.update(usuarioActual.value._id, {
            serviciosComprados: usuarioActual.value.serviciosComprados
        })
        
        appointments.services = []  
        console.log('Compra confirmada en la base de datos:', usuarioActual.value.serviciosComprados)
        alert('¡Compra confirmada con éxito!')
    } catch (error) {
        console.error('Error al actualizar en la base de datos:', error)
        alert('Hubo un problema al confirmar la compra.')
    }
}
</script>

<template>
    <Buscador/>
    <h2 class="text-4xl font-extrabold text-gray-700">Detalles cita y resumen</h2>
    <p class="text-gray-700 text-lg mt-5">A continuación verifica la información y confirma tu cita</p>

    <h3 class="text-3xl font-extrabold text-gray-700">Servicios</h3>

    <p v-if="appointments.noServicesSelected" class="text-gray-700 text-2xl text-center">No hay servicios seleccionados</p>

    <div v-else class="grid gap-5">
        <SelectedService 
            v-for="service in appointments.services"
            :key="service._id"
            :service="service"
        />
        <p class="text-right text-gray-700 text-2xl">Total a pagar: 
            <span class="font-black">{{ formatCurrency(appointments.totalAmount) }}</span>
        </p>
        
        <div class="mt-5 text-right">
            <button 
                @click="confirmPurchase" 
                class="bg-purple-800 text-white font-bold py-2 px-4 rounded hover:bg-purple-900">
                Confirmar Compra
            </button>
        </div>
    </div>
</template>