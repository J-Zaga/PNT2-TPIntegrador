<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
</script>

<template>
    <nav class="my-5 flex gap-3">
        <RouterLink
            :to="{name: 'new-appointment'}"
            class="flex-1 text-center p-3 uppervcase font-extrabold hover:bg-purple-800 hover:text-white"
            :class="route.name === 'new-appointment' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'"
        >
            Servicios
        </RouterLink>

        <RouterLink
            :to="{name: 'appointment-details'}"
            class="flex-1 text-center p-3 uppervcase font-extrabold hover:bg-purple-800 hover:text-white"
            :class="route.name === 'appointment-details' ? 'bg-purple-800 text-white' : 'bg-white text-purple-800'"
        >
            Cita y Resumen
        </RouterLink>
    </nav>
    <div class="space-y-5">
        <RouterView />
    </div>
</template>


