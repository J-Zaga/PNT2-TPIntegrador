import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCarritoStore = defineStore('carritoStore', () => {
    const carrito = ref([]);

    function agregarAlCarrito(servicio) {
        carrito.value.push(servicio);
    }

    function eliminarDelCarrito(id) {
        carrito.value = carrito.value.filter(item => item.id !== id);
    }

    function obtenerCarrito() {
        return carrito.value;
    }

    function calcularTotal() {
        return carrito.value.reduce((total, item) => total + item.precio, 0);
    }

    return { carrito, agregarAlCarrito, eliminarDelCarrito, obtenerCarrito, calcularTotal };
});
