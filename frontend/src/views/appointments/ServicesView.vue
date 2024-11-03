<script setup>
    import ServiceItem from "../../components/ServiceItem.vue"
    import { useServiceStore } from '../../stores/services'
    const store = useServiceStore()
</script>

<template>
    <h2 class="text-4xl font-extrabold text-gray-700 mt_10">Servicios</h2>
    <p class="text-gray-700 text-lg mt-5">A continuación elige al menos un servicio para tu cita</p>

    <div class="grid grid-cols-2 gap-5 mt-5">
        <ServiceItem 
            v-for="service in store.services"
            :key="service._id"
            :service="service"
        />
    </div>
</template>



