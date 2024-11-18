<script>
import { computed, ref, watch } from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import { useUserStore } from "../stores/userStore"
import { useServiceStore } from '@/stores/services'

export default {
  name: 'Dashboard',
  components: {
    BarChart,
    PieChart
  },

  setup() {
    // Acceso a los stores
    const store = useUserStore()
    const serviceStore = useServiceStore()

    // Cálculo dinámico de usuarios por rol
    const quantityDataUsers = computed(() => {
      const usuarios = store.users.filter(user => user.rol === "usuario").length
      const prestadores = store.users.filter(user => user.rol === "prestador").length
      const administradores = store.users.filter(user => user.rol === "administrador").length
      return [usuarios, prestadores, administradores]
    })

    // Etiquetas para el gráfico de tortas
    const usersLabels = ref(['Clientes', 'Prestadores', 'Administradores'])

    // Total de usuarios
    const totalUsers = computed(() => {
      return store.users.length // Devuelve el total de usuarios
    })

    // Cálculo dinámico de servicios por categoría
    const servicesLabels = ref(['Veterinario', 'Paseo', 'Peluquero', 'Entrenamiento', 'Cuidado', 'Limpieza'])

    const quantityDataServices = computed(() => {
      const categoryCounts = {
        Veterinario: 0,
        Paseo: 0,
        Peluquero: 0,
        Entrenamiento: 0,
        Cuidado: 0,
        Limpieza: 0
      }

      serviceStore.services.forEach(service => {
        if (categoryCounts[service.categoria] !== undefined) {
          categoryCounts[service.categoria]++
        }
      })

      return servicesLabels.value.map(label => categoryCounts[label] || 0)
    })

    // Total de servicios
    const totalServices = computed(() => {
      return serviceStore.services.length // Devuelve el total de servicios
    })

    // Calcular la categoría más publicada
    const maxCategory = computed(() => {
      const categoryCounts = {
        Veterinario: 0,
        Paseo: 0,
        Peluquero: 0,
        Entrenamiento: 0,
        Cuidado: 0,
        Limpieza: 0
      }

      serviceStore.services.forEach(service => {
        if (categoryCounts[service.categoria] !== undefined) {
          categoryCounts[service.categoria]++
        }
      })

      return Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
      )
    })

    // Calcular la categoría más comprada (solo los servicios con fechaDeCompra no null)
    const mostPurchasedCategory = computed(() => {
      const categoryCounts = {
        Veterinario: 0,
        Paseo: 0,
        Peluquero: 0,
        Entrenamiento: 0,
        Cuidado: 0,
        Limpieza: 0
      }

      // Filtrar servicios que tienen fechaDeCompra no null
      const purchasedServices = serviceStore.services.filter(service => service.fechaDeCompra !== null);

      purchasedServices.forEach(service => {
        if (categoryCounts[service.categoria] !== undefined) {
          categoryCounts[service.categoria]++
        }
      })

      // Encontrar la categoría con el máximo número de compras
      return Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] > categoryCounts[b] ? a : b
      )
    })

    // Calcular la categoría menos comprada (solo los servicios con fechaDeCompra no null)
    const leastPurchasedCategory = computed(() => {
      const categoryCounts = {
        Veterinario: 0,
        Paseo: 0,
        Peluquero: 0,
        Entrenamiento: 0,
        Cuidado: 0,
        Limpieza: 0
      }

      // Filtrar servicios que tienen fechaDeCompra no null
      const purchasedServices = serviceStore.services.filter(service => service.fechaDeCompra !== null);

      purchasedServices.forEach(service => {
        if (categoryCounts[service.categoria] !== undefined) {
          categoryCounts[service.categoria]++
        }
      })

      // Encontrar la categoría con el mínimo número de compras
      return Object.keys(categoryCounts).reduce((a, b) => 
        categoryCounts[a] < categoryCounts[b] ? a : b
      )
    })

    // Crear las versiones ordenadas de los datos y etiquetas para el gráfico de barras
    const sortedEarningsData = ref([])
    const sortedEarningsLabels = ref([])

    const sortServicesData = () => {
      // Combinar los datos con las etiquetas para ordenarlos correctamente
      const sortedData = quantityDataServices.value
        .map((value, index) => ({ value, label: servicesLabels.value[index] }))
        .sort((a, b) => a.value - b.value) // Ordenar de menor a mayor

      sortedEarningsData.value = sortedData.map(item => item.value)
      sortedEarningsLabels.value = sortedData.map(item => item.label)
    }

    // Llamamos a la función para inicializar el orden al principio
    watch(quantityDataServices, sortServicesData, { immediate: true })

    return {
      earningsData: quantityDataServices,
      earningsLabels: servicesLabels,
      sortedEarningsData,
      sortedEarningsLabels,
      salesData: quantityDataUsers,
      salesLabels: usersLabels,
      totalServices, 
      totalUsers, 
      maxCategory, 
      mostPurchasedCategory,
      leastPurchasedCategory // Nueva categoría menos comprada
    }
  }
}
</script>

<template>
    <div class="dashboard-container">
      <!-- Header con estadísticas principales -->
      <div class="stats-header">
        <div class="stat-card">
          <div class="icon purple"><i class="fas fa-shopping-cart"></i></div>
          <p>Total servicios:</p>
          <medium class="green"> {{ totalServices }} </medium>
        </div>
        <div class="stat-card">
          <div class="icon green"><i class="fas fa-dollar-sign"></i></div>
          <p>Total Usuarios:</p>
          <medium class="red"> {{ totalUsers }} </medium>
        </div>
        <div class="stat-card">
          <div class="icon blue"><i class="fas fa-users"></i></div>
          <p>Categoria menos comprada:</p>
          <medium class="green"> {{ leastPurchasedCategory }} </medium>
        </div>
        <div class="stat-card">
          <div class="icon teal"><i class="fas fa-chart-line"></i></div>
          <p>Categoria mas comprada:</p>
          <medium class="green"> {{ mostPurchasedCategory }} </medium>
        </div>
      </div>
  
      <!-- Sección de gráficos -->
      <div class="charts-section">
        <div class="chart-card">
          <h3>Services Analytics</h3>
          <BarChart :data="sortedEarningsData" :labels="sortedEarningsLabels" />
        </div>
        <div class="chart-card">
          <h3>Users Analytics</h3>
          <PieChart :data="salesData" :labels="salesLabels" />
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  .dashboard-container {
    width: 100%;
    margin: auto;
    padding: 30px;
    background-color: #f8f9fa;
  }
  
  /* Header de estadísticas */
  .stats-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background: white;
    border-radius: 8px;
    padding: 30px;
    flex: 1;
    margin: 0 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Sección de gráficos */
  .charts-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .chart-card {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin: 0 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  /* Sección de órdenes */
  .orders-section {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .order-card {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 30px;
    margin: 0 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>