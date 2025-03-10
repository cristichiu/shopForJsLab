const produseQuery = ` query { posts { id, title, description, price, cart { postId }, likes { postId } images { path } } }`
axios.get(`http://localhost:5000/graphql?query=${produseQuery}`).then(response => {
    if(response.data.data.posts == null) return
    posts = response.data.data.posts
    displayPosts(posts, "produse")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
