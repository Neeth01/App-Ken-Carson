<!-- src/views/Artiste.vue -->
<template>
  <div class="artist-page">
    <NavMenu />

    <!-- Photo Carousel -->
    <section class="carousel-section">
      <div class="carousel">
        <button class="nav prev" @click="prevSlide">❮</button>
        <div class="slides">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            :alt="`Photo ${index + 1}`"
            :class="{ active: currentSlide === index }"
          />
        </div>
        <button class="nav next" @click="nextSlide">❯</button>
      </div>
      <div class="dots">
        <span
          v-for="(_, idx) in images"
          :key="idx"
          :class="{ dot: true, active: currentSlide === idx }"
          @click="goToSlide(idx)"
        ></span>
      </div>
    </section>

    <!-- Bio Section -->
    <section class="bio-section">
      <h3>À propos</h3>
      <p class="bio-placeholder">
        Kenyatta Lee Frazier Jr. (né le 11 avril 2000), connu professionnellement sous le nom de Ken Carson (parfois stylisé sous le nom de Ken Car$on), est un rappeur, auteur-compositeur et producteur de disques américain. Il est connu pour son album studio A Great Chaos qui a débuté au numéro 11 au numéro du Billboard 200. <br><br>
        2015-2019 : <br>Débuts
Frazier a initialement signé avec 808 Mafia en 2015 en tant que rappeur après avoir rencontré le producteur de disques TM88, et commencerait à publier de la musique sur SoundCloud dès 2017. Après avoir gagné en popularité dans la scène rap underground, il sera découvert par son compatriote rappeur d'Atlanta Playboi Carti et signera sur son label Opium en 2019.<br><br>
2020-2023 : <br>Boy Barbie, Teen X, X et A Great Chaos
Après avoir signé avec Opium en 2019, Frazier sortira deux EPs en 2020, Boy Barbie et Teen X. Au début de 2021, il sortira un EP de suite intitulé Teen X: Relapsed, avant de sortir son premier album studio Project X plus tard cette année-là. Il a sorti son deuxième album studio X le 8 juillet 2022. Il a culminé au numéro 115 sur le Billboard 200. En février 2022, il est apparu en tant qu'invité sur le morceau Gëek High de l'album du rappeur américain Yeat, 2 Alivë. Il sortira ensuite le 13 octobre 2023 son troisième album studio intitulé A Great Chaos.L'album composé de 18 chansons comportera des collaborations intéressantes comme Lil Uzi Vert, ou encore Destroy Lonely.<br><br>



Style musical<br>
La similitude de son style avec le style utilisé par son directeur de disques Playboi Carti sur Whole Lotta Red a été notée par Alphonse Pierre de Pitchfork. Son style de musique est appelée de la Rage Music ou Opium Music en référence avec le label du même nom dans lequel il est signé. Son style est comparable à des artistes tels que Destroy Lonely, Yeat, Playboi Carti, le groupe Homixide Gang , ou encore Lancey Foux.
      </p>
    </section>

    <!-- Stats & Highlights -->
    <section class="stats-section">
      <h3>Stats & Highlights</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="icon">📀</div>
          <span class="stat-value">4</span>
          <span class="stat-label">Albums Studio</span>
        </div>
        <div class="stat-item">
          <div class="icon">🔊</div>
          <span class="stat-value">4.37B</span>
          <span class="stat-label">Total Streams</span>
        </div>
        <div class="stat-item">
          <div class="icon">👥</div>
          <span class="stat-value">8.9M</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat-item">
          <div class="icon">📈</div>
          <span class="stat-value">8M+</span>
          <span class="stat-label">Monthly Listeners</span>
        </div>
        <div class="stat-item">
          <div class="icon">💿</div>
          <span class="stat-value">6</span>
          <span class="stat-label">Mixtapes</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue';

// Import images statically
import ken1 from '../assets/ken1.jpg';
import ken2 from '../assets/ken2.jpg';
import ken3 from '../assets/ken3.jpg';
import ken4 from '../assets/ken4.jpg';

export default {
  name: 'Artiste',
  components: { NavMenu },
  data() {
    return {
      images: [ken1, ken2, ken3, ken4],
      currentSlide: 0,
      autoPlayTimer: null
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
    },
    goToSlide(idx) {
      this.currentSlide = idx;
    },
    startAutoPlay() {
      this.autoPlayTimer = setInterval(this.nextSlide, 5000);
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  }
};
</script>

