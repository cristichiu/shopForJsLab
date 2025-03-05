const user_interface = document.getElementById("user-interface")
const serachBar = document.getElementById("searchBar")
let posts = []
function displayPosts(postsP, type="default") {
    user_interface.innerHTML = ""
    if(postsP.length <= 0) {
        switch(type) {
            case "cos": { user_interface.innerText = "Nu ai produse în coș."; break; }
            case "home": { user_interface.innerText = "Nu ai produse adaugate."; break; }
            case "produse": { user_interface.innerText = "Nu sunt produse."; break; }
            case "preferate": { user_interface.innerText = "Nu ai produse preferate."; break; }
            default: { user_interface.innerText = "Nu ai produse."; break; }
        }
    }
    postsP.forEach(post => {
        if(post.post) post = post.post
        const product = document.createElement("div")
        product.classList.add("card")
        product.innerHTML = `
<img src="http://localhost:5000/uploads/${post.images[0].path}" alt="${post.title}">
<div class="card-content">
    <h3 class="card-title">${post.title}</h3>
    <p class="card-price">${post.price.replace(".", ",")} LEI</p>
</div>
<div class="card-buttons">
    ${post.cart == null || post.cart.length <= 0 ? `<button class="cart-button" onclick="addCart(event, ${post.id}, '${type}')">Adaugă în coș</button>` : `<button class="cart-button" onclick="removeCart(event, ${post.id}, '${type}')">Scoate din coș</button>`}
    ${post.likes == null || post.likes.length <= 0 ? `<button class="fav-button" onclick="addFav(event, ${post.id}, '${type}')">Preferat</button>` : `<button class="fav-button" onclick="removeFav(event, ${post.id}, '${type}')">Scoate din preferat</button>`}
</div>
`
        user_interface.insertBefore(product, user_interface.firstChild)
    })
}
searchBar.addEventListener("input", (event) => {
    let filteredPosts = posts.filter(post => post.title.includes(searchBar.value))
    displayPosts(filteredPosts)
})

function addCart(event, id, type) {
    axios.post('http://localhost:5000/graphql', {
        query: `
            mutation {
                createCart (id: ${id}) {
                    post { id }
                }
            }`
    }).then(response => {
        if(response.data.data.createCart == null) return
        event.target.innerText = "Scoate din coș"
        event.target.onclick = (e) => removeCart(e, id, type)
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}

function addFav(event, id, type) {
    axios.post('http://localhost:5000/graphql', {
        query: `
            mutation {
                createLike (id: ${id}) {
                    post { id }
                }
            }`
    }).then(response => {
        if(response.data.data.createLike == null) return
        event.target.innerText = "Scoate din preferat"
        event.target.onclick = (e) => removeFav(e, id, type)
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}

function removeCart(event, id, type) {
    axios.post('http://localhost:5000/graphql', {
        query: `
            mutation {
                deleteCart (id: ${id}) {
                    post { id }
                }
            }`
    }).then(response => {
        if(response.data.data.deleteCart == null) return
        event.target.innerText = "Adauga în coș"
        event.target.onclick = (e) => addCart(e, id, type)
        if(type == "cos") {
            event.target.closest('.card').remove()
        }
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}

function removeFav(event, id, type) {
    axios.post('http://localhost:5000/graphql', {
        query: `
            mutation {
                deleteLike (id: ${id}) {
                    post { id }
                }
            }`
    }).then(response => {
        if(response.data.data.deleteLike == null) return
        event.target.innerText = "Preferat"
        event.target.onclick = (e) => addFav(e, id, type)
        if(type == "preferate") {
            event.target.closest('.card').remove()
        }
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}
