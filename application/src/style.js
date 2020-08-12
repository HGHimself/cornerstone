import styled from 'styled-components';

const StyledWrapper = styled.div`

  font-family: 'Jost', sans-serif;

  .main {
    margin: auto;
    max-width: 1200px;
  }

  body {
    line-height: 1.4;
  }

  textarea {
    width: 100%;
    outline: none;
    overflow: auto;
  }

  h1 {
    letter-spacing: -1.5px;
    font-size: 6rem;
  }

  h2 {
    letter-spacing: -0.5px;
    font-size: 3.75rem;
  }

  h3 {
    letter-spacing: 0px;
    font-size: 3rem;
  }

  h4 {
    letter-spacing: 0.25px;
    font-size: 2.125rem;
  }

  h5 {
    letter-spacing: 0px;
    font-size: 1.5rem;
  }

  h6 {
    letter-spacing: 0.15px;
    font-size: 1.25rem;
  }

  p  {
    font-size: 1rem;
    letter-spacing: 0.5px;
    text-align: justify;
    text-justify: inter-word;
  }

  .subtitle1  {
    font-size: 1rem;
    letter-spacing: 0.15px;
  }

  .subtitle2  {
    font-size: 0.75rem;
    letter-spacing: 0.1px;
  }

  button {
    font-size: 0.875rem;
    letter-spacing: 1.25px;
    text-transform: capitalize;
  }

  h1, h2  {
    font-weight: 100;
  }

  h3, h4, h5, .subtitle1, p {
    font-weight: 500;
  }

  button, h6  {
    font-weight: 700;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1rem;
  }
`;

export default StyledWrapper;
