const params = new URLSearchParams(window.location.search);
const authMethod = params.get("auth"); // Ex: ?cheie=valoare
const user_interface = document.getElementById("user-interface")

const loginHTML = () => {
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
    <div class="register">Register</div>
</div>
`
}

const registerHTML = () => {
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
    <div class="login">Login</div>
</div>
`
}

user_interface.innerHTML = authMethod == "register" ? registerHTML() : loginHTML()

const username = document.getElementById("username")
const password = document.getElementById("password")
const verifyPass = document.getElementById("verifyPass")
const authError = document.getElementById("authError") 

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
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}
