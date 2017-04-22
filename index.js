const routes = [
  {
    name: 'home',
    path: '/',
    component: Shipment,
    beforeEnter: requireAuth
  },
  {
    name: 'shipment',
    path: '/shipments',
    component: Shipment,
    beforeEnter: requireAuth
  },
  {
    name: 'create-shipment',
    path: '/shipments/create',
    component: CreateShipment,
    beforeEnter: requireAuth
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'customer',
    path: '/customers',
    component: Customer,
    beforeEnter: requireAuth
  }
]
const router = new VueRouter({
  routes
})
var app = new Vue({
  el: '#app',
  router,
  data () {
    return {
      active: 'shipments',
      isLogin: false
    }
  },
  methods: {
    logOut () {
      let authen = localStorage.getItem('authen')
      if (authen) {
        localStorage.removeItem('authen')
        router.push({name: 'login'})
      }
    }
  },
  mounted () {
    this.active = this.$router.currentRoute.fullPath.split('/')[1]
    let authen = localStorage.getItem('authen')
    if (authen) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'home') {
        this.active = 'shipments'
      } else {
        this.active = to.fullPath.split('/')[1]
      }
    }
  }
})
