axios.defaults.baseURL = 'http://sandbox.goship.io/api/v2'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.interceptors.request.use(function (config) {
  const authen = JSON.parse(localStorage.getItem('authen'))
  if (authen) {
    config.headers.Authorization = 'Bearer ' + authen.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  const token = JSON.parse(localStorage.getItem('authen'))
  let response = error.response
  if (response.status === 400 || response.status === 401) {
    if (!(response.config.method === 'post' && response.config.url === response.config.baseURL + '/login')) {
      if (token) {
        localStorage.removeItem('authen')
      }
      router.push({name: 'login'})
    }
  }
  return error.response.data
})