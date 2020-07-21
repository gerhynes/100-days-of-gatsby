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
    <div
      className="layout"
      style={{
        margin: `0 auto`,
        maxWidth: `800px`,
        padding: `2.5rem`,
        paddingTop: `2rem`,
      }}
    >
      <nav
        className="nav"
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <Link to={`/`}>
          <h3
            className="nav-link-main"
            style={{
              marginBottom: `2.5rem`,
              display: `inline-block`,
              fontStyle: `normal`,
            }}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <div>
          <Link
            class="nav-link-secondary"
            to={`/contact/`}
            style={{ marginRight: `1rem` }}
          >
            Contact
          </Link>
          <Link class="nav-link-secondary" to={`/about/`}>
            About
          </Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
