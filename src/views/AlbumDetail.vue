<!-- src/components/AlbumDetail.vue -->
<template>
  <div>
    <div v-if="!album" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement de l'album…</p>
    </div>

    <div v-else class="detail-page" :style="backgroundStyle">
      <div class="background-overlay"></div>
      <div class="content">
        <button @click="$router.back()" class="back-button">← Retour</button>

        <div class="album-header">
          <div class="album-cover-large">
            <img v-if="album.cover_url" :src="album.cover_url" :alt="album.acf_fields.nom" />
            <div v-else class="no-cover-large">🎵</div>
          </div>
          <div class="album-meta">
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
              <div class="track-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
              <div class="track-info">
                <router-link :to="{ name: 'Track', params: { id: track.id } }" class="track-link">
                  {{ track.title }}
                </router-link>
              </div>
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
    return { album: null };
  },
  computed: {
    backgroundStyle() {
      const url = this.album.cover_url || '';
      return { backgroundImage: url ? `url(${url})` : '' };
    }
  },
  async created() {
    try {
      const res = await fetch(`/wp-json/ken/v1/album/${this.id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.album = await res.json();
    } catch (e) {
      console.error('Erreur chargement album :', e);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/partials/AlbumDetail';
</style>