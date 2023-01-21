import React, { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import BooksList from "../components/BooksList"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getBooks } from "../helpers/axiosHelper"

const Books = () => {
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"))
    setUser(u)
  }, [])

  const fetchBooks = async () => {
    const response = await getBooks()
    setBooks(response.books)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <DashboardLayout>
      <Container>
        <Row className="p-5">
          <BooksList books={books} fetchBooks={fetchBooks} user={user} />
        </Row>
      </Container>
    </DashboardLayout>
  )
}

export default Books
