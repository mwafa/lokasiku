const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const Fuzzy = require('fuzzy-search')

app.get('/prov', (req, res) => {
  const { name } = req.query
  const r = fs.readFileSync(path.join(__dirname, './data/provinsi.json'))
  const prov = new Fuzzy(JSON.parse(r), ['nama'], {
    caseSensitive: false
  })
  const results = prov.search(name)
  res.json({
    results
  })
})

app.get('/:dataset(reg|dis)/:id(\\d+)', async (req, res) => {
  const { id, dataset } = req.params
  const { name } = req.query
  try {
    const r = fs.readFileSync(
      path.join(__dirname, `./data/${dataset}/${dataset}_${id}.json`)
    )
    const reg = new Fuzzy(JSON.parse(r), ['nama'], {
      caseSensitive: false
    })
    const results = reg.search(name)
    res.json({
      results
    })
  } catch (e) {
    res.status(404).json({
      error: true,
      message: 'Not Found!'
    })
  }
})

const port = process.env.PORT || 90
app.listen(port, () => {
  console.log(`> Server running on http://localhost:${port}`)
})
