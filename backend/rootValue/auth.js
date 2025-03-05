const { v4: uuidv4 } = require("uuid")

module.exports = {
    async register ({ username, password, verifyPass }, { prisma }) {
        if(!username || !password || !verifyPass) return null
        if(password !== verifyPass) return null
        return await prisma.user.create({
            data: { username, password, token: uuidv4() },
        });
    },
    async login ({ username, password }, { prisma }) {
        if(!username || !password) return null
        return await prisma.user.update({
            where: { username, password },
            data: {
                token: uuidv4()
            }
        })        
    }
}
