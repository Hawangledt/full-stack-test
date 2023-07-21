const { Router } = require('express')
const { routesFromUser } = require('./user.routes')


const routes = new Router()

routes.use('/api', [
  routesFromUser(),
])

module.exports = routes
