<script setup>
import { ref, computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import { useUserStore } from "../stores/userStore"

const store = useServiceStore()
const user = useUserStore()

const searchQuery = ref('')
const usuarioActual = computed(() => user.usuarioRegistrado)

const filteredServices = computed(() => {
  return store.servicios.filter(servicio => 
    servicio.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
    <div class="home-container">
        <div class="filters" v-if="usuarioActual">
            <input
                type="text"
                placeholder="Buscar por nombre"
                v-model="searchQuery"
                aria-label="Buscar servicios por nombre"
            />
        </div>
  
    <section class="services">
        <div v-if="filteredServices.length === 0" class="no-results">
            <p>No se encontraron servicios.</p>
        </div>
        <div v-for="servicio in filteredServices" :key="servicio.id" class="service-card">
            <h4>{{ servicio.nombre }}</h4>
            <p>{{ servicio.descripcion }}</p>
            <p>Precio: {{ servicio.precio }}</p>
        </div>
    </section>
  </div>
</template>

<style scoped>

.home-container {
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #f3ebec;
  color: black;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 20px;
  gap: 20px; 
}

.filters {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filters input[type="text"] {
  color: black;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  background-color: #fff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease-in-out;
}

.filters input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

.services {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px;
  padding: 20px;
}

.service-card {
  flex: 1 1 calc(30% - 20px); 
  max-width: 300px; 
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.service-card:hover {
  transform: scale(1.05); /* Scale effect on hover */
}

.no-results {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #666;
  margin-top: 20px;
}
</style>