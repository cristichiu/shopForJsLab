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
        user: User!
        images: [Image!]!
        created_at: String!
    }

    type Image {
        id: ID!
        path: String!
        post: Post!
    }
    
    input ImageInput {
        path: String!
    }

    type Query {
        user: User
        posts: [Post]
        userPosts: [Post]
    }

    type Mutation {
        register(username: String!, password: String!, verifyPass: String!): User
        login(username: String!, password: String!): User
        createPost(title: String!, description: String, images: [ImageInput!]!): Post
    }
`);

module.exports = schema
