import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ location, data: { mdx } }) {
  const { title, date, featuredImage } = mdx.frontmatter
  return (
    <Layout>
      <SEO
        title={title}
        description={mdx.excerpt}
        image={featuredImage.childImageSharp.fluid}
        pathname={location.pathname}
      />
      <h1>{title}</h1>
      <Img
        style={{ marginBottom: `1rem` }}
        fluid={featuredImage.childImageSharp.fluid}
        alt={title}
      />
      <p>{date}</p>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date
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
