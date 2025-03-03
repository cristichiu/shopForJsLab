const { v4: uuidv4 } = require("uuid")

module.exports = function exec(prisma) {
    const res = {
        async register ({ username, password, verifyPass }) {
            if(!username || !password || !verifyPass) return null
            if(password !== verifyPass) return null
            return await prisma.user.create({
                data: { username, password, token: uuidv4() },
            });
        },
        async login ({ username, password }) {
            if(!username || !password) return null
            return await prisma.user.update({
                where: { username, password },
                data: {
                    token: uuidv4()
                }
            })        
        }
    }

    return res
}
