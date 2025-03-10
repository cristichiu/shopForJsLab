const likedQuery = ` query { getLikedPosts { post { id, title, description, price, cart { postId }, likes { postId }, images { path } } } }`
axios.get(`http://localhost:5000/graphql?query=${likedQuery}`).then(response => {
    if(response.data.data.getLikedPosts == null) return
    posts = response.data.data.getLikedPosts
    displayPosts(posts, "preferate")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
