const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const graphqlSchema = require("./module/graphqlSchema.js")
const graphqlRoot = require("./rootValue/index.js")(prisma)
const authMiddleware = require("./middleware/auth.js")
const upload = require("./module/multer.js")

const app = express();

app.use(cors())
app.use(express.json())
app.use(authMiddleware)
app.use("/uploads", express.static("uploads"))

app.post('/uploads', upload.array('images', 5), async (req, res) => {
    if(!req.files) return res.status(400).json({ message: "Nu sunt imagini incarcate" })
    const images = req.files.map(file => ({
        path: file.filename
    }))
    res.json(images);
});

app.use('/graphql', graphqlHTTP((req) => ({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    context: { user: req.user },
    graphiql: true,
})));

app.use("/test", (req, res) => {
    console.log(req)
})

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000/graphql');
});
