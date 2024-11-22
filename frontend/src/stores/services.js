import { ref, onMounted, computed } from 'vue';
import { defineStore } from 'pinia';
import ServicesAPI from '../api/ServicesAPI';

export const useServiceStore = defineStore('services', () => {
  const services = ref([]); // Aquí almacenamos los servicios

  // Cargar los servicios desde la API cuando el componente se monta
  onMounted(async () => {
    try {
      const { data } = await ServicesAPI.all();
      services.value = data;
    } catch (error) {
      console.log(error);
    }
  });

  // Función para agregar un nuevo servicio
  const addService = async (service) => {
    try {
      const { data } = await ServicesAPI.post(service);
      services.value.push(data);
    } catch (error) {
      console.error("Error al agregar servicio:", error);
    }
  };

  // Computed property para obtener la categoría menos comprada
  const leastPurchasedCategory = computed(() => {
    const categoryCounts = {
      Veterinario: 0,
      Paseo: 0,
      Peluquero: 0,
      Entrenamiento: 0,
      Cuidado: 0,
      Limpieza: 0,
    };

    // Filtramos los servicios que han sido comprados (con fechaDeCompra no nula)
    const purchasedServices = services.value.filter(service => service.fechaDeCompra !== null);

    // Contamos las compras por categoría
    purchasedServices.forEach(service => {
      if (categoryCounts[service.categoria] !== undefined) {
        categoryCounts[service.categoria]++;
      }
    });

    // Encontramos la categoría con el mínimo número de compras
    return Object.keys(categoryCounts).reduce((a, b) =>
      categoryCounts[a] < categoryCounts[b] ? a : b
    );
  });

  return {
    services,
    addService,
    leastPurchasedCategory, // Exponemos la propiedad computada para que se pueda usar en los componentes
  };
});
