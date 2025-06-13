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
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'Classement',
  components: { NavMenu },
  data() {
    return {
      tracks: []
    }
  },
  computed: {
    top20() {
      return this.tracks
        .sort((a, b) => parseFloat(b.note) - parseFloat(a.note))
        .slice(0, 20)
    }
  },
  async created() {
    try {
      const res = await fetch('/wp-json/ken/v1/morceau')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      this.tracks = data.map(m => ({
        id:    m.id,
        titre: m.acf_fields.titre,
        note:  m.acf_fields.note || 0
      }))
    } catch (e) {
      console.error('Erreur chargement classement :', e)
    }
  }
}
</script>

<style scoped>
.classement-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #fff;
}

.section-title {
  font-size: 2.5rem;
  color: #dc2626;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #dc2626;
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

.classement-list {
  list-style: none;
  padding: 0;
}

.classement-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: background 0.2s;
}

.classement-item:hover {
  background: rgba(220, 38, 38, 0.1);
}

.rank {
  font-weight: 700;
  color: #dc2626;
  width: 2rem;
  text-align: center;
}

.track-link {
  flex: 1;
  margin: 0 1rem;
  color: #fff;
  text-decoration: none;
}

.note {
  font-weight: 700;
  color: #dc2626;
}

@keyframes spin {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
