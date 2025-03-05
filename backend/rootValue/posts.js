module.exports = {
    async posts(_, { prisma, user }) {
        if(user == null) user = { id: 0 }
        return await prisma.post.findMany({
            include: {
                images: true,
                likes: { where: { userId: user.id } },
                cart: { where: { userId: user.id } }
            }
        })
    },
    async userPosts (_, { user, prisma }) {
        return await prisma.post.findMany({
            where: { userId: user.id },
            include: { images: true }
        })
    },
    async getPost ({ id }, { user, prisma }) {
        let t = await prisma.post.findUnique({
            where: { id },
            include: { images: true, likes: true, user: true }
        })
        console.log(t)
        return t
    },
    async createPost ({ title, description, images, price }, { user, prisma }) {
        if(!user) return null
        return await prisma.post.create({
            data: {
                title, description, price,
                user: { connect: { id: user.id } },
                images: {
                    create: images.map(path => ({ path: path.path }))
                }
            },
            include: { images: true }
        })
    },
}
