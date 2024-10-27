<template>
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        <li v-for="item in carrito" :key="item.id">
          {{ item.nombre }} - ${{ item.precio }} 
          <button @click="handleEliminar(item.id)" class="btn-eliminar">Eliminar</button>
        </li>
      </ul>
      <p>Total: ${{ total }}</p>
      <button @click="goBack" class="btn-volver">Volver a Inicio</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useCarritoStore } from '../stores/carritoStore.js';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const carritoStore = useCarritoStore();
  const carrito = ref(carritoStore.obtenerCarrito());
  const total = ref(carritoStore.calcularTotal());
  
  const handleEliminar = (id) => {
    carritoStore.eliminarDelCarrito(id);
    carrito.value = carritoStore.obtenerCarrito();
    total.value = carritoStore.calcularTotal();
  };
  
  const goBack = () => {
    router.push('/'); 
  };
  </script>
  
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
    background-color: #b496b3; /* Color del botón para volver */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px; /* Espacio adicional */
  }
  
  .btn-volver:hover {
    background-color: #9b7b8c; /* Color al pasar el mouse */
  }
  </style>
  
