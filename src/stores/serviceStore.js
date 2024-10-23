import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceStore = defineStore('serviceStore', () => {
    const servicios = ref([
        { id: 1, nombre: 'Paseo de perros', descripcion: 'Paseo por la ciudad', categoria: 'paseo', precio: 150 },
        { id: 2, nombre: 'Consulta veterinaria', descripcion: 'Consulta general', categoria: 'veterinario', precio: 500 },
        { id: 3, nombre: 'Corte de pelo', descripcion: 'Corte tradicional', categoria: 'peluquero', precio: 120 },
        { id: 4, nombre: 'Entrenamiento básico', descripcion: 'Entrenamiento para obediencia', categoria: 'entrenamiento', precio: 300 },
        { id: 5, nombre: 'Cuidado de mascotas', descripcion: 'Cuidado en tu hogar', categoria: 'cuidado', precio: 200 },
        { id: 6, nombre: 'Castración', descripcion: 'Procedimiento completo', categoria: 'veterinario', precio: 800 },
        { id: 7, nombre: 'Limpieza de jaula', descripcion: 'Limpieza profunda de jaulas', categoria: 'limpieza', precio: 80 },
        { id: 8, nombre: 'Paseo grupal de perros', descripcion: 'Paseo en grupo, socialización y diversión', categoria: 'paseo', precio: 120 },
        { id: 9, nombre: 'Chequeo de salud', descripcion: 'Chequeo completo de salud', categoria: 'veterinario', precio: 400 },
        { id: 10, nombre: 'Baño y secado', descripcion: 'Baño completo y secado', categoria: 'peluquero', precio: 100 },
        { id: 11, nombre: 'Adiestramiento avanzado', descripcion: 'Entrenamiento para habilidades específicas', categoria: 'entrenamiento', precio: 500 },
        { id: 12, nombre: 'Vacunación', descripcion: 'Vacunación de rutina', categoria: 'veterinario', precio: 200 },
        { id: 13, nombre: 'Cuidado de gatos', descripcion: 'Cuidados específicos para gatos', categoria: 'cuidado', precio: 250 },
        { id: 14, nombre: 'Visitas a domicilio', descripcion: 'Visitas regulares para cuidado', categoria: 'cuidado', precio: 300 },
        { id: 15, nombre: 'Corte de uñas', descripcion: 'Corte de uñas y limpieza', categoria: 'peluquero', precio: 50 }
      ])

  return { servicios }
})