const title = document.getElementById("title")
const desc = document.getElementById("desc")
const price = document.getElementById("price")

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

    axios.post('http://localhost:5000/graphql', { query }).then(response => {
        window.location.href = "./home.html"
    }).catch(error => console.error('Eroare:', error.response ? error.response.data : error))
}
