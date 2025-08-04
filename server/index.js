import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

// polyfill __dirname…
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

const imagesDir = path.join(__dirname, 'images')
app.use('/images', express.static(imagesDir))

async function loadFoodList() {
  const files = await fs.readdir(imagesDir)
  return files
    .filter(f => /\.png$/i.test(f))
    .map((file, i) => ({
      id:       file,
      name:     file.replace(/_/g,' ').replace(/\.png$/i,''),
      category: 'Uncategorized',
      price:    5 + i * 0.5,
      image:    file,
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

// ← Add this:
app.post('/api/food/remove', async (req, res) => {
  const { id } = req.body
  try {
    await fs.unlink(path.join(imagesDir, id))
    res.json({ success: true })
  } catch (err) {
    console.error('Remove error:', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
