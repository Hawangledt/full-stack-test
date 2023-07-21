const { User } = require('../models/user')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    async createOneUser(request, response) {
        try {
            const {
                name,
                email,
                password 
            } = request.body

            const data = await User.create({
                name,
                email,
                password
              })

            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                  message: "Unable to create a user record.",
                  cause: error.message
                })
        }
    }

    async loginUser(request, response) {
        try {
            const {
                email,
                password 
            } = request.body

            const user = await User.findOne({
                where:{email}
            })

            const match = bcrypt.compareSync(password, user.password)
            console.log(match)

            if (!match) {
                return response.status(400).send({"msg": "Invalid password"})
            }

            const token = sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: "1d"})
            return response.status(200).send({token})
        } catch (error) {
            return response.status(400).send(
                {
                  message: "Failed to login.",
                  cause: error.message
                })
            // throw new Error("Failed to login.", { cause: error })
        }
    }
}

module.exports = new UserController()
