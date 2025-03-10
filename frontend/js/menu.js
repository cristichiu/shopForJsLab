const menuHtml = () => {
    return `
<div class="up">
    <a href="./produse.html" class="logo">777</a>
    <div class="links">
        <a href="./home.html">home</a>
        <a href="./produse.html">produse</a>
        <a href="./cos.html">coș</a>
    </div>
    <div class="auth" id="authContext">
        <a href="./auth.html?auth=login">Login</a>
    </div>
</div>
<div class="down">
    <div class="upMenu">
        <ion-icon name="filter-outline"></ion-icon>
    </div>
    <input placeholder="Search" id="searchBar"/>
    <div class="icons" id="menuIcons">
        <a href="./auth.html?auth=login"><ion-icon name="person-outline"></ion-icon></a>
        <a href="./preferate.html"><ion-icon name="heart-outline"></ion-icon></a>
        <a href="./cos.html"><ion-icon name="cart-outline"></ion-icon></a>
    </div>
</div>
`
}
const menu = document.getElementsByClassName("menu")[0]
menu.innerHTML = menuHtml()

const authContext = document.getElementById("authContext")

let menuQuery = `query { user { username } }`
axios.get(`http://localhost:5000/graphql?query=${menuQuery}`).then(response => {
    if(response.data.data.user == null) return
    authContext.innerHTML = `<a href="./auth.html">${response.data.data.user.username}</a>`
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
