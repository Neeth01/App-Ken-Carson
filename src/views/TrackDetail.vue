<template>
  <div>
    <div v-if="!track" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement du morceau…</p>
    </div>

    <div v-else class="detail-page" :style="backgroundStyle">
      <div class="background-overlay"></div>
      
      <div class="content">
        <button @click="$router.back()" class="back-button">
          ← Retour
        </button>
        
        <div class="track-header">
          <div class="track-cover">
            <img 
              v-if="track.album?.cover_url" 
              :src="track.album.cover_url" 
              :alt="track.titre" 
            />
          </div>
          
          <div class="track-meta">
            <h1 class="track-title">{{ track.titre }}</h1>
            
            <div class="track-album" v-if="track.album">
              <span class="label">Album:</span>
              <router-link
                :to="{ name: 'Album', params: { id: track.album.id } }"
                class="album-link"
              >
                {{ track.album.title }}
              </router-link>
            </div>
            
            <div class="track-details">
              <div class="detail-item" v-if="track.producteurs.length > 0">
                <span class="label">Producteurs:</span>
                <span class="value">{{ track.producteurs.join(', ') }}</span>
              </div>
              
              <div class="detail-item" v-if="track.featuring.length > 0">
                <span class="label">Featuring:</span>
                <span class="value">{{ track.featuring.join(', ') }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Note:</span>
                <span class="track-rating">★ {{ track.note }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lyrics-section" v-if="track.paroles">
          <h2 class="section-title">Paroles</h2>
          <div class="lyrics-container">
            <pre class="lyrics-text">{{ track.paroles }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackDetail',
  props: ['id'],
  data() {
    return { 
      track: null 
    }
  },
  computed: {
    backgroundStyle() {
      const url = this.track?.album?.cover_url || ''
      return {
        backgroundImage: url ? `url(${url})` : 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'
      }
    }
  },
  methods: {
    playTrack() {
      console.log('Playing track:', this.track.titre)
      // Logique de lecture du track
    }
  },
  async created() {
  try {
    // 1. Fetch du morceau
    const resTrack = await fetch(`/wp-json/ken/v1/morceau/${this.id}`);
    if (!resTrack.ok) throw new Error(`HTTP ${resTrack.status}`);
    const raw = await resTrack.json();

    // On prépare l'objet track sans la cover
    const track = {
      titre:       raw.acf_fields.titre,
      note:        parseFloat(raw.acf_fields.note) || 0,
      paroles:     raw.acf_fields.paroles,
      producteurs: raw.acf_fields.Producteur?.map(t => t.nom) || [],
      featuring:   raw.acf_fields.Featuring?.map(t => t.nom) || [],
      album: {
        id:    raw.acf_fields.album.id,
        title: raw.acf_fields.album.title,
        // on mettra cover_url juste après
      }
    };

    // 2. Fetch de l'album pour récupérer la jaquette
    const resAlbum = await fetch(`/wp-json/ken/v1/album/${track.album.id}`);
    if (resAlbum.ok) {
      const alb = await resAlbum.json();
      // selon structure de l’API album, ça peut être alb.cover_url ou alb.acf_fields.cover_url
      track.album.cover_url = alb.cover_url || alb.acf_fields.cover_url;
    }

    // On assigne le track complet
    this.track = track;

  } catch (e) {
    console.error('Erreur chargement morceau :', e);
  }
}

}
</script>

<style scoped>

.track-rating {
  padding-top: 20px;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffffff, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(220, 38, 38, 0.5);
}


.detail-item .track-rating {
  font-size: 2rem;
  color: #dc2626;
  font-weight: 700;
}

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
    rgba(0, 0, 0, 0.9) 0%,
    rgba(20, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.95) 100%
  );
  backdrop-filter: blur(3px);
}

.content {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  border: 1px solid rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(15px);
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

.track-header {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

.track-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(220, 38, 38, 0.5);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
}

.track-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-cover {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #333, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #666;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.track-cover:hover .play-overlay {
  opacity: 1;
}





.track-meta {
  padding: 1rem 0;
}

.track-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 3.5rem;
  background: linear-gradient(45deg, #ffffff, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(220, 38, 38, 0.5);
}

.track-album {
  margin-bottom: 1.5rem;
}

.track-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  font-weight: 600;
  color: #dc2626;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  min-width: 120px;
}

.value {
  color: #ccc;
  font-weight: 500;
}

.album-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.album-link:hover {
  color: #dc2626;
  border-bottom-color: #dc2626;
  text-shadow: 0 0 8px rgba(220, 38, 38, 0.6);
}

.lyrics-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #dc2626;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.lyrics-container {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(220, 38, 38, 0.2);
  backdrop-filter: blur(5px);
}

.lyrics-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ffffff;
  white-space: pre-wrap;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .track-header {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .track-cover {
    max-width: 200px;
    margin: 0 auto;
  }
  
  .track-title {
    font-size: 2rem;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .label {
    min-width: auto;
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