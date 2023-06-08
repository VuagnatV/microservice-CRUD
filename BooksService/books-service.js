const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

let books = [
    { id: 1, tittle: "livre 1", authorId: 1, categoryId: 1 },
    { id: 2, tittle: "livre 2", authorId: 2, categoryId: 2 },
    { id: 3, tittle: "livre 3", authorId: 3, categoryId: 3 },
    { id: 4, tittle: "livre 4", authorId: 4, categoryId: 4 },
]

app.get('/books', async (req, res) => {
    res.json(books)
})

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(book => book.id === id)
    if (book) {
        try {

            //const categoryResponse = await axios.get(`http://192.168.1.10:5000/categories/${book.categoryId}`)
            //const authorResponse = await axios.get(`http://192.168.1.10:6000/authors/${book.authorId}`)
            const categoryResponse = await axios.get(`http://categories:5000/categories/${book.categoryId}`)
            const authorResponse = await axios.get(`http://authors:6000/authors/${book.authorId}`)
            const author = authorResponse.data
            const category = categoryResponse.data

            bookDetails = {
                id: book.id,
                tittle: book.tittle,
                author: author.name,
                category: category.name
            }

            res.json(bookDetails)

        } catch (error) {
            res.status(500).json({ error })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex(book => book.id === id)
    if (index === -1) {
        res.status(404).json({ error: "not found" })
    }

    books.splice(index, 1)
    res.json(books)

})

app.put('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex(book => book.id === id)
    const book = books.find(book => book.id === id)
    if (book) {
        try {

            const newBook = {
                id: req.body.id,
                tittle: req.body.tittle,
                authorId: req.body.authorId,
                categoryId: req.body.categoryId

            }

            books[index] = newBook

            res.json(books)

        } catch (error) {
            res.status(500).json({ error })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.post('/books', (req, res) => {
    console.log(req.body)
    const newBook = {
        id: req.body.id,
        tittle: req.body.tittle,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId

    }
    books.push(newBook)
    res.json(books)
})

app.listen(3000, () => {
    console.log(`Server running at 3000`)

})