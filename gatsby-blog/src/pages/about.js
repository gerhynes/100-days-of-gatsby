import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

export default function About({ data }) {
  return (
    <Layout>
      <SEO title="About" />
      <h1>An about page for a {data.site.siteMetadata.title}</h1>
      <Img
        style={{ marginBottom: `1rem` }}
        fluid={data.file.childImageSharp.fluid}
        alt="Jay Gatsby"
      />
      <p>
        If you want to learn about Gatsby, you can't do better than to read the{" "}
        <a href="https://www.gatsbyjs.org/docs/">official docs</a>.
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "images/gatsby-about.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
