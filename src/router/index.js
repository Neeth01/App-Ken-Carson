import { createRouter, createWebHistory } from 'vue-router'
import AlbumList   from '../views/AlbumList.vue'
import Classement  from '../views/Classement.vue'
import Artiste     from '../views/artiste.vue'
import AlbumDetail from '../views/AlbumDetail.vue'
import TrackDetail from '../views/TrackDetail.vue'

const routes = [
  { path: '/',           name: 'AlbumList', component: AlbumList },
  { path: '/classement', name: 'Classement', component: Classement },
  { path: '/artiste',    name: 'Artiste',    component: Artiste },
  { path: '/album/:id',  name: 'Album',      component: AlbumDetail, props: true },
  { path: '/track/:id',  name: 'Track',      component: TrackDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
