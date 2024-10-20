<script setup>
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <p class="footer-text">&copy; 2024 MascotApp. Todos los derechos reservados.</p>
            <p class="contact-info">Contacto: 15-999-999</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: black;
    color: white; 
    padding: 5px 0; 
    position: fixed; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    z-index: 1000; 
}

.footer-content {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    padding: 0 40px; 
    box-sizing: border-box; 
}

.footer-text {
    margin: 0; 
    padding-left: 0; 
}

.contact-info {
    margin: 0;
}
</style>