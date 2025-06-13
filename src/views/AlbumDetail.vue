<template>
  <div>
    <div v-if="!album" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement de l'album…</p>
    </div>

    <div v-else class="detail-page">
      <button @click="$router.back()" class="back-button">← Retour</button>
      
      <div class="album-header">
        <div class="album-cover-large">
          <img v-if="album.cover_url" :src="album.cover_url" :alt="album.acf_fields.nom" />
          <div v-else class="no-cover-large">🎵</div>
        </div>
        
        <div class="album-meta">
          <!-- Metas pris dans acf_fields -->
          <h3 class="album-title">{{ album.acf_fields.nom }}</h3>
          <span class="album-year">({{ album.acf_fields.year }})</span>
          <p class="album-description">{{ album.acf_fields.description }}</p>
          <span class="album-rating">★ {{ album.acf_fields.note }}</span>
        </div>
      </div>

      <div class="tracks-section">
        <h2 class="section-title">Titres</h2>
        <div class="tracks-list">
          <div 
            v-for="(track, index) in album.acf_fields.titres" 
            :key="track.id" 
            class="track-item"
          >
            <div class="track-number">
              {{ (index + 1).toString().padStart(2, '0') }}
            </div>
            <div class="track-info">
              <router-link 
                :to="{ name: 'Track', params: { id: track.id } }" 
                class="track-link"
              >
                {{ track.title }}
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumDetail',
  props: ['id'],
  data() {
    return { 
      album: null 
    }
  },
  computed: {
    backgroundStyle() {
      const url = this.album.cover_url
      return {
        backgroundImage: url ? `url(${url})` : 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'
      }
    }
  },
  methods: {
    playTrack(track) {
      console.log('Playing track:', track.title)
      // Logique de lecture du track
    }
  },
  async created() {
    try {
      const res = await fetch(`/wp-json/ken/v1/album/${this.id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      this.album = await res.json()
    } catch (e) {
      console.error('Erreur chargement album :', e)
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #dc2626;
  font-size: 1.2rem;
  font-weight: 600;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #333;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.detail-page {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  padding: 2rem 0;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(20, 0, 0, 0.75) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  backdrop-filter: blur(2px);
}

.content {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: 1px solid rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(10px);
}

.back-button {
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  background: linear-gradient(145deg, #ef4444, #dc2626);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
}

.album-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

.album-cover-large {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(220, 38, 38, 0.5);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
}

.album-cover-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-cover-large {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #333, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #666;
}

.album-meta {
  padding: 1rem 0;
}

.album-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(220, 38, 38, 0.5);
}

.album-year {
  display: inline-block;
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.album-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.tracks-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #dc2626;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tracks-list {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.track-item {
  display: grid;
  grid-template-columns: 40px 1fr 60px;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.track-item:last-child {
  border-bottom: none;
}

.track-item:hover {
  background: rgba(220, 38, 38, 0.1);
  transform: translateX(5px);
}

.track-number {
  font-weight: 600;
  color: #dc2626;
  font-size: 1.1rem;
}

.track-info {
  padding-left: 1rem;
}

.track-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.track-link:hover {
  color: #dc2626;
  text-shadow: 0 0 8px rgba(220, 38, 38, 0.6);
}

.track-actions {
  display: flex;
  justify-content: flex-end;
}

.play-track-btn {
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.play-track-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
}

@media (max-width: 768px) {
  .album-header {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .album-cover-large {
    max-width: 250px;
    margin: 0 auto;
  }
  
  .album-title {
    font-size: 2rem;
  }
  
  .track-item {
    grid-template-columns: 30px 1fr 50px;
    padding: 0.8rem;
  }
  
  .content {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>