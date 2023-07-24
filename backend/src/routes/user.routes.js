const { createOneUser, 
        listOneUser, 
        updateOneUser, 
        deleteOneUser, 
        restoreOneUser, 
        loginUser, 
        updatePassword } = require('../controllers/user.controller')

const { auth } = require('../middleware/auth')

const { Router } = require('express')

class UserRouter {
  routesFromUser() {
    const userRoutes = Router()
    userRoutes.post('/createOneUser', createOneUser)
    userRoutes.get('/listOneUser/:id', auth, listOneUser)
    userRoutes.patch('/updateOneUser', auth, updateOneUser)
    userRoutes.delete('/deleteOneUser/:id', auth, deleteOneUser)
    userRoutes.patch('/restoreOneUser/:id', auth, restoreOneUser)
    userRoutes.post('/loginUser', loginUser)
    userRoutes.post('/updatePassword', auth, updatePassword)
    return userRoutes 
  }
}

module.exports = new UserRouter()