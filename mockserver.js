var express = require('express')
var jwt = require('jsonwebtoken')
var cors = require('cors')

// init app
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// init db
var sqlite3 = require('sqlite3').verbose()
var { open } = require('sqlite')
var db
(async function () {
  db = await open({
    filename: ":memory:",
    driver: sqlite3.Database
  })
  db.run("CREATE TABLE if not exists users(username TEXT primary key, email TEXT unqiue, password TEXT)")
})()

// Define JWT secret
const JWT_SECRET = "SECRETPASSWORD"

// Parse token middleware
const verifyToken = async (req, res, next) => {
  var token = req.headers.authorization
  if (!token || (token && !token.startsWith('Bearer '))) {
    return res.status(401).send({
      status: 'failure', 
      message: 'Bearer token required'
    })
  }
  token = token.split(' ')[1]

  var user
  try {
    user = jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return res.status(401).send({
      status: 'failure',
      message: e.message
    })
  }

  if (!user || (user && !user.username)) {
    return res.status(401).send({
      status: 'failure',
      message: `invalid token payload: ${user}`
    })

  }

  var username = user.username
  user = await db.get('SELECT * FROM users WHERE username = ?', [username])
  if (!user) {
    return res.status(404).send({
      status: 'failure',
      message: `no user named ${username}`
    })
  }
  
  req.user = user
  next()
}

// Register
app.post("/register", async (req, res) => {
  const {username, password, email} = req.body
  if (!username || !password || !email) {
    return res.status(400).json({
      status: 'failure',
      message: 'no username or password or email'
    })
  }
  
  try {
    let result = await db.run("INSERT INTO users(email, username, password) VALUES(?, ?, ?)", [email, username, password])

    if (result.changes > 0) {
      return res.json({
        status: 'success',
        data: {
          token: jwt.sign({ username }, JWT_SECRET)
        }
      })
    }

    return res.status(401).json({
      status: 'failure',
      message: "register failed"
    })
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: e.message
    })
  }
})

// Login
app.post("/login", async (req, res) => {
  const { email, username, password } = req.body
  if ((!email && !username) || !password) {
    return res.status(400).json({
      status: 'failure',
      message: 'no email|username or password'
    })
  }
  
  try {
    let user = await db.get(
      `SELECT * FROM users WHERE 1=1 
        ${email ? ' and email = :email ' : ''} 
        ${username ? ' and username = :username ' : ''}
        and password = :password`, 
    {':email': email, ':username': username, ':password': password})
    
    if (user) {
      return res.json({
        status: 'success',
        data: {
          token: jwt.sign({ username: user.username }, JWT_SECRET),
          refreshToken: null
        }
      })
    }

    return res.status(401).json({
      status: 'failure',
      message: "invalid username or password"
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: 'error',
      message: e.message
    })
  }
})

// Me
app.get("/me", verifyToken, (req, res) => {
  return res.json({
    status: 'success',
    data: req.user
  })
})



app.listen(3001)
console.log('server started on 3001.')