<template>
  <header class="header">
    <h1 class="main-title">KEN CARSON</h1>
    <nav class="nav-menu">
      <router-link :to="{ name: 'Artiste' }" class="nav-item" active-class="active">L'artiste</router-link>
      <router-link :to="{ name: 'Classement' }" class="nav-item" active-class="active">Classement</router-link>
      <router-link :to="{ name: 'AlbumList' }" class="nav-item" active-class="active">Tous les albums</router-link>
      <div class="search-container" @click.stop>
        <button class="search-toggle" @click="toggleSearch">🔍</button>
        <transition name="fade">
          <div v-if="showSearch" class="search-dropdown">
            <input
              type="text"
              v-model="query"
              class="search-input"
              placeholder="Rechercher..."
              @focus="open"
              @blur="close"
            />
            <div v-if="filteredResults.length" class="results">
              <div class="category" v-for="(items, cat) in groupedResults" :key="cat">
                <h4>{{ cat }}</h4>
                <ul>
                  <li v-for="item in items" :key="item.id">
                    <router-link :to="item.route">{{ item.name }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'NavMenu',
  setup() {
    const showSearch = ref(false)
    const query = ref('')
    const albums = ref([])
    const tracks = ref([])

    // Fetch album and track lists once
    fetch('/wp-json/ken/v1/album').then(r => r.json()).then(data => {
      albums.value = data.map(a => ({ id: a.id, name: a.acf_fields.nom, route: { name: 'Album', params: { id: a.id } } }))
    })
    fetch('/wp-json/ken/v1/morceau').then(r => r.json()).then(data => {
      tracks.value = data.map(t => ({ id: t.id, name: t.acf_fields.titre, route: { name: 'Track', params: { id: t.id } } }))
    })

    const filteredResults = computed(() => {
      if (!query.value) return []
      const q = query.value.toLowerCase()
      return [
        ...albums.value.filter(a => a.name.toLowerCase().includes(q)).map(i => ({ ...i, category: 'Albums' })),
        ...tracks.value.filter(t => t.name.toLowerCase().includes(q)).map(i => ({ ...i, category: 'Morceaux' }))
      ]
    })

    const groupedResults = computed(() => {
      return filteredResults.value.reduce((groups, item) => {
        (groups[item.category] = groups[item.category] || []).push(item)
        return groups
      }, {})
    })

    function toggleSearch() {
      showSearch.value = !showSearch.value
      if (showSearch.value) {
        setTimeout(() => document.querySelector('.search-input')?.focus(), 0)
      }
    }
    function open() { showSearch.value = true }
    function close() {
      setTimeout(() => { if (!document.activeElement.classList.contains('search-input')) showSearch.value = false }, 150)
    }

    return { showSearch, query, filteredResults, groupedResults, toggleSearch, open, close }
  }
}
</script>

<style scoped>
.header {
  z-index: 10000; /* Toujours au-dessus */
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

.header { text-align: center; margin-bottom: 2rem; position: relative; }
.nav-menu { display: flex; justify-content: center; align-items: center; gap: 1.5rem; position: relative; }
.search-container { position: relative;   z-index: 10000; /* Toujours au-dessus */
 }
.search-toggle { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #666; }
.search-dropdown { position: absolute; top: 2.5rem; right: 0; background: rgba(0,0,0,0.8); padding: 1rem; border-radius: 8px; width: 300px; }
.search-input { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }
.results { margin-top: 0.5rem; max-height: 300px; overflow-y: auto; }
.category h4 { margin: 0.5rem 0; color: #dc2626; font-size: 0.9rem; text-transform: uppercase; }
.category ul { list-style: none; padding: 0; margin: 0; }
.category li { padding: 0.25rem 0; }
.category li a { color: #fff; text-decoration: none; }
.category li a:hover { color: #dc2626; }
.fade-enter-active, .fade-leave-active { transition: all 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-enter-to, .fade-leave-from { opacity: 1; transform: translateY(0); }
</style>


