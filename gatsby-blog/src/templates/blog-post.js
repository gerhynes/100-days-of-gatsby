// import React from "react"
// import { graphql } from "gatsby"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import Img from "gatsby-image"
// import { MDXRenderer } from "gatsby-plugin-mdx"

// export default function BlogPost({ data }) {
//   const post = data.markdownRemark
//   let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

//   return (
//     <Layout>
//       <SEO title={post.frontmatter.title} description={post.excerpt} />
//       <div>
//         <h1>{post.frontmatter.title}</h1>
//         <Img fluid={featuredImgFluid} />
//         <MDXRenderer>{post.body}</MDXRenderer>
//       </div>
//     </Layout>
//   )
// }

// export const query = graphql`
//   query($slug: String!) {
//     mdx(fields: { slug: { eq: $slug } }) {
//       body
//       frontmatter {
//         title
//         featuredImage {
//           childImageSharp {
//             fluid(maxWidth: 800) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//       excerpt
//     }
//   }
// `
