import Vue from 'vue'
import Router from 'vue-router'
import Citynews from 'components/citynews/citynews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Citynews',
      component: Citynews
    },
    {
      path: '/Citynews',
      name: 'Citynews',
      component: Citynews
    }
  ]
})
