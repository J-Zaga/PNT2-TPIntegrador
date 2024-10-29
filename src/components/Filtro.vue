<script setup>
import { ref} from 'vue'

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
    <div class="sidebar">
        <h2>Filtrar Servicios</h2>

        <div class="field">
            <label>Categoría:</label>
            <select v-model="categoria" @change="emitirFiltros">
                <option value="">Todas las categorías</option>
                <option value="paseo">Paseo</option>
                <option value="veterinario">Veterinario</option>
                <option value="peluquero">Peluquero</option>
                <option value="entrenamiento">Entrenamiento</option>
                <option value="cuidado">Cuidado</option>
                <option value="limpieza">Limpieza</option>
            </select>
        </div>

        <div class="field">
            <label>Precio:</label>
            <div class="price-option" @click="setPriceRange(0, 200)">
                Hasta $ 200
            </div>
            <div class="price-option" @click="setPriceRange(200, 400)">
                $ 200 a $ 400
            </div>
            <div class="price-option" @click="setPriceRange(400, Infinity)">
                Más de $ 400
            </div>
        
            <div class="custom-price">
                <input type="number" v-model.number="precioMin" placeholder="Mínimo" min="0" @input="emitirFiltros" />
                <span>—</span>
                <input type="number" v-model.number="precioMax" placeholder="Máximo" min="0" @input="emitirFiltros" />
            </div>

            <div class="price-option" @click="setPriceRange(0, Infinity)">
                Borrar Filtro
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 250px;
    padding: 20px;
    background-color: #f8f9fa;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
}

.field {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

.price-option {
    padding: 5px;
    cursor: pointer;
    color: #b496b3;
    font-size: 0.9em;
}

.price-option:hover {
    color: #b496b3;
    text-decoration: underline;
}

.custom-price {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.custom-price input {
    width: 45%;
    padding: 5px;
    margin: 0 5px;
    box-sizing: border-box;
}

button {
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>