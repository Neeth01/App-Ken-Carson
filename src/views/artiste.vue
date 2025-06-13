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
      <p class="bio-placeholder">Kenyatta Lee Frazier Jr. (né le 11 avril 2000), connu professionnellement sous le nom de Ken Carson (parfois stylisé sous le nom de Ken Car$on), est un rappeur, auteur-compositeur et producteur de disques américain. Il est connu pour son album studio A Great Chaos qui a débuté au numéro 11 au numéro du Billboard 200. <br><br>
        2015-2019 : <br>Débuts
Frazier a initialement signé avec 808 Mafia en 2015 en tant que rappeur après avoir rencontré le producteur de disques TM88, et commencerait à publier de la musique sur SoundCloud dès 2017. Après avoir gagné en popularité dans la scène rap underground, il sera découvert par son compatriote rappeur d'Atlanta Playboi Carti et signera sur son label Opium en 2019.<br><br>
2020-2023 : <br>Boy Barbie, Teen X, X et A Great Chaos
Après avoir signé avec Opium en 2019, Frazier sortira deux EPs en 2020, Boy Barbie et Teen X. Au début de 2021, il sortira un EP de suite intitulé Teen X: Relapsed, avant de sortir son premier album studio Project X plus tard cette année-là. Il a sorti son deuxième album studio X le 8 juillet 2022. Il a culminé au numéro 115 sur le Billboard 200. En février 2022, il est apparu en tant qu'invité sur le morceau Gëek High de l'album du rappeur américain Yeat, 2 Alivë. Il sortira ensuite le 13 octobre 2023 son troisième album studio intitulé A Great Chaos.L'album composé de 18 chansons comportera des collaborations intéressantes comme Lil Uzi Vert, ou encore Destroy Lonely.<br><br>



Style musical<br>
La similitude de son style avec le style utilisé par son directeur de disques Playboi Carti sur Whole Lotta Red a été notée par Alphonse Pierre de Pitchfork. Son style de musique est appelée de la Rage Music ou Opium Music en référence avec le label du même nom dans lequel il est signé. Son style est comparable à des artistes tels que Destroy Lonely, Yeat, Playboi Carti, le groupe Homixide Gang , ou encore Lancey Foux.
      </p>
    </section>

    <!-- Stats / Fun Facts -->
    <section class="stats-section">
      <h3>Stats</h3><br>
      <ul>
        <li><strong>Morceau le plus streamé :</strong>Yale</li>
        <li><strong>Streams :</strong> 4.37B	</li>
        <li><strong>Followers :</strong> 8.92M</li>
      </ul>
    </section>

    <!-- Social Links -->
    <section class="social-section">
      <h3>Réseaux</h3>
      <div class="social-icons">
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="YouTube">▶️</a>
        <a href="#" aria-label="Spotify">🎵</a>
      </div>
    </section>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'

export default {
  name: 'Artiste',
  components: { NavMenu },
  data() {
    return {
      images: [
        '../src/assets/ken1.jpg',
        '../src/assets/ken2.jpg',
        '../src/assets/ken3.jpg',
        '../src/assets/ken4.jpg'
      ],
      currentSlide: 0,
      autoPlayTimer: null
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
    },
    goToSlide(idx) {
      this.currentSlide = idx
    },
    startAutoPlay() {
      this.autoPlayTimer = setInterval(this.nextSlide, 5000)
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayTimer)
      this.autoPlayTimer = null
    }
  },
  mounted() {
    this.startAutoPlay()
  },
  beforeUnmount() {
    this.stopAutoPlay()
  }
}
</script>

<style scoped>
.artist-page {
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* Hero */
.hero {
  position: relative;
  height: 300px;
  background: url('/assets/hero-bg.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.artist-name {
  position: relative;
  font-size: 3rem;
  letter-spacing: 2px;
  background: linear-gradient(45deg, #ffffff, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Carousel */
.carousel-section {
  margin: 2rem 0;
  text-align: center;
}
.carousel {
  position: relative;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}
.slides img {
  display: none;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  transition: opacity 0.5s;
}
.slides img.active {
  display: block;
}
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  border: none;
  color: #fff;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.prev { left: 10px; }
.next { right: 10px; }
.dots {
  margin-top: 1rem;
}
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background: #555;
  border-radius: 50%;
  cursor: pointer;
}
.dot.active {
  background: #dc2626;
}

/* Bio */
.bio-section {
  background: rgba(0,0,0,0.4);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}
.bio-section h3 {
  margin-bottom: 1rem;
  color: #dc2626;
  text-transform: uppercase;
}
.bio-placeholder {
  color: #ccc;
  font-style: italic;
}

/* Stats */
.stats-section {
  margin-bottom: 2rem;
}
.stats-section ul {
  list-style: none;
  padding: 0;
}
.stats-section li {
  margin-bottom: 0.5rem;
}
.stats-section strong {
  color: #dc2626;
}

/* Social */
.social-section {
  text-align: center;
  padding-bottom: 2rem;
}
.social-icons a {
  margin: 0 1rem;
  font-size: 2rem;
  transition: transform 0.2s;
}
.social-icons a:hover {
  transform: scale(1.2);
}
</style>
