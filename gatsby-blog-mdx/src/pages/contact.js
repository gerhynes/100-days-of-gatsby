import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignupForm from "../components/signupForm"

export default function Contact({ data }) {
  return (
    <Layout>
      <SEO title="Contact" />
      <h1>Join the {data.site.siteMetadata.title} Mailing List</h1>
      <SignupForm />
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
  }
`
