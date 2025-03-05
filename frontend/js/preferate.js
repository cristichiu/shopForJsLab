axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            getLikedPosts {
                post { id, title, description, price, cart { post { id } }, likes { post { id } }, images { path } }
           }
        }`
}).then(response => {
    if(response.data.data.getLikedPosts == null) return
    posts = response.data.data.getLikedPosts
    displayPosts(posts, "preferate")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
