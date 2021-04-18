const express = require('express')
const app = express()

const routesReport = require('rowdy-logger').begin(app)
const path = require('path')
const replaceInFile = require('replace-in-file')
const morgan = require('morgan')

// MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))
app.use(async (req, res, next) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        await replaceInFile({
          files: filepath,
          from: 'http://localhost:3001',
          to: 'https://yip-back-end.herokuapp.com'
        })
      }
      next()
    } catch (error) {
      console.error('Replace-in-file error:', error)
    }
  })

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