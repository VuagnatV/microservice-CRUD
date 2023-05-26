const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())

let authors = [
    { id: 1, name: "auteur 1" },
    { id: 2, name: "auteur 2" },
    { id: 3, name: "auteur 3" },
    { id: 4, name: "auteur 4" },
]

app.get('/authors', async (req, res) => {
    res.json(authors)
})

app.get('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const author = authors.find(author => author.id === id)

    if (author) {
        res.json(author)
    } else {
        res.status(404).json({ error: "not found" })
    }
})

app.put('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = authors.findIndex(author => author.id === id)
    const author = authors.find(author => author.id === id)
    if (author) {
        try {

            const newAuthor = {
                id: req.body.id,
                name: req.body.name,

            }

            authors[index] = newAuthor

            res.json(authors)

        } catch (error) {
            res.status(500).json({ error: "dsfsd" })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.post('/authors', (req, res) => {
    console.log(req.body)
    const newAuthor = {
        id: req.body.id,
        name: req.body.name,
    }
    authors.push(newAuthor)
    res.json(authors)
})

app.listen(4000, () => {
    console.log(`Server running at 4000`)
})