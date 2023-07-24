const { consultAPI} = require('../controllers/beer.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class BeerRouter {
  routesFromBeer () {
    const beerRoutes = Router()
    beerRoutes.get('/consultAPI/:offset/:limit', auth, consultAPI)
    return beerRoutes
  }
}

module.exports = new BeerRouter()