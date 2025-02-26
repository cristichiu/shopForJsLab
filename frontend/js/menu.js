function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const menuHtml = () => {
    return `
<div class="up">
    <div class="logo">777</div>
    <div class="links">
        <a href="./home.html">home</a>
        <a href="./produse.html">produse</a>
        <a href="cos.html">cos</a>
    </div>
    <div class="auth" id="authContext">
        <div>Login</div>
    </div>
</div>
<div class="down">
    <div class="upMenu">
        <ion-icon name="filter-outline"></ion-icon>
    </div>
    <input placeholder="Search" />
    <div class="icons">
        <ion-icon name="person-outline"></ion-icon>
        <ion-icon name="heart-outline"></ion-icon>
        <ion-icon name="cart-outline"></ion-icon>
    </div>
</div>
`
}
const menu = document.getElementsByClassName("menu")[0]
menu.innerHTML = menuHtml()

const authContext = document.getElementById("authContext")

axios.post('http://localhost:5000/graphql', {
    query: `
query {
    user {
        username
    }
}
`
},{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${getCookie("authToken")}`
    }
}).then(response => {
    if(response.data.data.user == null) return
    authContext.innerHTML = response.data.data.user.username
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
