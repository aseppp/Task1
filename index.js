// Import Express
const express = require("express");
const app = express()

// Port Listen localhost
app.listen(8080)

// Set View Engine
app.set('view engine', 'hbs')

// Static File
app.use('/public', express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: false}))

// Import db.js
const database = require('./connection/database')

// Import Package
const encrypt = require("bcrypt")
const session = require('express-session')
const flash = require('express-flash')

// Use flash for alert
app.use(flash())

app.use(
    session({
        cookie: {
            maxAge: 2 * 60 * 60 * 1000, // 2 jam
            secure: false,
            httpOnly: true
        },
        store: new session.MemoryStore(),
        saveUninitialized: true,
        resave: false,
        secret: 'secretValue'
    })
)

// Perumpamaan login
// let isLogin = true;

// Routing Home/Index
app.get('/', (request, response) => {

    database.connect((error, client) => {
        client.query(`SELECT * from tb_experience`, (error, result) => {
            let data = result.rows
            let tbExp = data.map((list) => {
                return{
                    experience: list.experience,
                    year: list.year
                }
            })
            response.render('index', {experience: tbExp})
        })


    })

})

// Routing Contac
app.get('/contac', (request, response) => {
    response.render('contac')
})

// Routing Register
app.get('/register', (request, response) => {
    response.render('register')
})

// Post User data to PG
app.post('/register',(request, response) => {

    const {inputUsername, inputEmail, inputPassword} = request.body

    const encryptPassword = encrypt.hashSync(inputPassword, 10)

    database.connect((err, client) => {
        if (err) throw err
        let query = `INSERT INTO tb_user(name, email, password) VALUES ('${inputUsername}','${inputEmail}','${encryptPassword}')`
        client.query(query, (err, result) => {
            if (err) throw err

            response.redirect('/login')
        });
    })
})

// Routing Login
app.get('/login', (request, response) => {
    response.render('login')
})

// Routing post validasi user
app.post('/login', (request, response) => {
    const {inputEmail, inputPassword} = request.body

    let query = `SELECT * FROM tb_user WHERE email = '${inputEmail}'`


    database.connect(function (err, client, done) {
        if (err) throw err
        client.query(query, function(err, result) {
            if (err) throw err
            if(result.rows.length == 0) {
                return response.redirect('/login')
            }

            const isMatch = encrypt.compareSync(inputPassword,result.rows[0].password)

            // console.log(isMatch);

            if(isMatch){
                request.session.isLogin = true
                request.session.user = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    email: result.rows[0].email
                }


                request.flash('success', 'Login Success!')
                response.redirect('/blog')

            } else {
                request.flash('danger', 'Password tidak cocok!')
                response.redirect('/login')
            }
        })
    })
})

app.get('/logout', function(request, response){
    request.session.destroy()

    response.redirect('/blog')
})

// Routing Blog
app.get('/blog', (request, response) => {
    database.connect((err, client, done) => {
        client.query('SELECT * from tb_blog', (err, result) => {
            if (err) throw err

            let dataBlog = result.rows
            let newData = dataBlog.map((data) => {
                return {
                    ...data,
                    isLogin: request.session.isLogin,
                    author: data.authorId,
                    postAt: getTime(data.postAt),
                    distance: getDistanceTime(data.postAt)
                }
            })
            // console.log(newData);
            response.render('blog', {isLogin : request.session.isLogin, blogs: newData, user: request.session.user})
        })
    })
})

// Path to acces blog detail
app.get('/blog-detail/:id', (request,response) => {
    let id = request.params.id

    database.connect((err, client, done) => {
        client.query(`SELECT * from tb_blog WHERE id = ${id}`, (err, result) => {
            if (err) throw err

            let dataBlog = result.rows[0]

            // console.log(dataBlog);

            response.render('blog-detail', {id: id, blog: dataBlog})
        })
    })
})


// Routing Add Post Blog
app.get('/add-post', (request,response) => {
    response.render('add-post')
})

// Routing Post Add Post
app.post('/blog', (request, response) => {
    let data = request.body

    database.connect((err, client) => {
        if (err) throw err
        let query = `INSERT INTO tb_blog(title, content, image) VALUES ('${data.inputTitle}','${data.inputContent}','image.png')`
        client.query(query, (err, result) => {
            if (err) throw err

            response.redirect('/blog')
        });
    })

})

// Routing Delete Blog Post
app.get('/delete-blog/:id', function(request, response) {
    let id = request.params.id
    let query = `DELETE FROM tb_blog WHERE id = ${id}`

    database.connect(function (err, client, done) {
        if (err) throw err
        client.query(query,function (err, result) {

            response.redirect('/blog')
        })
    })
})

// Routing Edit Post
app.get('/edit-post/:id', (request, response) => {
    let id = request.params.id
    let query = `SELECT * FROM tb_blog WHERE id= ${id}`

    database.connect(function(err, client, done) {
        if (err) throw err
        client.query(query, function (err, result) {
            if (err) throw err
            let dataView = result.rows[0];
            response.render('edit-post', {blog: dataView, id: id})
        })
    })
    // response.render('edit-post')
})

// Routing Post Edit Post
app.post('/edit-post/:id', (request, response) => {
    let id = request.params.id

    let data = request.body
    let query = `UPDATE tb_blog SET title='${data.updateTitle}', content='${data.updateContent}', image='image.png' WHERE id =${id}`

    database.connect((error, client) => {
        client.query(query, (error, result) => {
            response.redirect('/blog')
        })
    })
})



// Function Get Time
function getTime(time) {
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    let fullTime = `${date} ${month[monthIndex] } ${year} ${hours}:${minutes} WIB`

    return fullTime;
}

// Function Get Distance
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
        return(`${distanceDay} day ago`)
        // console.log(`${distanceDay} day ago`);
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
