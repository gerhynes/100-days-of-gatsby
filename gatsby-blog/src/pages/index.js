import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ data }) {
  const { edges: posts } = data.allMdx
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Here's to #100DaysOfGatsby</h1>
      <div>
        <Img
          style={{ marginBottom: `1rem` }}
          fluid={data.file.childImageSharp.fluid}
          alt="Jay Gatsby"
        />
        <p>Cheers, Old Sport.</p>
        <ul style={{ listStyle: `none` }}>
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p>{post.frontmatter.date}</p>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
    file(relativePath: { eq: "images/gatsby-old-sport.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
