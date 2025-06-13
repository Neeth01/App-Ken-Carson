# App Ken Carson

**Projet SAE401 – Application de découverte musicale**

---

## 🎯 Contexte & Objectifs

Ce projet a été réalisé dans le cadre de la **SAE401** du BUT MMI à l'IUT de Saint-dié. Il s’agit d’une application web **single-page** développée avec **Vue 3** et **Vue Router**, permettant de parcourir et découvrir l’univers musical de **Ken Carson** :

- **Liste des albums** avec couverture, année et note  
- **Détail d’album** (pochette, titres, description, note)  
- **Détail d’un morceau** (titre, producteurs, featuring, paroles)  
- **Classement** des 20 meilleurs morceaux par note  
- **Page artiste**  avec carousel, stats et bio 
- **Barre de recherche** universelle (albums & morceaux)  

## 🛠️ Technologies & Architecture

| Partie             | Technologie                 |
|--------------------|-----------------------------|
| Framework Front    | Vue 3 + Composition API     |
| Routage            | Vue Router                  |
| Styles             | SCSS (Sass)                 |
| Build & Serveur    | Vite                        |
| API Back-end       | WordPress Headless + ACF    |

**Architecture**

src/
├── assets/ # Icônes, images statiques
├── components/ # Composants réutilisables (NavMenu…)
├── styles/ # SCSS global et partials
│ ├── main.scss # Point d’entrée SCSS
│ └── partials/ # Fichiers SCSS par composant
├── views/ # Pages liées aux routes
│ ├── AlbumList.vue # Liste des albums
│ ├── AlbumDetail.vue # Détail d’un album
│ ├── Classement.vue # Top 20 morceaux
│ ├── TrackDetail.vue # Détail d’un morceau
│ └── Artiste.vue # Page artiste
├── App.vue # Conteneur principal
├── main.js # Point d’entrée JavaScript
└── router/index.js # Définition des routes

bash
Copier
Modifier

## 🚀 Mise en route

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Neeth01/App-Ken-Carson.git
   cd App-Ken-Carson

2. **Installer les dépendances**  
   ```bash
   npm install

3. **Compiler le SCSS en CSS (watch)**  
   ```bash
   npm run sass

3. **Lancer l’application**  
   ```bash
   npm run dev

Accéder à http://localhost:3000 (ou le port indiqué)

🎨 Styles & Responsivité
Tout le CSS est écrit en SCSS dans src/styles/partials/.

Un seul fichier main.scss importe tous les partials.

Un watcher Sass génère automatiquement src/assets/main.css.

Layout responsive sur mobile (menu en colonne, grilles adaptatives, etc.).

🔧 Configuration API
L’application consomme une API WordPress (endpoints /wp-json/ken/v1/album et /wp-json/ken/v1/morceau).

Vous pouvez configurer l’URL de base dans src/main.js si nécessaire.

📚 Ressources & Documentation
Vue 3 Documentation

Vue Router Guide

Vite Documentation

Sass (SCSS) Guide

✨ Merci d’avoir exploré ce projet ! N’hésitez pas à ouvrir des issues ou PR pour toute amélioration.
