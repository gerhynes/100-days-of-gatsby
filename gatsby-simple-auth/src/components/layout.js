import React from "react"
import Navbar from "./navbar"
import "./layout.css"

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
)

export default Layout
