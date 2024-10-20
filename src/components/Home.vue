<script setup>
import Header from './Header.vue'
</script>

<template>
    <Header />
    <div class="services-container">
      <h2>MascotApp</h2>
      <div class="grid">
        <div class="service-item">Servicio 1</div>
        <div class="service-item">Servicio 2</div>
        <div class="service-item">Servicio 3</div>
        <div class="service-item">Servicio 4</div>
        <div class="service-item">Servicio 5</div>
        <div class="service-item">Servicio 6</div>
        <div class="service-item">Servicio 7</div>
        <div class="service-item">Servicio 8</div>
        <div class="service-item">Servicio 9</div>
      </div>
    </div>
</template>

<style scoped>
.services-container {
    padding: 20px 0; 
    text-align: center;
    margin: 0; 
}

h2 {
    margin-bottom: 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 15px; 
    width: 100%; 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0; 
}

.service-item {
    background-color: #f0f0f0; 
    padding: 40px; 
    border-radius: 8px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s; 
    min-height: 150px; 
}

.service-item:hover {
    transform: scale(1.05); 
}
</style>