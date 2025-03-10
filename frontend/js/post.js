axios.post('http://localhost:5000/graphql', {
    query: `
        query {
            getPost(id: 1) {
                user { username }, likes { postId }, description, price, title, images { path }
            }
        }`
}).then(response => {
    if(response.data.data.getPost == null) return
}).catch(error => console.error('Eroare:', error.response ? error.response.data : error))

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
