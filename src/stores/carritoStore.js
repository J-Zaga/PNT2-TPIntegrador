import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCarritoStore = defineStore('carritoStore', () => {
    const carrito = ref([]);

    function agregarAlCarrito(servicio) {
        const existingItem = carrito.value.find(item => item.id === servicio.id);
        if (existingItem) {
            existingItem.cantidad += 1;
        } else {
            carrito.value.push({ ...servicio, cantidad: 1 });
        }
    }

    function eliminarDelCarrito(id) {
        const index = carrito.value.findIndex(item => item.id === id);
        if (index !== -1) {
            if (carrito.value[index].cantidad > 1) {
                carrito.value[index].cantidad -= 1;
            } else {
                carrito.value.splice(index, 1);
            }
        }
    }

    function obtenerCarrito() {
        return carrito.value;
    }

    function calcularTotal() {
        return carrito.value.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }

    // Computed property to get the total number of services in the cart
    const totalServicios = computed(() => {
        return carrito.value.reduce((total, item) => total + item.cantidad, 0);
    });

    return { carrito, agregarAlCarrito, eliminarDelCarrito, obtenerCarrito, calcularTotal, totalServicios };
});

