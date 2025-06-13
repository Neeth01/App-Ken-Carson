<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
}

.container {
  max-width:800px;
  margin: 0 auto;
  min-height: 100vh;
}

/* Header/Title styles */
h1 {
  font-family: 'Creepster', cursive;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #dc2626, #ef4444, #f87171);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
  letter-spacing: 2px;
}

/* Grille d'albums */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Carte d'album */
.album-card {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 2px solid #dc2626;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.album-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(220, 38, 38, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.album-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

.album-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: #ef4444;
  box-shadow: 
    0 10px 30px rgba(220, 38, 38, 0.3),
    0 0 40px rgba(220, 38, 38, 0.2);
}

.album-card a {
  text-decoration: none;
  color: inherit;
  position: relative;
  z-index: 2;
}

.cover {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #333;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.album-card:hover .cover {
  filter: brightness(1.1) contrast(1.1);
}

.album-card div {
  font-weight: 600;
  color: #ffffff;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

/* Boutons */
button {
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

button:hover {
  background: linear-gradient(145deg, #ef4444, #dc2626);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
}

/* Loading states */
.loading {
  text-align: center;
  color: #dc2626;
  padding: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Links */
a {
  color: #ef4444;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #f87171;
  text-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .albums-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
</style>