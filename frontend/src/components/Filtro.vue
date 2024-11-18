<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  categoria: String,
  precioMin: Number,
  precioMax: Number,
  hayPrecio: Boolean
})

const emit = defineEmits(['actualizar-filtros'])

const categoria = ref(props.categoria)
const precioMin = ref(props.precioMin)
const precioMax = ref(props.precioMax)
const hayPrecio = ref(props.hayPrecio)

watch(() => props.categoria, (newVal) => {
  categoria.value = newVal
  precioMin.value = 0
  precioMax.value = Infinity
  emitirFiltros()
})

watch(() => props.precioMin, (newVal) => {
  precioMin.value = newVal
})

watch(() => props.precioMax, (newVal) => {
  precioMax.value = newVal
})

watch(() => props.hayPrecio, (newVal) => {
  hayPrecio.value = newVal
})

function emitirFiltros() {
  emit('actualizar-filtros', {
    categoria: categoria.value,
    precioMin: precioMin.value,
    precioMax: precioMax.value,
    hayPrecio: hayPrecio.value
  })
}

const setPriceRange = (min, max) => {
  precioMin.value = min
  precioMax.value = max
  emitirFiltros() 
}

const borrarFiltros = () => {
  categoria.value = ""
  setPriceRange(0, Infinity)
}
</script>

<template>
    <div class="sidebar p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Filtrar Servicios</h2>

        <div class="field mb-4">
            <label class="block text-gray-600 mb-1">Categoría:</label>
            <select v-model="categoria" @change="emitirFiltros" class="border rounded-lg p-2 w-full">
                <option value="">Todas las categorías</option>
                <option value="Paseo">Paseo</option>
                <option value="Veterinario">Veterinario</option>
                <option value="Peluquero">Peluquero</option>
                <option value="Entrenamiento">Entrenamiento</option>
                <option value="Cuidado">Cuidado</option>
                <option value="Limpieza">Limpieza</option>
            </select>
        </div>

        <div class="field mb-4">
            <label class="block text-gray-600 mb-1">Precio:</label>
            <div v-if="precioMin < 200" class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(0, 200)">
                Hasta $ 200
            </div>
            <div v-if="hayPrecio" class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(200, 400)">
                $ 200 a $ 400
            </div>
            <div v-if="precioMax > 400" class="price-option cursor-pointer text-blue-600 hover:underline" @click="setPriceRange(400, Infinity)">
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

            <div class="price-option cursor-pointer text-red-600 hover:underline mt-2" @click="borrarFiltros" >
                Borrar Filtro
            </div>
        </div>
    </div>
</template>
