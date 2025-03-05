module.exports = {
    user (_, { user }) {
        return user
    },
    async createLike ({ id }, { user, prisma }) {
        if(!user) return null
        return await prisma.liked.create({
            data: {
                post: { connect: { id } },
                user: { connect: { id: user.id } }
            },
            include: { post: true }
        })
    },
    async createCart ({ id }, { user, prisma }) {
        if(!user) return null
        return await prisma.cart.create({
            data: {
                post: { connect: { id } },
                user: { connect: { id: user.id } }
            },
            include: { post: true }
        })
    },
    async deleteLike ({ id }, { user, prisma }) {
        return await prisma.liked.delete({
            where: {
                userId_postId: {
                    postId: id,
                    userId: user.id
                }
            },
            include: { post: true }
        })
    },
    async deleteCart ({ id }, { user, prisma }) {
        return await prisma.cart.delete({
            where: {
                userId_postId: {
                    postId: id,
                    userId: user.id
                }
            },
            include: { post: true }
        })
    },
    async getLikedPosts (_, { user, prisma }) {
        if(!user) return null
        return await prisma.liked.findMany({
            where: { userId: user.id },
            include: {
                post: {
                    include: {
                        images: true,
                        likes: { where: { userId: user.id } },
                        cart: { where: { userId: user.id } }
                    }
                }
            }
        })
    },
    async getCartPosts (_, { user, prisma }) {
        if(!user) return null
        return await prisma.cart.findMany({
            where: { userId: user.id },
            include: {
                post: {
                    include: {
                        images: true,
                        likes: { where: { userId: user.id } },
                        cart: { where: { userId: user.id } }
                    }
                }
            }
        })
    }
}
