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

app.get('/:id(\\d{4,10})', async (req, res) => {
  const { id } = req.params
  const data = {
    prov: id.substr(0, 2),
    reg: id.substr(0, 4),
    dis: id
  }

  try {
    const prov = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/provinsi.json'))
    )
    const reg = JSON.parse(
      fs.readFileSync(path.join(__dirname, `./data/reg/reg_${data.prov}.json`))
    )
    const dis = JSON.parse(
      fs.readFileSync(path.join(__dirname, `./data/dis/dis_${data.reg}.json`))
    )
    const result = {}
    result.prov = prov.find((i) => i.id == data.prov)
    result.reg = reg.find((i) => i.id == data.reg)
    result.dis = dis.find((i) => i.id == data.dis)

    res.json({ result })
  } catch (e) {
    res.status(404).json({
      error: true,
      message: 'Somethings error!'
    })
  }
})

const port = process.env.PORT || 90
app.listen(port, () => {
  console.log(`> Server running on http://localhost:${port}`)
})
