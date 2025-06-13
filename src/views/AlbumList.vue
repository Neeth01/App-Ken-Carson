<!-- src/views/AlbumList.vue -->
<template>
  <div class="album-list-page">
    <!-- NavMenu intégré -->
    <NavMenu />

    <div v-if="albums.length === 0" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des albums...</p>
    </div>

    <div v-else class="albums-section">
      <div class="albums-grid">
        <div v-for="album in albums" :key="album.id" class="album-card">
          <router-link :to="{ name: 'Album', params: { id: album.id } }" class="album-link">
            <div class="album-cover-container">
              <img v-if="album.cover_url" :src="album.cover_url" class="cover" :alt="album.nom" />
              <div v-else class="no-cover"><span>🎵</span></div>
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
    return { albums: [] }
  },
  async created() {
    try {
      const res = await fetch('/wp-json/ken/v1/album')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      this.albums = data.map(a => ({
        ...a,
        nom: a.acf_fields.nom,
        year: a.acf_fields.year,
        note: a.acf_fields.note,
        cover_url: a.cover_url
      }))
    } catch (e) {
      console.error('Erreur chargement albums :', e)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/partials/AlbumList';
</style>