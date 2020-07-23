const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/components/posts-page-layout.js`)

  const result = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            body
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: blogPost,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id, slug: node.fields.slug },
    })
  })
}
