const cosQuery = `query { getCartPosts { post { id, title, description, price, cart { postId }, likes { postId }, images { path } } } }`
axios.get(`http://localhost:5000/graphql?query=${cosQuery}`).then(response => {
    if(response.data.data.getCartPosts == null) return
    posts = response.data.data.getCartPosts
    displayPosts(posts, "cos")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
