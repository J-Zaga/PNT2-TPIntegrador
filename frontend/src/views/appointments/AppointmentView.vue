<script setup>
    import { formatCurrency } from '@/helpers';
    import SelectedService from '../../components/SelectedService.vue'
    import { useAppointmentsStore } from '../../stores/appointments'
    

    const appointments = useAppointmentsStore()
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
    </div>
</template>



