import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ data }) {
  const { edges: posts } = data.allMdx
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Here's to #100DaysOfGatsby</h1>
      <div>
        <img
          src="https://res.cloudinary.com/gerhynes/image/upload/q_auto/v1594412361/gatsby-old-sport_dw9kf4.jpg"
          alt="Gatsby saying Cheers, Old Sport"
        />
        <p>Cheers, Old Sport.</p>
        <ul style={{ listStyle: `none` }}>
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
