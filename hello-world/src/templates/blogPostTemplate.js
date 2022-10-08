import { graphql } from 'gatsby';
// import MDXRenderer from 'gatsby-plugin-mdx';
import parse from 'html-react-parser'
import React from 'react';
import { Layout } from '../components/Layout';

var util = require('util');

const SinglePost = ({ data }) => {
  let title, date, body;
  if (data.mdx) {
    title = data.mdx.frontmatter.title;
    date = data.mdx.frontmatter.date;
    body = <p>{data.mdx.body}</p>;
}
if (data.asciidoc) {
      title = data.asciidoc.document.title;
      date = data.asciidoc.revision.date;
      body = <>{parse(data.asciidoc.html)}</>;
  }
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      {body}
    </Layout>
  );
};
export default SinglePost;

export const query = graphql`
  query PostsBySlug($slug: String!) {
    asciidoc(fields: {slug: {eq: $slug}}) {
      document {
        title
      }
      html
      revision {
        date
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
`;