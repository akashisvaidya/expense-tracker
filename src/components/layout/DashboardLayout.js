import React, { useEffect, useState } from "react"
import Footer from "../Footer"
import Header from "../Header"
import Sidebar from "../Sidebar"

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"))
    if (u) {
      return setUser(u)
    }
    return
  }, [])
  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />
      <div className="dashboard-main">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
