import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  border: 0.5rem solid #eb2f64;
  background: #f4f2f2;
  color: #333;
  width: 33%;
  margin: 3rem;
  padding: 1rem;
  transition: all 0.1s ease-in;
  position: relative;
  h2 {
    font-size: 1.6rem;
  }
  .title {
    font-size: 1.4rem;
  }
  &:hover {
    .title {
      color: #eb2f64;
      text-decoration: underline;
    }
    cursor: pointer;
  }
  &::before {
    content: "\\201C";
    position: absolute;
    top: -5.75rem;
    left: -3rem;
    line-height: 1;
    font-size: 31rem;
    color: #333;
    font-family: sans-serif;
    overflow: hidden;
    z-index: 1;
    height: 10rem;
  }
`;

const Post = props => {
  const { title, contents, created_at, updated_at } = props.post;
  return (
    <StyledContainer>
      <h2>{contents}</h2>
      <h2 className="title">{title}</h2>
      <h2>{created_at}</h2>
      <h2>{updated_at}</h2>
    </StyledContainer>
  );
};
export default Post;
