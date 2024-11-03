import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceStore = defineStore('serviceStore', () => {
    const servicios = ref([
        { id: 1, nombre: 'Paseo de perros', categoria: 'paseo', precio: 150 },
        { id: 2, nombre: 'Consulta veterinaria', categoria: 'veterinario', precio: 500 },
        { id: 3, nombre: 'Corte de pelo', categoria: 'peluquero', precio: 120 },
        { id: 4, nombre: 'Entrenamiento básico', categoria: 'entrenamiento', precio: 300 },
        { id: 5, nombre: 'Cuidado de mascotas', categoria: 'cuidado', precio: 200 },
        { id: 6, nombre: 'Castración', categoria: 'veterinario', precio: 800 },
        { id: 7, nombre: 'Limpieza de jaula', categoria: 'limpieza', precio: 80 },
        { id: 8, nombre: 'Paseo grupal de perros', categoria: 'paseo', precio: 120 },
        { id: 9, nombre: 'Chequeo de salud', categoria: 'veterinario', precio: 400 },
        { id: 10, nombre: 'Baño y secado', categoria: 'peluquero', precio: 100 },
        { id: 11, nombre: 'Adiestramiento avanzado', categoria: 'entrenamiento', precio: 500 },
        { id: 12, nombre: 'Vacunación', categoria: 'veterinario', precio: 200 },
        { id: 13, nombre: 'Cuidado de gatos', categoria: 'cuidado', precio: 250 },
        { id: 14, nombre: 'Visitas a domicilio', categoria: 'cuidado', precio: 300 },
        { id: 15, nombre: 'Corte de uñas', categoria: 'peluquero', precio: 50 }
      ])

  return { servicios }
})