axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            posts {
                id, title, description, price, cart { post { id } }, likes { post { id } } images { path }
            }
        }`
}).then(response => {
    if(response.data.data.posts == null) return
    posts = response.data.data.posts
    displayPosts(posts, "produse")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
