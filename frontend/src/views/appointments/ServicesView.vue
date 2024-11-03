<script setup>
import { ref, computed } from 'vue'
import ServiceItem from "../../components/ServiceItem.vue"
import { useServiceStore } from '../../stores/services'
import Buscador from '@/components/Buscador.vue'
import Filtro from '@/components/Filtro.vue'

const store = useServiceStore()
const searchQuery = ref('')
const selectedFilters = ref({ categoria: '', precioMin: 0, precioMax: Infinity })

const filteredServices = computed(() => {
  return store.services.filter(service => {
    const matchesSearch = service.nombre.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedFilters.value.categoria ? service.categoria === selectedFilters.value.categoria : true;
    const matchesPrice = service.precio >= selectedFilters.value.precioMin && service.precio <= selectedFilters.value.precioMax;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
});

function updateSearch(query) {
  searchQuery.value = query;
}

function updateFilters(filters) {
  selectedFilters.value = filters;
}
</script>

<template>
  <div class="flex">
    <div class="w-1/4 p-5 bg-transparent h-auto overflow-hidden mt-0"> <!-- Aumenté el margen a mt-20 -->
      <Filtro @actualizar-filtros="updateFilters" />
    </div>

    <div class="flex-1 p-5 border-0">
      <h2 class="text-4xl font-extrabold text-gray-700 mt-0">Servicios</h2>
      <p class="text-gray-700 text-lg mt-5">A continuación elige al menos un servicio para tu cita</p>

      <Buscador @update:searchQuery="updateSearch" />

      <div class="grid grid-cols-2 gap-5 mt-5">
        <ServiceItem 
          v-for="service in filteredServices" 
          :key="service._id" 
          :service="service"
        />
      </div>
    </div>
  </div>
</template>