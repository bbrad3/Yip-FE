const express = require('express')
const app = express()

const routesReport = require('rowdy-logger').begin(app)
const path = require('path')
const replaceInFile = require('replace-in-file')
const morgan = require('morgan')

// MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))
// app.use((req, res, next) => { // HOPE THIS WORKS
//     if(localStorage.getItem('userId')){
//         req.headers.authorization = localStorage.getItem('userId')
//         console.log('testing', req.headers);
//         next()
//     }else{
//         next()
//     }
// })

// ROUTES
app.get('/', (req, res) => {
    const filepath = path.join(__dirname, './index.html')
    res.sendFile(filepath)
})
    
app.get('/main.js', (req, res) => {
    const filepath = path.join(__dirname, './main.js')
    res.sendFile(filepath)
})
    
app.get('/style.css', (req, res) => {
    const filepath = path.join(__dirname, './style.css')
    res.type('css').sendFile(filepath)
})

// SERVER
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    routesReport.print()

    console.log(`Server listening on port ${PORT}`)
})