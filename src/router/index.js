import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/Lists.vue'
import Aside from '../views/Aside.vue'
import Page from '../views/Page'
import Detail from '../views/Detail'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List,
    children: [
      {
        path: ':type_id?',
        name: 'List',
        components: {
          left: List,
          right: Aside,
          Page
        },
      },
    ]
  },
  {
    path:'/detail/:id',
    nmae:Detail,
    component:Detail
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
