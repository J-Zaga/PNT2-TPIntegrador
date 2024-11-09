<script setup>
import { ref } from 'vue'
import { useServiceStore } from '@/stores/services';

const store = useServiceStore()
const categorias = ['Veterinario', 'Paseo', 'Peluquero', 'Entrenamiento', 'Cuidado', 'Limpieza'];

const nombre = ref('')
const precio = ref('')
const categoria = ref('')

async function crearServicio() {
    if (nombre.value.length > 3 && !isNaN(precio.value) && precio.value > 0 && categoria.value) {
        try {
            const nuevoServicio = {
                nombre: nombre.value,
                precio: parseFloat(precio.value),
                categoria: categoria.value
            }
            
            await store.addService(nuevoServicio)
            alert("Servicio publicado correctamente")
            
            nombre.value = ''
            precio.value = ''
            categoria.value = ''
        } catch (error) {
            console.error("Error al publicar el servicio:", error)
        }
    } else {
        console.error("Por favor, completá todos los campos correctamente. El precio debe ser un número positivo.")
    }
}
</script>

<template>
    <div class="service-form max-w-lg mx-auto p-10 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
        <h2 class="text-center text-purple-700 text-2xl font-semibold mb-8">Publicar Servicio</h2>
        <form @submit.prevent="crearServicio" class="space-y-5">
            <input 
                id="nombre" 
                v-model="nombre" 
                placeholder="Nombre del Servicio" 
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <input 
                id="precio" 
                type="number" 
                v-model="precio" 
                placeholder="Precio en USD" 
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <select 
                id="categoria" 
                v-model="categoria" 
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            >
                <option disabled value="">Seleccioná una categoría</option>
                <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <button type="submit" class="w-full p-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
                Publicar Servicio
            </button>
        </form>
    </div>
</template>