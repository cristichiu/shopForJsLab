const { buildSchema } = require('graphql');

const schema = buildSchema(`
    scalar Decimal
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
        price: Decimal!
        user: User!
        cart: [Cart]
        likes: [Liked]
        images: [Image!]!
        created_at: String!
    }

    type Image {
        path: String!
        post: Post!
    }

    type Liked {
        user: User!
        post: Post!
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
        getPost(id: Int!): Post
    }

    type Mutation {
        register(username: String!, password: String!, verifyPass: String!): User
        login(username: String!, password: String!): User
        createPost(title: String!, description: String, images: [ImageInput!]!, price: Decimal!): Post
        createLike(id: Int!): Liked
        createCart(id: Int!): Cart
        deleteLike(id: Int!): Liked
        deleteCart(id: Int!): Cart
    }
`);

module.exports = schema
