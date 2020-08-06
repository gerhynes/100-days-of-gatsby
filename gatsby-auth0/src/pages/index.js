import React from "react"
import { Link } from "gatsby"

export default function Home() {
  return (
    <div>
      <h1>Login with Auth0</h1>
      <Link to="/account/">Go to your account</Link>
    </div>
  )
}
