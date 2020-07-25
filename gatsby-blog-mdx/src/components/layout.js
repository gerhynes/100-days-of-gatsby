import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import "./layout.css"

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="layout">
      <nav className="nav">
        <Link to={`/`}>
          <h3 className="nav-link-main">{data.site.siteMetadata.title}</h3>
        </Link>
        <div>
          <Link class="nav-link-secondary" to={`/about/`}>
            About
          </Link>
          <Link to={`/contact/`}>Contact</Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
