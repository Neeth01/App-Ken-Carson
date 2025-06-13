<!-- src/views/Classement.vue -->
<template>
  <div class="classement-page">
    <NavMenu />

    <h1 class="section-title">Top 20 des sons</h1>

    <div v-if="tracks.length === 0" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement du classement…</p>
    </div>

    <ul v-else class="classement-list">
      <li
        v-for="(track, idx) in top20"
        :key="track.id"
        class="classement-item"
      >
        <span class="rank">{{ idx + 1 }}</span>
        <router-link
          :to="{ name: 'Track', params: { id: track.id } }"
          class="track-link"
        >
          {{ track.titre }}
        </router-link>
        <span class="note">★ {{ track.note }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue';

export default {
  name: 'Classement',
  components: { NavMenu },
  data() {
    return { tracks: [] };
  },
  computed: {
    top20() {
      return this.tracks
        .sort((a, b) => parseFloat(b.note) - parseFloat(a.note))
        .slice(0, 20);
    }
  },
  async created() {
    try {
      const res = await fetch('https://sae401-25.mmi-stdie.fr/jonass/wp-json/ken/v1/morceau');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.tracks = data.map(m => ({ id: m.id, titre: m.acf_fields.titre, note: m.acf_fields.note || '0' }));
    } catch (e) {
      console.error('Erreur chargement classement :', e);
    }
  }
};
</script>
