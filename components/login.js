const Login = {
  template: '<div class="wrapper">\
    <div v-if="errors" class="alert alert-warning alert-dismissible shipment-alert" role="alert">\
      <button type="button" class="close" @click="closeAlert" ><span aria-hidden="true">&times;</span></button>\
      <p>{{errors}}</p>\
    </div>\
    <form class="form-signin" @submit.prevent="loginForm">\
      <h2 class="form-signin-heading">Đăng nhập</h2>\
      <input type="email" class="form-control" name="username" v-model="login.username" placeholder="Email" required="" autofocus="" />\
      <input type="password" class="form-control" name="password" v-model="login.password" placeholder="Mật khẩu" required=""/>\
      <button class="btn btn-lg btn-primary btn-block" type="submit">Đăng nhập</button>\
    </form>\
  </div>',
  data () {
    return {
      login: {
        username: '',
        password: '',
        client_id: '',
        client_secret: ''
      },
      errors: ''
    }
  },
  methods: {
    loginForm () {
      axios.post('login', this.login).then(response => {
        if (response.code === 200) {
          let authen = JSON.stringify(response)
          localStorage.setItem('authen', authen)
          let token = localStorage.getItem('authen')
          if (token) {
            this.$router.push({name: 'home'})
          }
        }
        if (response.code === 422) {
          let er = response.data.errors
          let message = er[0]
          this.errors = message
        }
      })
    },
    closeAlert () {
      this.errors = ''
    }
  }
}