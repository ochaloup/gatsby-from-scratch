const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  console.log(`internal type: ${node.internal.type}`)
  if (node.internal.type === `Mdx` || node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};