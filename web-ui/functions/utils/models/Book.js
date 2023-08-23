const mongoose = require('mongoose');

class Book {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }
}

module.exports = mongoose.model("Book", new mongoose.Schema({
  title: String,
  year: Number
}));

module.exports.Book = Book;
