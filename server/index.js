import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// Polyfill __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Enable CORS and JSON parsing
app.use(cors())
app.use(express.json())

// Serve images from server/images/
app.use('/images', express.static(path.join(__dirname, 'images')))

// Example API endpoint for food list
app.get('/api/food/list', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Taco', category: 'Mexican', price: 3.5, image: 'taco.jpg' },
      { name: 'Burger', category: 'American', price: 5.0, image: 'burger.jpg' },
      // …add more items or load from a JSON file/db
    ]
  })
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
