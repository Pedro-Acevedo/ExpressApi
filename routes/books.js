const express = require('express')
const router = express.Router()
const Books = require('../model/books')

// Get all
router.get('/', async (req, res) => {
    try{
        const books = await Books.find()
        res.json(books)
    } catch (err) {
        res.status(500).json( { message: err.message })
    }
})
// Get one
router.get('/:id', getBookById, (req, res) =>{
    res.json(res.book)
})
// Create one
router.post('/', async (req, res) =>{
        const book = new Books({
            name: req.body.name,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            rating: req.body.rating
        })
     try{
        const newBook = await book.save()
        res.status(201).json(newBook)
    } catch( err ){
        res.status(400).json({ message: err.message})
    }
})
// Update one
router.patch('/:id', getBookById, async(req, res) =>{
    if(req.body.name != null){
        res.book.name = req.body.name
    }
    if(req.body.author != null){
        res.book.author = req.body.author
    }
    if(req.body.rating != null){
        res.book.rating = req.body.rating
    }
    if(req.body.releaseDate != null){
        res.book.releaseDate = req.body.releaseDate
    }
    try{
        const updatedBook = await res.book.save()
        res.json(updatedBook)
    } catch ( err ){
        res.status(500).json({ message: err.message})
    }
})
// Delete one
router.delete('/:id', getBookById, async (req, res) =>{
    try{
        await res.book.remove()
        res.json({ message: 'Book deleted'})
    } catch ( err ) {
        res.status(500).json({ message: err.message})
    }
})

// Middleware to find a book by its id
async function getBookById(req, res, next) {
    let book 
    try{
         book = await Books.findById(req.params.id)
        if ( book == null ){
            return res.status(404).json({ message: 'Could not find book'})
        }
    } catch ( err ){
        res.status(500).json({ message: err.message })
    }   
    res.book = book
    next()
}

module.exports = router