const images = document.getElementById("images")
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const likes = document.getElementById("likes")
const byUser = document.getElementById("user")
const cart_button = document.getElementById("cart-button")
const fav_button = document.getElementById("fav-button")

const params = new URLSearchParams(window.location.search);
const postId = params.get("post"); // Ex: ?cheie=valoare

async function displayPost() {
    let response = await axios.post('http://localhost:5000/graphql', {
        query: `
        query {
            getPost(id: ${postId}) {
                user { username, id }, likes { userId }, cart { userId }, description, price, title, images { path }
            }
        }`
    })
    let user = await axios.get(`http://localhost:5000/graphql?query=query { user { id } }`)
    let post = response.data.data.getPost
    if(post == null) return
    for(let i=0; i<post.images.length; i++) {
        images.innerHTML += `<img src="http://localhost:5000/uploads/${post.images[i].path}" alt="${post.title}">`
    }
    title.innerText = post.title
    description.innerText = post.description
    price.innerText = "$" + post.price
    likes.innerText = "Aprecieri: " + post.likes.length
    byUser.innerHTML = `Creat de: <span>${post.user.username}</span>`
    if(post.likes.find(f => { return f.userId == user.data.data.user.id }) == undefined) {
        fav_button.onclick = (event) => { addFav(event, postId, "null") }
    } else {
        fav_button.innerText = "Scoate din preferat"
        fav_button.onclick = (event) => { removeFav(event, postId, "null") }
    }
    if(post.cart.find(f => { return f.userId == user.data.data.user.id }) == undefined) {
        cart_button.onclick = (event) => { addCart(event, postId, "null") }
    } else {
        cart_button.onclick = (event) => { removeCart(event, postId, "null") }
        cart_button.innerText = "Scoate din coș"
    }
}
displayPost()

let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.slides img');
    slideIndex += step;

    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    const newTransformValue = -slideIndex * 100 + '%';
    document.querySelector('.slides').style.transform = `translateX(${newTransformValue})`;
}
