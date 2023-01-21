import React from "react"
import BookCard from "./BookCard"

const BooksList = ({ books, fetchBooks, user }) => {
  return (
    <div className="books-list">
      {books?.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          user={user}
          fetchBooks={fetchBooks}
        />
      ))}
    </div>
  )
}

export default BooksList
