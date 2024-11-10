<template>
    <div class="chart-container">
      <canvas ref="pieChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted, ref, watch } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'PieChart',
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
      const pieChartCanvas = ref(null);
      let chartInstance = null;
  
      const renderChart = () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        chartInstance = new Chart(pieChartCanvas.value, {
          type: 'pie',
          data: {
            labels: props.labels,
            datasets: [{
              data: props.data,
              backgroundColor: [
                'rgba(123, 104, 238, 0.6)',
                'rgba(72, 209, 204, 0.6)',
                'rgba(255, 206, 86, 0.6)'
              ],
              borderColor: [
                'rgba(123, 104, 238, 1)',
                'rgba(72, 209, 204, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
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
        pieChartCanvas
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