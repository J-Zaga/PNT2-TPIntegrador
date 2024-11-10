<template>
    <div class="dashboard-container">
      <!-- Header con estadísticas principales -->
      <div class="stats-header">
        <div class="stat-card">
          <div class="icon purple"><i class="fas fa-shopping-cart"></i></div>
          <p>Total servicios:</p>
          <medium class="green">500</medium>
        </div>
        <div class="stat-card">
          <div class="icon green"><i class="fas fa-dollar-sign"></i></div>
          <p>Total Usuarios:</p>
          <medium class="red">200</medium>
        </div>
        <div class="stat-card">
          <div class="icon blue"><i class="fas fa-users"></i></div>
          <p>Servicio mejor valorado ultimo mes:</p>
          <medium class="green">Veterinario</medium>
        </div>
        <div class="stat-card">
          <div class="icon teal"><i class="fas fa-chart-line"></i></div>
          <p>Servicio peor valorado ultimo mes:</p>
          <medium class="green">Entrenamiento</medium>
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
  
      <!-- Sección de los divs de abajo de los graficos -->
      <div class="orders-section">
        <div class="order-card">
          <p>Servicio con mayor popularidad historico:</p>
          <medium>Paseador</medium>
        </div>
        <div class="order-card">
          <p>Mejor prestador:</p>
          <medium>Martin Gomez</medium>
        </div>
        <div class="order-card">
          <p>Mejor cliente:</p>
          <medium>Julieta Morgan</medium>
        </div>
        <div class="order-card">
          <p>Servicio con menor popularidad historico:</p>
          <medium>Limpieza</medium>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import BarChart from './BarChart.vue';
  import PieChart from './PieChart.vue';
  
  export default {
    name: 'Dashboard',
    components: {
      BarChart,
      PieChart
    },
    setup() {
      // Datos hardcodeados para los gráficos
      const quantityDataServices = ref([5000, 4500, 10000, 8900, 2800, 500]);  // Datos para el gráfico de barras
      const servicesLabels = ref(['Veterinario', 'Paseo', 'Peluquero', 'Entrenamiento', 'Cuidado', 'Limpieza']);  // Etiquetas para las barras
  
      const quantityDataUsers = ref([500, 180, 120]);  // Datos para el gráfico de pastel
      const usersLabels = ref(['Clientes', 'Prestadores', 'Administradores']);  // Etiquetas para el pastel
  
      // Crear las versiones ordenadas de los datos y etiquetas para el gráfico de barras
      const sortedEarningsData = ref([]);
      const sortedEarningsLabels = ref([]);
  
      const sortServicesData = () => {
        // Combinar los datos con las etiquetas para ordenarlos correctamente
        const sortedData = quantityDataServices.value
          .map((value, index) => ({ value, label: servicesLabels.value[index] }))
          .sort((a, b) => a.value - b.value);  // Ordenar de menor a mayor
  
        sortedEarningsData.value = sortedData.map(item => item.value);
        sortedEarningsLabels.value = sortedData.map(item => item.label);
      };
  
      // Llamamos a la función para inicializar el orden al principio
      sortServicesData();
  
      // Watch para detectar cambios en los datos de ganancias y reordenar
      watch(quantityDataServices, sortServicesData);
  
      return {
        earningsData: quantityDataServices,
        earningsLabels: servicesLabels,
        sortedEarningsData,
        sortedEarningsLabels,
        salesData: quantityDataUsers,
        salesLabels: usersLabels
      };
    }
  };
  </script>
  
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