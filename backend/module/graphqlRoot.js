const { v4: uuidv4 } = require("uuid")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const root = {
    user: async (_, { user }) => {
        return user
    },

    posts: async () => {
        return await prisma.post.findMany({
            include: { images: true }
        })
    },

    userPosts: async (_, { user }) => {
        return await prisma.post.findMany({
            where: { userId: user.id },
            include: { images: true }
        })
    },

    createPost: async ({ title, description, images }, { user }) => {
        if(!user) return null
        return await prisma.post.create({
            data: {
                title, description,
                user: { connect: { id: user.id } },
                images: {
                    create: images.map(path => ({ path: path.path }))
                }
            },
            include: { images: true }
        })
    },

    register: async ({ username, password, verifyPass }) => {
        if(password !== verifyPass) return null
        return await prisma.user.create({
          data: { username, password, token: uuidv4() },
        });
    },

    login: async ({ username, password }) => {
        return await prisma.user.update({
            where: { username, password },
            data: {
                token: uuidv4()
            }
        })        
    }

};

module.exports = root
