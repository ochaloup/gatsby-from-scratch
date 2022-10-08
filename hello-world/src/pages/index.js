import { graphql } from 'gatsby'; // this links the query with data passed to 'Page'
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Dump from '../components/Dump';
import { Layout } from '../components/Layout';

const IndexWrapper = styled.main``;

const PostWrapper = styled.div``;


const Page = ({ data }) => {
  let pageDataMd = data.allMdx.nodes.map(({ id, excerpt, frontmatter, fields }) => ({
    "id": id, "excerpt": excerpt, "title": frontmatter.title, "date": frontmatter.date, "fields": fields
  }))
  let pageDataAd = data.allAsciidoc.nodes.map(({ id, pageAttributes, document, revision, fields }) => ({
    "id": id, "excerpt": pageAttributes.synopsis, "title": document.title, "date": revision.date, "fields": fields
  }))
  return (
    <>
      <Layout>
        <Dump data={pageDataAd} />
        {pageDataMd.concat(pageDataAd).map(e => (
            <PostWrapper key={e.id}>
            <Link to={e.fields.slug}>
              <h1>{e.title}</h1>
              <p>{e.date}</p>
              <p>{e.excerpt}</p>
              </Link>
            </PostWrapper>
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
        fields {
          slug
        }
      }
    }
    allAsciidoc(
      sort: { fields: [revision___date], order: DESC }
      filter: { pageAttributes: { published: { eq: "true" } } }
    ) {
      nodes {
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
        fields {
          slug
        }
      }
    }
  }
`;