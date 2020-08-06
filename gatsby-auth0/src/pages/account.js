import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import { login, isAuthenticated, getProfile } from "../utils/auth"

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/account/home/">Home</Link>
        {` `}
        <Link to="/account/settings/">Settings</Link>
        {` `}
        <Link to="/account/billing/">Billing</Link>
      </nav>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Router>
        <Settings path="/account/settings" />
        <Billing path="/account/billing" />
        <Home path="/account/" />
      </Router>
    </>
  )
}

export default Account
