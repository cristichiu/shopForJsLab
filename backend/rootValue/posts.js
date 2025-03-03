module.exports = function exec(prisma) {
    const res = {
        async posts() {
            return await prisma.post.findMany({
                include: { images: true }
            })
        },
        async userPosts (_, { user }) {
            return await prisma.post.findMany({
                where: { userId: user.id },
                include: { images: true }
            })
        },
        async createPost ({ title, description, images }, { user }) {
            if(!user) return null
            return await prisma.post.create({
                data: {
                    title, description,
                    price: 0,
                    user: { connect: { id: user.id } },
                    images: {
                        create: images.map(path => ({ path: path.path }))
                    }
                },
                include: { images: true }
            })
        },
    }

    return res
}
