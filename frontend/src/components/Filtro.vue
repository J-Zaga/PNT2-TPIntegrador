<script setup>
import { ref } from 'vue'

const emit = defineEmits(['actualizar-filtros'])
const categoria = ref('')
const precioMin = ref(0)
const precioMax = ref(Infinity)

function emitirFiltros() {
    emit('actualizar-filtros', {
        categoria: categoria.value,
        precioMin: precioMin.value,
        precioMax: precioMax.value
    })
}

const setPriceRange = (min, max) => {
    precioMin.value = min
    precioMax.value = max
    emitirFiltros() 
}
</script>

<template>
    <div class="sidebar p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Filtrar Servicios</h2>

        <div class="field mb-4">
            <label class="block text-gray-600 mb-1">Categoría:</label>
            <select v-model="categoria" @change="emitirFiltros" class="border rounded-lg p-2 w-full">
                <option value="">Todas las categorías</option>
                <option value="paseo">Paseo</option>
                <option value="veterinario">Veterinario</option>
                <option value="peluquero">Peluquero</option>
                <option value="entrenamiento">Entrenamiento</option>
                <option value="cuidado">Cuidado</option>
                <option value="limpieza">Limpieza</option>
            </select>
        </div>

        <div class="field mb-4">
            <label class="block text-gray-600 mb-1">Precio:</label>
            <div class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(0, 200)">
                Hasta $ 200
            </div>
            <div class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(200, 400)">
                $ 200 a $ 400
            </div>
            <div class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(400, Infinity)">
                Más de $ 400
            </div>
        
            <div class="custom-price flex gap-2 mt-2">
                <input 
                    type="number" 
                    v-model.number="precioMin" 
                    placeholder="Mínimo" 
                    min="0" 
                    @input="emitirFiltros" 
                    class="border rounded-lg p-2 w-full"
                />
                <span class="flex items-center text-gray-600">—</span>
                <input 
                    type="number" 
                    v-model.number="precioMax" 
                    placeholder="Máximo" 
                    min="0" 
                    @input="emitirFiltros" 
                    class="border rounded-lg p-2 w-full"
                />
            </div>

            <div class="price-option cursor-pointer text-red-600 hover:underline mt-2" @click="setPriceRange(0, Infinity)">
                Borrar Filtro
            </div>
        </div>
    </div>
</template>