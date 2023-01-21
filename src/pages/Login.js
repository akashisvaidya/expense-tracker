import React, { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Layout from "../components/layout/Layout"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../helpers/axiosHelper"
import { toast } from "react-toastify"
const initialState = {
  email: "",
  password: "",
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { status, message, user } = await loginUser(formData)

    if (status === "success") {
      toast[status](message)
      sessionStorage.setItem("user", JSON.stringify(user))
      navigate("/books")
    } else {
      toast[status](message)
    }
    setFormData(initialState)
  }
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col className="md-6 bg-warning p-5">
            <div className="bg-light p-4 rounded">
              <Form onSubmit={handleOnSubmit}>
                <h1 className="text-center">Login</h1>
                <hr />

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="sam@email.com"
                    onChange={handleOnChange}
                    value={formData.email}
                  />
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    placeholder="********"
                    onChange={handleOnChange}
                    value={formData.password}
                  />
                </Form.Group>

                <div>
                  <Button variant="warning" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                Don't have an account? <Link to="/register">Register Now!</Link>
              </div>
            </div>
          </Col>
          <Col className="md-6 text-center info d-flex align-items-center d-none d-md-flex">
            <div>
              <h1>Welcome to Library Management System</h1>
              <hr />
              <p>Login to view and start borrowing books</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Login
