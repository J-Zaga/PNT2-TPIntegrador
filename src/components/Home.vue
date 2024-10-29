<script setup>
import { ref, computed } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import { useUserStore } from '../stores/userStore'
import { useCarritoStore } from '../stores/carritoStore'
import Buscador from './Buscador.vue'
import Header from './Header.vue'
import Filtro from './Filtro.vue'

const store = useServiceStore()
const user = useUserStore()
const carritoStore = useCarritoStore()

const busqueda = ref('')
const usuarioActual = computed(() => user.usuarioRegistrado)
const categoriaFiltro = ref('')
const precioMinFiltro = ref(0)
const precioMaxFiltro = ref(Infinity)


const filteredServices = computed(() => {
    return store.servicios.filter(servicio => {
        const matchesBusqueda = servicio.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
        const matchesCategoria = !categoriaFiltro.value || servicio.categoria === categoriaFiltro.value
        const matchesPrecio = servicio.precio >= precioMinFiltro.value && servicio.precio <= precioMaxFiltro.value
        return matchesBusqueda && matchesCategoria && matchesPrecio
    });
});


function agregarAlCarrito(servicio) {
    carritoStore.agregarAlCarrito(servicio)
}


function actualizarFiltros(filtros) {
    categoriaFiltro.value = filtros.categoria
    precioMinFiltro.value = filtros.precioMin
    precioMaxFiltro.value = filtros.precioMax
}


const mostrarCarrito = ref(false)

function toggleCarrito() {
    mostrarCarrito.value = !mostrarCarrito.value
}


const carrito = computed(() => carritoStore.obtenerCarrito())
const total = computed(() => carritoStore.calcularTotal())
</script>

<template>
  <Header @toggle-carrito="toggleCarrito" />
  <div class="home-container">
      <Filtro v-if="usuarioActual" @actualizar-filtros="actualizarFiltros" />
      <Buscador v-if="usuarioActual" v-model:searchQuery="busqueda" />

      <section class="services">
          <div v-if="filteredServices.length === 0" class="no-results">
              <p>No se encontraron servicios.</p>
          </div>
          <div v-for="servicio in filteredServices" :key="servicio.id" class="service-card">
              <h4>{{ servicio.nombre }}</h4>
              <p>{{ servicio.descripcion }}</p>
              <p>Precio: {{ servicio.precio }}</p>
              <button v-if="usuarioActual" @click="agregarAlCarrito(servicio)">Agregar al Carrito</button>
          </div>
      </section>

      
      <div v-if="mostrarCarrito" class="carrito-modal">
        <div class="carrito-content">
          <h2>Carrito de Compras</h2>
          <ul>
            <li v-for="item in carrito" :key="item.id">
              {{ item.nombre }} - ${{ item.precio }} (Cantidad: {{ item.cantidad }})
              <button @click="carritoStore.eliminarDelCarrito(item.id)">Eliminar</button>
            </li>
          </ul>
          <p>Total: ${{ total }}</p>
          <button @click="toggleCarrito">Cerrar</button>
        </div>
      </div>
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
  transform: scale(1.05); 
}

.no-results {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #666;
  margin-top: 20px;
}


.carrito-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.carrito-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.carrito-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.carrito-content li {
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  margin: 10px 0; 
}

.carrito-content li span {
  flex-shrink: 0; 
}


.carrito-content button {
  width: 100px; 
  height: 40px; 
  margin-top: 10px; 
  padding: 5px; 
  background-color: #e74c3c; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
}

.carrito-content button:hover {
  background-color: #c0392b; 
}


</style>
