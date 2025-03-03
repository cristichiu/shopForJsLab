const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID!
        username: String!
        token: String!
        created_at: String!
        posts: [Post!]!
    }
    
    type Post {
        id: ID!
        title: String!
        description: String
        price: Int!
        user: User!
        images: [Image!]!
        created_at: String!
    }

    type Image {
        id: ID!
        path: String!
        post: Post!
    }

    type Liked {
        user: User
        post: Post
    }
    
    type Cart {
        user: User!
        post: Post!
    }
    
    input ImageInput {
        path: String!
    }

    type Query {
        user: User
        posts: [Post]
        userPosts: [Post]
        getLikedPosts: [Liked]
        getCartPosts: [Cart]
    }

    type Mutation {
        register(username: String!, password: String!, verifyPass: String!): User
        login(username: String!, password: String!): User
        createPost(title: String!, description: String, images: [ImageInput!]!): Post
        createLike(id: Int!): Liked
        createCart(id: Int!): Cart
    }
`);

module.exports = schema
