import { Button, Col, Container, Form, Row } from "react-bootstrap"
import InputField from "../components/InputField"
import Layout from "../components/layout/Layout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { registerNewUser } from "../helpers/axiosHelper"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const { confirmPassword, ...rest } = formData

    if (confirmPassword !== rest.password) {
      return toast.error("Password does not match")
    }

    const { status, message } = await registerNewUser(rest)
    toast[status](message)

    status === "success" && navigate("/")
  }

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "First Name",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Last Name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "sam@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ]
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col className="md-6 text-center d-flex align-items-center info d-none d-md-flex">
            <div>
              <h1>Welcome to Library Management System</h1>
              <hr />
              <p>
                Register and access our library management system. You can view
                and borrow books.
              </p>
            </div>
          </Col>
          <Col className="md-6 bg-warning p-5">
            <div className="bg-light p-4 rounded">
              <Form onSubmit={handleOnSubmit}>
                <h2>Register Now!</h2>
                <hr />

                {inputs.map((input, i) => (
                  <InputField key={i} {...input} onChange={handleOnChange} />
                ))}

                <Form.Group>
                  <Form.Select name="role" required onChange={handleOnChange}>
                    <option value="">Select an option</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the T&Cs"
                    required
                  />
                </Form.Group>

                <div>
                  <Button variant="warning" type="submit">
                    Register
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                Already have an account? <Link to="/">Login Now</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Register
