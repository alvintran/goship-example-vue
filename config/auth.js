const requireAuth = (to, from, next) => {
  let token = localStorage.getItem('authen')
  if (!token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}