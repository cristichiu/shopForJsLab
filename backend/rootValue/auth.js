const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")

module.exports = {
    async register ({ username, password, verifyPass }, { prisma }) {
        if(!username || !password || !verifyPass) return null
        if(password !== verifyPass) return null
        password = await bcrypt.hash(password, 10)
        return await prisma.user.create({
            data: { username, password, token: uuidv4() },
        });
    },
    async login ({ username, password }, { prisma }) {
        if(!username || !password) return null
        let user = await prisma.user.update({
            where: { username },
            data: {
                token: uuidv4()
            }
        })
        let match = await bcrypt.compare(password, user.password)
        if(match) return user; else return null
    }
}
