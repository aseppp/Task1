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
        image: image,
        author: "Asep Saepudin",
        postAt: new Date()
    }

    blogs.push(objectBlog)


    //Berfungsi untuk memanggil function dibawah
    renderBlog()
}


function renderBlog() {
    let containerBlog = document.getElementById('containerBlog');

    containerBlog.innerHTML = firstPost()


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
                ${getTime(blogs[i].postAt)} | ${blogs[i].author}
            </div>

            <div class="detailDesc">
                <p class="desc">${blogs[i].content}</p>
            </div>
            <div class="distanceTime" style="text-align: end; color: #303030;">
            <span> ${getDistanceTime(blogs[i].postAt)}</span>
        </div>
        </div>
    </div>`
    }
}

function firstPost() {
    return `<div class="blogItem">
    <div class="blogImage">
    <img src="./assets/image/Abstract-Nord.png" alt="image">
    </div>

    <div class="blogContent">
        <div class="buttonGroup">
            <button id="btn-edit">Edit</button>
            <button id="btn-post">Post</button>
        </div>

        <a href="#" class="detailContent" target="_blank" style="color: #43ff88;">Pasar Coding di
            Indonesia Dinilai Masih Menjanjikan</a>

        <div class="detailDateTime" style="color: grey;">
            12 Jul 2021 22:30 WIB | Asep Saepudin
        </div>

        <div class="detailDesc">
            <p class="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quae
                explicabo officiis modi impedit quaerat omnis consectetur voluptate porro a? Quasi
                corporis quo suscipit repudiandae eaque, officiis eius, quas doloribus mollitia
                provident laudantium fugit dolores vel assumenda cumque ea facere libero! Voluptatem
                aliquid accusantium reprehenderit tempore, voluptates, error tempora quod excepturi
                adipisci explicabo quidem voluptate magnam, ex iure nobis incidunt reiciendis sequi
                laboriosam sunt quas. Molestiae dolor rerum a quasi.</p>
        </div>
        <div class="distanceTime" style="text-align: end; color: #303030;">
            <span>1 day ago</span>
        </div>
    </div>
</div>`
}


let month = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']

function getTime(time) {


    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    let fullTime = `${date} ${month[monthIndex] } ${year} ${hours}:${minutes} WIB`

    return fullTime;
}



function getDistanceTime(time) {


    let timeNow = new Date();
    let timePost = time;


    let distance = timeNow - timePost;

    let milisecond = 1000
    let secondInHours = 3600
    let hoursInDay = 23
    let second = 60
    let minutes = 60


    let distanceDay = Math.floor(distance / (milisecond *secondInHours *hoursInDay))
    let distanceHours = Math.floor(distance / (milisecond *second *minutes))
    let distanceMinutes = Math.floor(distance / (milisecond * second))
    let distanceSecond = Math.floor(distance / milisecond)


    distanceDay = Math.floor(distanceDay);

    if(distanceDay >= 1){
        console.log(`${distanceDay} day ago`);
      } else {
        if (distanceHours >= 1){
        return(`${distanceHours} hours ago`);
        } else {
          if (distanceMinutes >= 1) {
            return(`${distanceMinutes} minutes ago`);
          } else {
              return(`${distanceSecond} second ago`);
          }
        }
      }
}
