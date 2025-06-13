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
import { ref, computed } from 'vue';
// Import SCSS styles for NavMenu
import '../styles/partials/_NavMenu.scss';

export default {
  name: 'NavMenu',
  setup() {
    const showSearch = ref(false);
    const query = ref('');
    const albums = ref([]);
    const tracks = ref([]);

    fetch('/wp-json/ken/v1/album')
      .then(r => r.json())
      .then(data => {
        albums.value = data.map(a => ({ id: a.id, name: a.acf_fields.nom, route: { name: 'Album', params: { id: a.id } } }));
      });
    fetch('/wp-json/ken/v1/morceau')
      .then(r => r.json())
      .then(data => {
        tracks.value = data.map(t => ({ id: t.id, name: t.acf_fields.titre, route: { name: 'Track', params: { id: t.id } } }));
      });

    const filteredResults = computed(() => {
      if (!query.value) return [];
      const q = query.value.toLowerCase();
      return [
        ...albums.value.filter(a => a.name.toLowerCase().includes(q)).map(i => ({ ...i, category: 'Albums' })),
        ...tracks.value.filter(t => t.name.toLowerCase().includes(q)).map(i => ({ ...i, category: 'Morceaux' }))
      ];
    });

    const groupedResults = computed(() =>
      filteredResults.value.reduce((groups, item) => {
        (groups[item.category] = groups[item.category] || []).push(item);
        return groups;
      }, {})
    );

    function toggleSearch() {
      showSearch.value = !showSearch.value;
      if (showSearch.value) setTimeout(() => document.querySelector('.search-input')?.focus(), 0);
    }
    function open() { showSearch.value = true; }
    function close() { setTimeout(() => { if (!document.activeElement.classList.contains('search-input')) showSearch.value = false; }, 150); }

    return { showSearch, query, filteredResults, groupedResults, toggleSearch, open, close };
  }
};
</script>
