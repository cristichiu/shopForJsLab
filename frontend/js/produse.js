const user_interface = document.getElementById("user-interface")
axios.post('http://localhost:5000/graphql', {
    query: `
query {
    posts {
        title, description, images { path }
    }
}
`
},{
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => {
    if(response.data.data.posts == null) return
    response.data.data.posts.forEach(post => {
        const product = document.createElement("div")
        product.classList.add("product")
        product.innerHTML = `
<div class="title">${post.title}</div>
<img src="http://localhost:5000/uploads/${post.images[0].path}" alt="${post.title}" />
<div class="desc">${post.description}</div>
`
        user_interface.appendChild(product)
    })
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
