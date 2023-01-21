import React, { useState } from "react"
import { Button, Col, Form, Spinner } from "react-bootstrap"
import DashboardLayout from "../components/layout/DashboardLayout"
import book from "../assets/books.jpg"
import { addBook } from "../helpers/axiosHelper"
import { toast } from "react-toastify"

const AddBook = () => {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { status, message } = await addBook(formData)

    if (status) {
      setIsLoading(false)

      setFormData({ title: "", author: "", isbn: "", year: "", thumbnail: "" })
      return toast[status](message)
    }
    return
  }

  return (
    <DashboardLayout>
      <div className="add">
        <div className="add-top">
          <h1>Add New Book</h1>
        </div>
        <div className="add-bottom">
          <Col md={7} className="d-none d-sm-block">
            <img src={book} alt="book-img" style={{ width: "100%" }} />
          </Col>
          <Col md={5} sm={12} xs={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Book Title"
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  placeholder="Author"
                  required
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  placeholder="ISBN"
                  required
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Year Published</Form.Label>
                <Form.Control
                  placeholder="Year"
                  required
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                  placeholder="Image"
                  required
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="warning"
                type="submit"
                className="mt-4 d-flex align-items-center gap-3"
              >
                ADD BOOK{" "}
                <span>
                  {isLoading && <Spinner animation="border" variant="dark" />}
                </span>
              </Button>
            </Form>
          </Col>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddBook
