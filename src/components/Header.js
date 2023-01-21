import React, { useEffect, useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"))
    if (u) {
      setUser(u)
    }
    return
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/")
  }
  return (
    <Navbar bg="warning" expand="md">
      <Container>
        <Navbar.Brand href="#home">LIBRARY SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <div className="d-flex gap-2">
                  <h5>Welcome Back {user?.fName}</h5>
                  <Link to="/" onClick={() => handleLogout()}>
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/" className="mx-3">
                  Login
                </NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
