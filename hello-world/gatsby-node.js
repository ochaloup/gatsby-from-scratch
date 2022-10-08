const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(
    'src/templates/blogPostTemplate.js'
  );

  return graphql(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
      allAsciidoc{
        nodes {
          document {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMdx.nodes
      .map(({fields, frontmatter}) => ({"title": frontmatter.title, "slug": fields.slug}))
      .concat(result.data.allAsciidoc.nodes
        .map(({document, fields}) => ({"title": document.title, "slug": fields.slug}))
      );

    // create page for each mdx file
    posts.forEach(post => {
      createPage({
        path: post.slug,
        component: blogPostTemplate,
        context: {
          slug: post.slug,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx` || node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};