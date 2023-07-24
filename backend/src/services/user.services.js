const { User } = require("../models/user")

class UserService {
    async updateUserService({name, email, password}){
        const dataForUpdate = Object.assign({},
            email && { email },
            name && { name },
            password && { password },
       )

        await User.update(
            dataForUpdate,
            { where: { email }}
          )
    }
}

module.exports = new UserService()
