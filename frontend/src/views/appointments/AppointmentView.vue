<script setup>
import { computed } from "vue"
import { formatCurrency } from '@/helpers'
import SelectedService from '../../components/SelectedService.vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { useUserStore } from "@/stores/userStore"
import UsersAPI from "@/api/UsersAPI"
import ServicesAPI from "@/api/ServicesAPI"  // Importar la API para servicios

const user = useUserStore()
const usuarioActual = computed(() => user.usuarioRegistrado)
const appointments = useAppointmentsStore()

async function confirmPurchase() {
    const fechaDeCompra = new Date().toISOString();  // La fecha de compra en formato ISO

    appointments.services.forEach(service => {
        if (!usuarioActual.value.serviciosComprados.some(s => s._id === service._id)) {
            service.fechaDeCompra = fechaDeCompra;  // Asignar la fecha de compra al servicio
            usuarioActual.value.serviciosComprados.push(service);  // Añadir el servicio a la lista de servicios comprados
        }
    });

    try {
        // Actualizar cada servicio en la base de datos de servicios con la fecha de compra
        await Promise.all(appointments.services.map(service => {
            return ServicesAPI.update(service._id, { fechaDeCompra });
        }));

        // Luego actualizar al usuario con los servicios comprados
        await UsersAPI.update(usuarioActual.value._id, {
            serviciosComprados: usuarioActual.value.serviciosComprados
        });

        appointments.services = [];  // Limpiar los servicios después de la compra
        alert('¡Compra confirmada con éxito!');
    } catch (error) {
        console.error('Error al actualizar en la base de datos:', error);
        alert('Hubo un problema al confirmar la compra.');
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