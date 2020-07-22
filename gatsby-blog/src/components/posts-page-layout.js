import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <h1>{mdx.frontmatter.title}</h1>
      <Img
        fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
        alt={mdx.frontmatter.title}
      />
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
