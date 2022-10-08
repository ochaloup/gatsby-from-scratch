const siteMetadata = {
  title: `The Localhost Blog`,
  description: `This is my coding blog where I write about my coding journey.`,
}

module.exports = {
    pathPrefix: `/gatsby-from-scratch`,
    siteMetadata: siteMetadata,
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/posts`,
          name: `posts`,
        },
      },
      `gatsby-plugin-styled-components`,
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
        },
      },
      {
        resolve: `gatsby-transformer-asciidoc`,
        options: {
          attributes: {
            showtitle: true,
          },
          extensions: [`.adoc`],
        },
      },
    ],
  };