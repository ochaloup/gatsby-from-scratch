import { graphql } from 'gatsby'; // this links the query with data passed to 'Page'
import React from 'react';
import Dump from '../components/Dump';
import { Layout } from '../components/Layout';


const Page = ({ data }) => {
  let pageDataMd = data.allMdx.nodes.map(({ excerpt, frontmatter }) => ({
    "excerpt": excerpt, "title": frontmatter.title, "date": frontmatter.date
  }))
  let pageDataAd = data.allAsciidoc.edges.map(({ node }) => ({
    "excerpt": node.pageAttributes.synopsis, "title": node.document.title, "date": node.revision.date
  }))
  return (
    <>
      <Layout>
        <Dump data={pageDataAd} />
        {pageDataMd.concat(pageDataAd).map(e => (
          <>
            <h1>{e.title}</h1>
            <p>{e.date}</p>
            <p>{e.excerpt}</p>
          </>
        ))}
      </Layout>
    </>
  );
};
export default Page;

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date
        }
      }
    }
    allAsciidoc(
      sort: { fields: [revision___date], order: DESC }
      filter: { pageAttributes: { published: { eq: "true" } } }
    ) {
      edges {
        node {
          id
          document {
            title
          }
          pageAttributes {
            synopsis
          }
          revision {
            date
          }
        }
      }
    }
  }
`;