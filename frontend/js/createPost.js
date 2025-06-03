const title = document.getElementById("title")
const desc = document.getElementById("desc")
const price = document.getElementById("price")
const postError = document.getElementById("postError")

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

async function createPost() {
    const formData = new FormData();

    const files = document.getElementById("images").files;
    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }
    if(title.value == "") {
        postError.innerText = "Titlu lipseste."
        return
    }
    if(desc.value == "") {
        postError.innerText = "Descrierea lipseste."
        return
    }
    if(price.value == "") {
        postError.innerText = "Pretul lipseste."
        return
    }
    if(files.length <= 0) {
        postError.innerText = "Trebuie sa adaugi cel putin o poză."
        return
    }

    const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    const img = response.data.map(img => `{ path: "${img.path}" }`).join(", ")

    const query = `
mutation {
    createPost(
        title: "${title.value}",
        description: "${desc.value}",
        price: ${price.value},
        images: [${img}]
    ) {
        id, title, price, images { path }
    }
}`

    axios.post('http://localhost:5000/graphql', { query }).then(() => {
        window.location.href = "./home.html"
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}
