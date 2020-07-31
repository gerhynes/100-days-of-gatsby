# Adding Search to a Gatsby Site with Algolia

![Screenshot of Gatsby site with Algolia searchbox](./content/blog/adding-search-to-a-gatsby-site/adding-search-to-a-gatsby-site.png)

To add search functionality to a Gatsby site you need three things:

1. A Search Index

2. A Search Engine

3. Search UI

A search index stores information about your site in a way that the search engine can efficiently read without having to scan every page of your site.

A search engine is a programme that takes a search query, checks it against the search index and returns matches.

The UI components let the user make search queries and view search results.

You could incorporate an open source search engine into your site (which every user will have to download) or use an API-based search engine (which is more scalable but can be costly).

## Algolia

[Algolia](https://www.algolia.com/) is a service which hosts search indices and a search engine, which are accessible via an API. They also provide components for building the search UI. Their free tier is a great way to get started adding search to your site.

The quite useful [`gatsby-plugin-algolia`](https://github.com/algolia/gatsby-plugin-algolia) creates an index of your site's pages at build time. You can use GraphQl to control which pages and what information are included. This index is then stored by Algolia and accessible for future searches.

Gatsby have an excellent [tutorial for adding Algolia to a Gatsby site](https://www.gatsbyjs.org/docs/adding-search-with-algolia/).

## Gatsby and Algolia

This project uses `gatsby-plugin-algolia` to generate the search index.

`src/utils/algolia-queries.js` configures the plugin, telling it which information to index. In this case, the slug, `excerpt` field, and frontmatter `title` field from the Markdown blogposts.

Run `gatby build` and you should see output like this:

```
success Building static HTML for pages - 26.421s - 6/6 0.23/s
Algolia: 1 queries to index
Algolia: query 0: executing query
Algolia: query 0: graphql resulted in 2 records
Algolia: query 0: splitting in 1 jobs
```

Go to your Algolia account, to Indices and then to Pages and you'll see the indexed page data.

The search UI is built with ;[React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/), [Styled Components](https://styled-components.com/) and [Styled Icons](https://styled-icons.js.org/).

This demo app is hosted on [Netlify](https://www.netlify.com/). If you deploy your app to Netlify, you will need to add your Algolia API credentials as environmental variables or the build will fail.

On Netlify, go to Setting, then Build & Deploy, then Environment, then Environmental variables and add your API keys.

## Run this project locally

Clone this respository.

```
git clone git@github.com:GK-Hynes/100-days-of-gatsby.git
```

Switch into the gatsby-algolia-search directory.

```
cd 100-days-of-gatsby/gatsby-algolia-search
```

Install the necessary packages.

```
npm install
```

In `gatsby-config.js`, replace the Algolia API keys with your own. You can get these by [signing up at algolia.com](https://www.algolia.com/users/sign_up) and then going to the "API Keys" section of you Algolia profile.

```
{
  resolve: `gatsby-plugin-algolia`,
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    queries: require("./src/utils/algolia-queries"),
  },
},
```

It's advisable to store these as environmental variables in a `.env` file.
