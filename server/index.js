import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

// ══ Polyfill __dirname in ES modules ══
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// ── Serve static images from server/images ──
const imagesDir = path.join(__dirname, 'images')
app.use('/images', express.static(imagesDir))

// ── Build your food list from all .png files ──
async function loadFoodList() {
  const files = await fs.readdir(imagesDir)
  return files
    .filter(f => /\.png$/i.test(f))
    .map((file, i) => ({
      // You can tweak name/category/price as you wish!
      name: file.replace(/_/g, ' ').replace(/\.png$/i, ''),
      category: 'Uncategorized',
      price: 5 + i * 0.5,
      image: file,
    }))
}

app.get('/api/food/list', async (req, res) => {
  try {
    const data = await loadFoodList()
    res.json({ success: true, data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Could not load food list' })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})