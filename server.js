const express = require('express')
const app = express()

const routesReport = require('rowdy-logger').begin(app)
const path = require('path')
const replaceInFile = require('replace-in-file')
const morgan = require('morgan')
const { async } = require('regenerator-runtime')


// MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.get('/', (req, res) => {
    const filepath = path.join(__dirname, './index.html')
    res.sendFile(filepath)
})
    
app.get('/main.js', async (req, res) => {
    const filepath = path.join(__dirname, './main.js')

    if (process.env.NODE_ENV === 'production') {
        console.log('replacing...')
        await replaceInFile({
        files: filepath,
        from: 'http://localhost:3001',
        to: 'https://yip-back-end.herokuapp.com'
        })
    }
    
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