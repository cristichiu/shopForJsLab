axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            userPosts {
                id, title, description, price, cart { post { id } }, likes { post { id } } images { path }
            }
        }`
}).then(response => {
    if(response.data.data.userPosts == null) return
    posts = response.data.data.userPosts
    displayPosts(posts, "home")
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            user {
                username
            }
        }`
}).then(response => {
    if(response.data.data.user == null) {
        const createPostButton = document.getElementById("createPostButton")
        createPostButton.style.display = "none"
        user_interface.innerHTML = `<div>Nu esti logat</div><a href="./auth.html?auth=login">Login</a>`
        user_interface.style.display = "flex"
        user_interface.style.flexDirection = "column"
        user_interface.style.alignItems = "center"
    } else {
        const menuIcons = document.getElementById("menuIcons")
        const createPostButton = document.createElement("a")
        createPostButton.href = "./createPost.html"
        createPostButton.innerText = "+"
        menuIcons.insertBefore(createPostButton, menuIcons.firstChild)
    }
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
