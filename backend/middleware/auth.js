const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        req.user = null
        next()
        return
    }

    const token = authHeader.split(" ")[1]
    if(token == "" || token == undefined || token == null) {
        req.user = null
        next()
        return
    }
    const user = await prisma.user.findUnique({where: {token}})

    if(!user) {
        req.user = null
        next();
        return
    }
    req.user = user
    next()
}

module.exports = authMiddleware
