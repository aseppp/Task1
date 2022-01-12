// Require Express
const express = require("express");
// Express as function
const app = express();

// Port localhost view engine and view engine use handlebar
app.listen(5000);
app.set('view engine', 'hbs');

let isLogin = false;

app.use(express.urlencoded({extended: false}))

// Path directory view engine
app.use(express.static("public"));
// app.use(express.static("css"));
// app.use(express.static('image'));

// Path to acces homepage
app.get('/', (request,response) => {
    response.render('index')
})

// Path to acces contac
app.get('/contac', (request,response) => {
    response.render('contac')
})

// Path to access blog
app.get('/blog', (request,response) => {
    response.render('blog', {isLogin : isLogin})
})

// Path to access add post
app.get('/add-post', (request,response) => {
    response.render('add-post')
})

// Path to access blog detail
// app.get('/blog-detail', (request,response) => {
//     response.render('blog-detail')
// })


app.get('/blog-detail', (request,response) => {
    let blogId = request.params.id
    response.render('blog-detail', {blog :{
        id : blogId,
        title : 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
        content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quaee xplicabo officiis modi impedit quaerat omnis consectetur voluptate porro a? Quasi corporis quo suscipit repudiandae eaque, officiis eius, quas doloribus mollitia provident laudantium fugit dolores vel assumenda cumque ea facere libero! Voluptatem aliquid accusantium reprehenderit tempore, voluptates, error tempora quod excepturi adipisci explicabo quidem voluptate magnam, ex iure nobis incidunt reiciendis sequi laboriosam sunt quas. Molestiae dolor rerum a quasi. ',
        author: 'Asep Saepudin',
        postAt: '12 Jan 2022 11:30 WIB'
    }})
})
