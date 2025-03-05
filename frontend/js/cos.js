axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            getCartPosts {
                post { id, title, description, price, cart { post { id } }, likes { post { id } }, images { path } }
           }
        }`
}).then(response => {
    if(response.data.data.getCartPosts == null) return
    posts = response.data.data.getCartPosts
    displayPosts(posts, "cos")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
