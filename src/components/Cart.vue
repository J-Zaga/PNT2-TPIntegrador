<script setup>
import { computed } from 'vue';
import { useCarritoStore } from '../stores/carritoStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const carritoStore = useCarritoStore();


const carrito = computed(() => carritoStore.obtenerCarrito());
const total = computed(() => carritoStore.calcularTotal());
const totalItemCount = computed(() => {
    return carrito.value.reduce((count, item) => count + item.cantidad, 0)
})


const handleEliminar = (item) => {
    carritoStore.eliminarDelCarrito(item.id);
};

const goBack = () => {
    router.push('/'); 
};
</script>

<template>
  <div>
    <h2>Carrito de Compras ({{ totalItemCount }} items)</h2>
    <ul>
      <li v-for="item in carrito" :key="item.id">
        <div>
          <span>{{ item.nombre }} - ${{ item.precio }} (Cantidad: {{ item.cantidad }})</span>
          <button @click="handleEliminar(item)" class="btn-eliminar">Eliminar</button>
        </div>
      </li>
    </ul>
    <p>Total: ${{ total }}</p>
    <button @click="goBack" class="btn-volver">Volver a Inicio</button>
  </div>
</template>

<style scoped>
.btn-eliminar {
    background-color: #e74c3c;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-eliminar:hover {
    background-color: #c0392b;
}

.btn-volver {
    background-color: #b496b3;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
}

.btn-volver:hover {
    background-color: #9b7b8c;
}
</style>
