<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">
        <!-- Logo si tienes uno -->
      </div>
    </header>


    <!-- Sección principal con el carrusel -->
    <main class="main-content">
      <!-- Contenido del carrusel -->
      <div class="carousel">
        <div class="carousel-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="carousel-slide">
            <img src="/paseoperro.jpg" alt="Imagen 1" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Mucho más que un paseo.</h1>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="/golden.jpg" alt="Imagen 2" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Siempre contigo.</h1>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="/washing.jpg" alt="Imagen 3" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Disfruta cada momento.</h1>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="/vet.jpg" alt="Imagen 4" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Crea recuerdos inolvidables.</h1>
            </div>
          </div>
        </div>
        <button class="prev" @click="prevSlide">❮</button>
        <button class="next" @click="nextSlide">❯</button>
      </div>
    </main> 

    <!-- Banner de la categoría menos comprada -->
    <div v-if="leastPurchasedCategory" class="banner">
      <h2>¡Aprovecha nuestras promociones en la categoria "<strong>{{ leastPurchasedCategory }}</strong>"!</h2>
    </div>

    <!-- Sección de información (Valores, Misión, Objetivos) -->
    <section class="info-section">
      <div class="info-card">
        <h2>Valores</h2>
        <p>En MascotApp, promovemos la transparencia y confianza entre dueños y prestadores de servicios para mascotas. Fomentamos una comunidad segura y accesible, con precios claros y adaptados a distintos presupuestos.</p>
      </div>
      <div class="info-card">
        <h2>Misión</h2>
        <p>Nuestra misión en MascotApp es facilitar la vida de dueños de mascotas conectándolos con servicios de cuidado y bienestar en una plataforma simple y completa.</p>
      </div>
      <div class="info-card">
        <h2>Objetivos</h2>
        <p>En MascotApp, buscamos construir una comunidad confiable y facilitar el acceso a servicios de calidad, promoviendo el bienestar y cuidado responsable de las mascotas.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useServiceStore } from '@/stores/services';

// Estado para el índice de la diapositiva del carrusel
const currentIndex = ref(0);
const totalSlides = 4;
const showTop5 = ref(false); // Controlar la visibilidad de la barra de top 5

// Traer el store de servicios
const serviceStore = useServiceStore();

// Acceder a la categoría menos comprada desde el store
const leastPurchasedCategory = computed(() => serviceStore.leastPurchasedCategory);

// Lista de los 5 servicios más vendidos (hardcodeados por ahora)
const top5Services = ref([
  { name: 'Paseo de perros', image: 'paseoperro.jpg' },
  { name: 'Baño y peluquería', image: 'paseoperro.jpg' },
  { name: 'Veterinaria a domicilio', image: 'paseoperro.jpg' },
  { name: 'Entrenamiento básico', image: 'paseoperro.jpg' },
  { name: 'Guardería de día', image: 'paseoperro.jpg' }
]);

// Funciones para el carrusel
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides;
};

let interval;
onMounted(() => {
  interval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
});

onUnmounted(() => {
  clearInterval(interval); // Limpiar intervalo cuando el componente se destruya
});
</script>

<style scoped>
.home-container {
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

/* Estilos del banner */
.banner {
  background-color: #f8d7da;
  padding: 20px;
  margin-top: 30px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  color: #721c24;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Botón Top 5 */
.top5-button-container {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
}

.top5-button {
  color: rgb(5, 5, 5);
  border: none;
  padding: 10px 20px;
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.top5-services-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  z-index: 100;
}

.top5-service {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
  margin: 0 10px;
}

.service-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.service-name {
  font-size: 0.9rem;
  margin-top: 5px;
  color: #333;
}

/* Estilos del carrusel */
.main-content {
  position: relative; 
  color: white;
  min-height: 200px; 
  width: 100%; 
}

.carousel {
  position: relative; 
  overflow: hidden; 
  width: 100%; 
  margin: 0; 
}

.carousel-images {
  display: flex; 
  transition: transform 0.5s ease; 
}

.carousel-slide {
  min-width: 100%; 
  position: relative; 
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); 
  border-radius: 20px;
  z-index: 1; 
}

.content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; 
  text-align: center;
  color: white;
  padding: 20px;
  max-width: 80%;
}

.main-title {
  font-size: 2.4rem; 
  margin-bottom: 10px; 
  color: white; 
}

.carousel-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  max-height: 500px;
  object-fit: cover;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.5rem;
  z-index: 2; 
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

/* Estilos de la sección de información */
.info-section {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  flex-wrap: wrap;
  gap: 20px;
}

/* Estilo de cada tarjeta de información */
.info-card {
  flex: 1 1 30%;
  max-width: 300px;
  margin: 10px;
  padding: 20px;
  text-align: center;
  background-color: transparent;
  border: none;
  box-shadow: none;
  transition: transform 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card h2 {
  font-size: 1.8rem;
  color: #00050a;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}

.info-card p {
  font-size: 1.2rem;
  color: #333;
  line-height: 1.6;
  font-family: 'Open Sans', sans-serif;
}
</style>
