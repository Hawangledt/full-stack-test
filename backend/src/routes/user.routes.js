const { createOneUser, 
        listOneUser, 
        updateOneUser, 
        deleteOneUser, 
        restoreOneUser, 
        loginUser, 
        updatePassword } = require('../controllers/user.controller')

        const { Router } = require('express')

class UserRouter {
  routesFromUser() {
    const userRoutes = Router()
    userRoutes.post('/createOneUser', createOneUser)
    userRoutes.get('/listOneUser/:id', listOneUser)
    userRoutes.patch('/updateOneUser', updateOneUser)
    userRoutes.delete('/deleteOneUser/:id', deleteOneUser)
    userRoutes.patch('/restoreOneUser/:id', restoreOneUser)
    userRoutes.post('/loginUser', loginUser)
    userRoutes.post('/updatePassword', updatePassword)
    return userRoutes 
  }
}

module.exports = new UserRouter()