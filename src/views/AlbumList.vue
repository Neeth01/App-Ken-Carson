<!-- src/views/AlbumList.vue -->
<template>
  <div class="album-list-page">
    <!-- on remplace tout le header par NavMenu -->
    <NavMenu />

    <div v-if="albums.length === 0" class="loading">
      <div class="loading-spinner"></div>
      Chargement des albums...
    </div>
    
    <div v-else class="albums-section">
      <div class="albums-grid">
        <div v-for="album in albums" :key="album.id" class="album-card">
          <router-link :to="{ name: 'Album', params: { id: album.id } }" class="album-link">
            <div class="album-cover-container">
              <img v-if="album.cover_url" :src="album.cover_url" class="cover" :alt="album.nom" />
              <div v-else class="no-cover">
                <span>🎵</span>
              </div>
            </div>
            <div class="album-info">
              <h3 class="album-title">{{ album.nom }}</h3>
              <div class="album-meta">
                <span class="album-year">({{ album.year }})</span>
                <span class="album-rating">★ {{ album.note }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'AlbumList',
  components: { NavMenu },
  data() {
    return {
      albums: []
    }
  },
  async created() {
    try {
      const res = await fetch('/wp-json/ken/v1/album')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      this.albums = data.map(a => ({
        ...a,
        nom       : a.acf_fields.nom,
        year      : a.acf_fields.year,
        note      : a.acf_fields.note,
        nb_sons   : a.acf_fields.nb_sons,
        cover_url : a.cover_url
      }))
    } catch (e) {
      console.error('Erreur chargement albums :', e)
    }
  }
}
</script>

<style scoped>
.album-list-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #dc2626;
  font-size: 1.2rem;
  font-weight: 600;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top: 3px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.albums-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

.album-card {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 2px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.album-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #dc2626, #ef4444, #dc2626);
  border-radius: 16px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.album-card:hover::before {
  opacity: 1;
}

.album-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 
    0 20px 40px rgba(220, 38, 38, 0.3),
    0 0 60px rgba(220, 38, 38, 0.2);
}

.album-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.album-cover-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.cover {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #333;
  transition: all 0.4s ease;
}

.no-cover {
  width: 100%;
  aspect-ratio: 1/1;
  background: linear-gradient(135deg, #333, #1a1a1a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #666;
}

.play-button {
  width: 60px;
  height: 60px;
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.album-card:hover .play-button {
  transform: scale(1);
}

.album-info {
  text-align: center;
}

.album-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.album-year {
  color: #dc2626;
  font-weight: 600;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .albums-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
}
</style>
