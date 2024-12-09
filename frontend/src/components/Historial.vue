<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import ServicesAPI from '@/api/ServicesAPI'

const user = useUserStore()
const serviciosComprados = ref([])

function formatDateTime(date) {
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    return new Date(date).toLocaleString('es-ES', options)
}

async function fetchPurchasedServices() {
    try {
        const { data } = await ServicesAPI.all()
        serviciosComprados.value = data.filter(servicio => 
            user.getUsuarioRegistrado().serviciosComprados.some(s => s._id === servicio._id)
        )
        serviciosComprados.value = serviciosComprados.value.map(servicio => {
            const servicioComprado = user.getUsuarioRegistrado().serviciosComprados.find(s => s._id === servicio._id)
            servicio.fechaDeCompra = servicioComprado?.fechaDeCompra
            return servicio
        })
    } catch (error) {
        console.error('Error al cargar los servicios comprados:', error)
    }
}

onMounted(fetchPurchasedServices)
</script>
<template>
  <div class="flex">
    <div class="w-1/3">
      <img src="/Historial.jpg" alt="Imagen historial" class="w-full h-auto object-cover" />
    </div>

    <div class="container mx-auto px-4 py-6 w-2/3">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">Historial de Compras</h2>

      <div v-if="serviciosComprados.length === 0" class="text-center text-lg text-gray-500 mb-8">
        <p>No tienes servicios comprados.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="servicio in serviciosComprados"
          :key="servicio._id"
          class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Servicio: {{ servicio.nombre }}</h3>
          <div class="flex justify-between items-center">
            <p class="text-xl font-semibold text-green-600">Precio: ${{ servicio.precio | formatCurrency }}</p>
          </div>

          <p class="text-sm text-gray-600 mt-4">
            <span class="font-medium text-gray-800">Fecha de compra:</span> {{ formatDateTime(servicio.fechaDeCompra) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>