const { User } = require('../models/user')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { verify } = require('jsonwebtoken')
const { updateUserService } = require('../services/user.services')

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

    async listOneUser(request, response) {
        try {
            const { id } = request.params
            const user = await User.findOne({ where: { id } })
            if (!user) return response.status(404).send({
                msg: 'User not found.'
            })

            return response.status(200).send({ name: user.name, email: user.email })
        } catch (error) {
            return response.status(401).send(
                {
                    message: "Unable to find the user.",
                    cause: error.message
                })
        }
    }

    async updateOneUser(request, response) {
        try {
            const { id, name, email } = request.body;

            const user = await User.findByPk(id, { paranoid: false })
            if (!user) {
                return response.status(404).json({ error: 'User not found.' })
            }

            if (user.email !== email) {
                const checkEmail = await User.findOne({ where: { email }, paranoid: false })
                if (checkEmail) {
                    return response.status(400).json({ error: 'Email already in use.' })
                }
            }

            await updateUserService({email, name})

            return response.status(200).send({ message: "User updated." })
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Unable to change a user record.",
                    cause: error.message
                })
        }
    }

    async deleteOneUser(request, response) {
        try {
            const { id } = request.params

            const user = await User.findByPk(id, { paranoid: true })
            if (!user) {
                return response.status(404).json({ error: 'User not found.' })
            }

            await user.destroy()

            return response.status(200).send({ message: "User deleted." })
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Unable to delete user.",
                    cause: error.message
                })
        }
    }

    async restoreOneUser(request, response) {
        try {
            const { id } = request.params;

            const user = await User.findByPk(id, { paranoid: false });
            if (!user) {
                return response.status(404).json({ error: 'User not found.' });
            }

            await user.restore();

            return response.status(200).json({ message: "User restored." });
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Unable to restore user.",
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
                where: { email }
            })

            if (!user) {
                return response.status(404).send({ "msg": "User not found." })
            }

            const match = bcrypt.compareSync(password, user.password)
            console.log(match)

            if (!match) {
                return response.status(401).send({ "msg": "Invalid password." })
            }

            const token = sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" })

            return response.status(200).send({ token })
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Failed to login.",
                    cause: error.message
                })
        }
    }

    async updatePassword(request, response) {
        try {
            const {
                password
            } = request.body

            const {
                authorization
            } = request.headers

            const payload = verify(authorization, process.env.JWT_SECRET)

            const user = await User.findOne({
                where: { email: payload.email },
                paranoid: true
            })

            if (!user) {
                return response.status(404).json({ error: 'User not found.' })
            }

            const match = bcrypt.compareSync(password, user.password)
            if (match) {
                return response.status(400).json({ error: 'The password provided is the same as the current one.' })
            }

            await User.update(
                {
                    password
                },
                {
                    where: {
                        email: payload.email,
                    },
                    individualHooks: true
                }
            );

            return response.status(200).send({ message: "Password updated." })
        } catch (error) {
            if(error.message.split("\n").length > 0){
                return response.status(400).send(
                    {
                        message: "Unable to change a user password.",
                        cause: error.message.split("\n")
                    })
            }
            return response.status(400).send(
                {
                    message: "Unable to change a user password.",
                    cause: error.message
                })
        }
    }
}

module.exports = new UserController()
