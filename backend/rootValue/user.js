module.exports = function exec(prisma) {
    const res = {
        user (_, { user }) {
            return user
        },
        async createLike ({ id }, { user }) {
            if(!user) return null
            return await prisma.liked.create({
                data: {
                    post: { connect: { id } },
                    user: { connect: { id: user.id } }
                },
                include: { post: true }
            })
        },
        async createCart ({ id }, { user }) {
            if(!user) return null
            return await prisma.cart.create({
                data: {
                    post: { connect: { id } },
                    user: { connect: { id: user.id } }
                },
                include: { post: true }
            })
        },
        async getLikedPosts (_, { user }) {
            if(!user) return null
            return await prisma.liked.findMany({
                where: { userId: user.id },
                include: { post: true }
            })
        },
        async getCartPosts (_, { user }) {
            if(!user) return null
            return await prisma.cart.findMany({
                where: { userId: user.id },
                include: { post: true }
            })
        }
    }

    return res
}
