const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    instruction: setup the book schema according to the following requirements:
    - title: (String, required)
    - author: (ObjectId, ref: 'Author', required)
    - publishedDate: (Date)
    - genre: (String)
    - summary: (String)
*/

const Author = require("./author");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },

  publishedDate: {
    type: Date,
  },

  genre: {
    type: String,
  },

  summary: {
    type: String,
  },
});

// when the task is updated or created
bookSchema.post("save", async function () {
  // retrieve the current id that is updated
  const bookID = this._id;
  const authorID = this.author;
  // find the selected category
  const selectedAuthor = await Author.findById(authorID);
  // add the task into the selected category
  selectedAuthor.book.push(bookID);
  // save the category
  await selectedAuthor.save();
});

const Book = model("Book", bookSchema);
module.exports = Book;
