<template>
    <div class="chart-container">
      <h3 class="chart-title">Gráfico de Servicios</h3>
      <canvas ref="barChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, watch } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'BarChart',
    props: {
      data: {
        type: Array,
        required: true
      },
      labels: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const barChartCanvas = ref(null);
      let chartInstance = null;
  
      const renderChart = () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        chartInstance = new Chart(barChartCanvas.value, {
          type: 'bar',
          data: {
            labels: props.labels,
            datasets: [{
              label: 'Cantidad de Servicios',
              data: props.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(123, 239, 178, 0.6)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(123, 239, 178, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Precio',
                  color: '#333',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                },
                ticks: {
                  color: '#555',
                  font: {
                    size: 12
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Servicios',
                  color: '#333',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                },
                ticks: {
                  color: '#555',
                  font: {
                    size: 12
                  }
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#555',
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      };
  
      onMounted(renderChart);
      watch(() => [props.data, props.labels], renderChart, { deep: true });
  
      return {
        barChartCanvas
      };
    }
  };
  </script>
    
    <style scoped>
    .chart-container {
      width: 100%;
      height: 90%; /* Increased height */
      padding: 15px;
      background-color: #ffffff;
      border: 2px solid #b496b3;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
  }
    </style>