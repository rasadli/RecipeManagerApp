/*import React from 'react';
import styled from 'styled-components';
import Popular from './Popular';

// Import Google Font
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }
`;


const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Home = () => {
  return (
    <Container>
      <GlobalStyle />
      <Heading>Welcome to the Recipe App</Heading>
      <Subheading>Discover delicious recipes, manage your favorites, and much more!</Subheading>
      <Popular />
    </Container>
  );
};

export default Home;
*/


import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Popular from './Popular';

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

// Styled component for the background container
const BackgroundContainer = styled.div`
  background-image: url('https://img.freepik.com/premium-photo/ingredients-cooking-food-background-with-herbs-vegetables-top-view-white-background_1040174-1574.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <Heading>Welcome to the Recipe App</Heading>
        <Subheading>Discover delicious recipes, manage your favorites, and much more!</Subheading>
        <Popular />
      </BackgroundContainer>
    </>
  );
};

export default Home;
