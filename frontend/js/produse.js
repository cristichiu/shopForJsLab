const user_interface = document.getElementById("user-interface")
axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            posts {
                id, title, description, images { path }
            }
        }`
}).then(response => {
    if(response.data.data.posts == null) return
    response.data.data.posts.forEach(post => {
        const product = document.createElement("div")
        product.classList.add("card")
        product.innerHTML = `
  <img src="http://localhost:5000/uploads/${post.images[0].path}" alt="${post.title}">
  <div class="card-content">
    <h3 class="card-title">${post.title}</h3>
    <p class="card-description">${post.description}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
  </div>
  <div class="card-buttons">
    <button class="buy-button">Adaugă în coș</button>
    <button class="fav-button">Preferat</button>
  </div>
`
        user_interface.appendChild(product)
    })
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
