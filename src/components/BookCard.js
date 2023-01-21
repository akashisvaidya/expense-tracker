import React from "react"
import { Button, Card } from "react-bootstrap"
import { borrowBook, deleteBook } from "../helpers/axiosHelper"
import { toast } from "react-toastify"

const BookCard = ({ book, user, fetchBooks }) => {
  const handleBorrow = async (bookId) => {
    if (bookId) {
      const { status, message } = await borrowBook(bookId)

      status === "success" ? toast.success(message) : toast.warning(message)
    }
  }

  const handleDelete = async (bookId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this book from the system?"
      )
    ) {
      if (bookId) {
        const { status, message } = await deleteBook(bookId)

        toast[status](message) && fetchBooks()
      }
    }
  }
  return (
    <Card style={{ width: "18rem", border: "none" }}>
      <Card.Img
        src={book.thumbnail}
        style={{ width: "50%", margin: "1rem auto" }}
      />
      <Card.Body className="text-center">
        <Card.Title>{book.title}</Card.Title>
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="warning" onClick={() => handleBorrow(book._id)}>
            Borrow
          </Button>
          {user?.role === "teacher" && (
            <Button variant="danger" onClick={() => handleDelete(book._id)}>
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookCard
