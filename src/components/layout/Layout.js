import React from "react"
import Header from "../Header"
import { Container } from "react-bootstrap"
import Footer from "../Footer"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className="main">{children}</Container>
      <Footer />
    </div>
  )
}

export default Layout
