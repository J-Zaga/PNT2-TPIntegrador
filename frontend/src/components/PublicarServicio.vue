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
    <div class="service-form">
        <h2>Publicar Servicio</h2>
        <form @submit.prevent="crearServicio">
            <input 
                id="nombre" 
                v-model="nombre" 
                placeholder="Nombre del Servicio" 
                required
            />
            <input 
                id="precio" 
                type="number" 
                v-model="precio" 
                placeholder="Precio en USD" 
                required
            />

            <select 
                id="categoria" 
                v-model="categoria" 
                required
            >
                <option disabled value="">Seleccioná una categoría</option>
                <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
            </select>

            <button type="submit">Publicar Servicio</button>
        </form>
    </div>
</template>

<style scoped>
.service-form {
    padding: 40px;
    background-color: #f7f7fc;
    border-radius: 16px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
}

h2 {
    text-align: center;
    color: #4b2ca3;
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: 600;
}

input, textarea, select {
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 16px;
    transition: border 0.3s ease;
}

input:focus, textarea:focus, select:focus {
    border-color: #6c3ecb;
    outline: none;
}

button {
    width: 100%;
    padding: 16px;
    background-color: #6c3ecb;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #5b34a7;
}

input::placeholder, textarea::placeholder {
    color: #bbb;
}

.success-message, .error-message {
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
    padding: 12px;
    border-radius: 6px;
    font-weight: 500;
}

.success-message {
    color: #2e7d32;
    background-color: #e8f5e9;
}

.error-message {
    color: #d32f2f;
    background-color: #ffebee;
}
</style>