let blogs = [];

function submitPost(event) {
    // Untuk mencegah browser melakukan reload saat melakukan submit
    event.preventDefault()

    let title = document.getElementById('input-title');
    let content = document.getElementById('input-content');
    let image = document.getElementById('input-image');

    //mendeklarasikan variable untuk mengambil value dan files
    title = title.value;
    content = content.value;
    image = image.files;

    // Membuat URL pada gambar supaya bisa di akses dan tidak terdapat fake path
    image = URL.createObjectURL(image[0])


    let objectBlog = {
        title: title,
        content: content,
        image: image
    }

    blogs.push(objectBlog)

    console.log(blogs);


    //Berfungsi untuk memanggil function dibawah
    renderBlog()
}


function renderBlog() {
    let containerBlog = document.getElementById('containerBlog');

    containerBlog.innerHTML = ''


    //Looping untuk blog post list
    for (let i = 0; i < blogs.length; i++) {
        containerBlog.innerHTML += `<div class="blogItem">
        <div class="blogImage">
            <img src="${blogs[i].image}" alt="image">
        </div>

        <div class="blogContent">
            <div class="buttonGroup">
                <button id="btn-edit">Edit</button>
                <button id="btn-post">Post</button>
            </div>

            <a href="#" class="detailContent" target="_blank" style="color: #43ff88;">${blogs[i].title}</a>

            <div class="detailDateTime" style="color: grey;">
                12 Jul 2021 22:30 WIB | Asep Saepudin
            </div>

            <div class="detailDesc">
                <p class="desc">${blogs[i].content}</p>
            </div>
        </div>
    </div>`
    }
}
