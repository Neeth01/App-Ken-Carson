<!-- src/components/NavMenu.vue -->
<template>
  <header class="header">
    <h1 class="main-title">KEN CARSON</h1>
    <nav class="nav-menu">
      <router-link
        :to="{ name: 'Artiste' }"
        class="nav-item"
        active-class="active"
      >
        L'artiste
      </router-link>
      <router-link
        :to="{ name: 'Classement' }"
        class="nav-item"
        active-class="active"
      >
        Classement
      </router-link>
      <router-link
        :to="{ name: 'AlbumList' }"
        class="nav-item"
        active-class="active"
      >
        Tous les albums
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.main-title {
  font-family: 'Creepster', cursive;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #dc2626, #ef4444, #f87171, #dc2626);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
  letter-spacing: 3px;
  position: relative;
}

/* Petite barre sous le titre */
.main-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #dc2626, transparent);
  border-radius: 2px;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

.nav-menu {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;     /* plus d’espace au-dessus des onglets */
}

.nav-item {
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.nav-item.active {
  color: #dc2626;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #dc2626;
  transition: width 0.3s ease;
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}
</style>
