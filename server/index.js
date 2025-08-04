import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

// ══ ES module __dirname polyfill ══
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// ── 1. Serve static images from server/images ──
const imagesDir = path.join(__dirname, 'images')
app.use('/images', express.static(imagesDir))

// ── 2. On startup, read all .png files and build your data list ──
const allImages = await fs.readdir(imagesDir)
const foodItems = allImages
  .filter((f) => /\.png$/i.test(f))
  .map((file, idx) => ({
    // Derive a name from the filename (e.g. "food_1")
    name: path.parse(file).name.replace(/_/g, ' '), 
    // TODO: swap in real categories/prices or keep defaults here
    category: 'Uncategorized',
    price: 5.0 + idx * 0.5,  
    image: file,
  }))

// ── 3. API endpoint returns all your images as list items ──
app.get('/api/food/list', (req, res) => {
  res.json({ success: true, data: foodItems })
})

app.listen(4000, () => {
  console.log('API server listening on http://localhost:4000')
})
