module.exports = function exec(prisma) {
    const auth = require("./auth.js")(prisma)
    const posts = require("./posts.js")(prisma)
    const user = require("./user.js")(prisma)

    return { ...auth, ...posts, ...user }
}
