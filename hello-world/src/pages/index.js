import React from 'react';
import styled from 'styled-components';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const StyledH1 = styled.h1`
  color: rebeccapurple;
`;

const Named = () => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <StyledH1>{title}</StyledH1>
      <p>{description}</p>
    </>
  );
};
export default Named;
