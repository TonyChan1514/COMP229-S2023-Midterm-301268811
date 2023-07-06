/*  COMP229 - MidTerm (Favourite Book List)
    Author: Chi Shing Chan
    Student ID # 301268811
    Date: 05 Jul, 2023
    File: routes/books.js
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Render detail page with empty book information
    res.render('books/details', {
      title: 'Add a Book',
      books: '',
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Save the inputted book details to MongoDB
    let newBook = new book({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    });
  
    newBook.save((err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/books');
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Retrieve the existing books information
    let bookID = req.params.id;

    book.findById(bookID, (err, existingBook) => {
      if (err) {
        console.error(err);
      } else {
        res.render('books/details', {
          title: 'Edit an existing Book',
          books: existingBook
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Update the book information
    let bookID = req.params.id;

    let updatedBook = {
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    };
  
    book.findByIdAndUpdate(bookID, updatedBook, (err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/books');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Remove the identified book record from MongoDB
    let bookID = req.params.id;

    book.findByIdAndRemove(bookID, (err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/books');
      }
    });
});


module.exports = router;
