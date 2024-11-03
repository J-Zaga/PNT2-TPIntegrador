<script setup>
    import { formatCurrency } from '../helpers'
    import { useAppointmentsStore } from '../stores/appointments'

    const appointments = useAppointmentsStore()

    defineProps({
            service: {
                type: Object
            }
        })
</script>

<template>
    <div class="p-5 space-y-5 rounded-lg cursor-pointer" 
    :class="appointments.isServiceSelected(service._id) ? 'bg-purple-800 text-white' : 'bg-white'"
    @click="appointments.onServiceSelected(service)">
        <p class="text-2xl font-light">{{ service.nombre }}</p>
        <p class="text-2xl font-light">{{ service.categoria }}</p>
        <p class="text-4xl font-black"
        :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-purple-800'"> 
        {{ formatCurrency(service.precio)}} </p>
    </div>
</template>



