const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())

let categories = [
    { id: 1, name: "category 1" },
    { id: 2, name: "category 2" },
    { id: 3, name: "category 3" },
    { id: 4, name: "category 4" },
]

app.get('/categories', async (req, res) => {
    res.json(categories)
})

app.get('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const category = categories.find(category => category.id === id)

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({ error: "not found" })
    }
})

app.put('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = categories.findIndex(category => category.id === id)
    const category = categories.find(category => category.id === id)
    if (category) {
        try {

            const newCategory = {
                id: req.body.id,
                name: req.body.name,

            }

            categories[index] = newCategory

            res.json(categories)

        } catch (error) {
            res.status(500).json({ error })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.post('/categories', (req, res) => {
    console.log(req.body)
    const newCategory = {
        id: req.body.id,
        name: req.body.name,
    }
    categories.push(newCategory)
    res.json(categories)
})

app.listen(5000, () => {
    console.log(`Server running at 5000`)
})