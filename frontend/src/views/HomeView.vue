<template>
  <div class="home-container">
    
    <header class="header">
      <div class="logo">
        
      </div>
    </header>

    
    <main class="main-content">
      <div class="carousel">
        <div class="carousel-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="carousel-slide">
            <img src="/paseoperro.jpg" alt="Imagen 1" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Mucho mas que un paseo.</h1>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="/golden.jpg" alt="Imagen 2" class="carousel-image" />
            <div class="image-overlay"></div> 
            <div class="content-overlay">
              <h1 class="main-title">Simpre contigo.</h1>
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

    
    <section class="info-section">
      <div class="info-card">
        <h2>Valores</h2>
        <p>En MascotApp, promovemos la transparencia y confianza entre dueños y prestadores de servicios para mascotas. Fomentamos una comunidad segura y accesible, con precios claros y adaptados a distintos presupuestos.</p>
      </div>
      <div class="info-card">
        <h2>Mision</h2>
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
import { ref, onMounted, onUnmounted } from 'vue';

const currentIndex = ref(0);
const totalSlides = 4; 


const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides;
};


const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides;
};


let interval;
onMounted(() => {
  interval = setInterval(nextSlide, 4000); 
});

onUnmounted(() => {
  clearInterval(interval); 
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

.logo {
  display: flex;
  align-items: center;
}


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


.info-section {
  display: flex;
  justify-content: space-around;
  padding: 50px 0;
}
.info-card {
  width: 30%;
  text-align: center;
}
.info-card h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #111;
  margin-bottom: 15px;
}
.info-card p {
  font-size: 1.4rem; 
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}

</style>