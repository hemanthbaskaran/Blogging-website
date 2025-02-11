const firebaseConfig = {
    apiKey: "AIzaSyAFIL8N-d5POTlzxZwg4C5xSJmU9KJujPY",
    authDomain: "firestore-app-13292.firebaseapp.com",
    projectId: "firestore-app-13292",
    storageBucket: "firestore-app-13292.firebasestorage.app",
    messagingSenderId: "265444500199",
    appId: "1:265444500199:web:59af772fc030c4ba003842"
    };
  
    firebase.initializeApp(firebaseConfig);
  
    let db = firebase.firestore();
    const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}