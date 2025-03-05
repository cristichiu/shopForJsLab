const params = new URLSearchParams(window.location.search);
const authMethod = params.get("auth"); // Ex: ?cheie=valoare
const user_interface = document.getElementById("user-interface")

function logout() {
    document.cookie = `authToken=`
    window.location.reload();
}

const verifyAuthUser = async () => {
    const user = await axios.post('http://localhost:5000/graphql', {
        query: `
            query {
                user {
                    username
                }
            }`
    })
    if(user.data.data.user != null) return `
<div class="authContainer">
    <div>Salut ${user.data.data.user.username}</div>
    <button onclick="logout()" id="logoutButton">logout</button>
</div>
`
    return 0;
}

const loginHTML = async () => {
    const verify = await verifyAuthUser()
    if(verify) return verify
    return `
<div class="authContainer">
    <div>Login</div>
    <div class="loginForm">
        <label for="username">username: </label>
        <input name="username" type="text" id="username" />
        <label for="password">password: </label>
        <input name="password" type="password" id="password" />
    </div>
    <div id="loginButton" class="authButton" onclick="loginMethod()">Login</div>
    <div id="authError"></div>
    <a href="./auth.html?auth=register" class="login">Register</a>
</div>
`
}

const registerHTML = async () => {
    const verify = await verifyAuthUser()
    if(verify) return verify
    return `
<div class="authContainer">
    <div>Register</div>
    <div class="loginForm">
        <label for="username">username: </label>
        <input name="username" type="text" id="username" />
        <label for="password">password: </label>
        <input name="password" type="password" id="password" />
        <label for="verifyPass">verify password: </label>
        <input name="verifyPass" type="password" id="verifyPass" />
    </div>
    <div id="registerButton" class="authButton" onclick="registerMethod()">register</div>
    <div id="authError"></div>
    <a href="./auth.html?auth=login" class="login">Login</a>
</div>
`
}

let username = document.getElementById("username")
let password = document.getElementById("password")
let verifyPass = document.getElementById("verifyPass")
let authError = document.getElementById("authError") 
async function displayAuth() {
    user_interface.innerHTML = authMethod == "register" ? await registerHTML() : await loginHTML()
    username = document.getElementById("username")
    password = document.getElementById("password")
    verifyPass = document.getElementById("verifyPass")
    authError = document.getElementById("authError") 
}
displayAuth()

function registerMethod() {
    if(username.value == "" || password.value == "" || verifyPass.value == "") {
        authError.innerText = "Toate campurile trebuie sa fie completate."
        return
    }
    if(password.value !== verifyPass.value) {
        authError.innerText = "Verificarea parolei nu este corecta."
        return
    }
    const query = `
        mutation {
            register(username: "${username.value}", password: "${password.value}", verifyPass: "${verifyPass.value}") {
                id, token
            }
        }`
    axios.post('http://localhost:5000/graphql', { query }).then(response => {
        if(response.data.data.register == null) {
            authError.innerText = "User cu asa nume deja exista."
            return
        }
        document.cookie = `authToken=${response.data.data.register.token}`
        window.location.reload();
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error));
}

function loginMethod() {
    if(username.value == "" || password.value == "") {
        authError.innerText = "Toate campurile trebuie sa fie completate."
        return
    }
    const query = `
        mutation {
            login(username: "${username.value}", password: "${password.value}") {
                id, token
            }
        }`
    axios.post('http://localhost:5000/graphql', { query }).then(response => {
        if(response.data.data.login == null) {
            authError.innerText = "Username sau password nevalid."
            return
        }
        document.cookie = `authToken=${response.data.data.login.token}`
        window.location.reload();
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}
