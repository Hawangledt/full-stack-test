const { consultAPI} = require('../controllers/beer.controller')
const { Router } = require('express')

class BeerRouter {
  routesFromBeer () {
    const beerRoutes = Router()
    beerRoutes.get('/consultAPI/:offset/:limit', consultAPI)
    return beerRoutes
  }
}

module.exports = new BeerRouter()