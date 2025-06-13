<!-- src/App.vue -->
<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// Import Google Fonts
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@400;600;700&display=swap');

// Import the main App styles
@import './styles/partials/_App.scss';
</style>