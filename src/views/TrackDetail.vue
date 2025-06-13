<!-- src/views/TrackDetail.vue -->
<template>
  <div>
    <div v-if="!track" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement du morceau…</p>
    </div>

    <div v-else class="detail-page" :style="backgroundStyle">
      <div class="background-overlay"></div>
      <div class="content">
        <button @click="$router.back()" class="back-button">← Retour</button>

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
              <div class="detail-item" v-if="track.producteurs.length">
                <span class="label">Producteurs:</span>
                <span class="value">{{ track.producteurs.join(', ') }}</span>
              </div>
              <div class="detail-item" v-if="track.featuring.length">
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
    return { track: null };
  },
  computed: {
    backgroundStyle() {
      const url = this.track?.album?.cover_url || '';
      return { backgroundImage: url ? `url(${url})` : '' };
    }
  },
  async created() {
    try {
      const resTrack = await fetch(`https://sae401-25.mmi-stdie.fr/jonass/wp-json/ken/v1/morceau/${this.id}`);
      if (!resTrack.ok) throw new Error(`HTTP ${resTrack.status}`);
      const raw = await resTrack.json();

      const track = {
        titre: raw.acf_fields.titre,
        note: parseFloat(raw.acf_fields.note) || 0,
        paroles: raw.acf_fields.paroles,
        producteurs: raw.acf_fields.Producteur?.map(t => t.nom) || [],
        featuring: raw.acf_fields.Featuring?.map(t => t.nom) || [],
        album: { id: raw.acf_fields.album.id, title: raw.acf_fields.album.title }
      };

      const resAlbum = await fetch(`https://sae401-25.mmi-stdie.fr/jonass/wp-json/ken/v1/album/${track.album.id}`);
      if (resAlbum.ok) {
        const alb = await resAlbum.json();
        track.album.cover_url = alb.cover_url || alb.acf_fields.cover_url;
      }

      this.track = track;
    } catch (e) {
      console.error('Erreur chargement morceau :', e);
    }
  }
};
</script>
