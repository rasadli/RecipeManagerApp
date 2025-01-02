/*import React from 'react';
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

export default Home;*/

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Popular from './Popular';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
  }
`;

// Styled component for the background container
const BackgroundContainer = styled.div`
  background-image: url('https://img.freepik.com/premium-photo/ingredients-cooking-food-background-with-herbs-vegetables-top-view-white-background_1040174-1574.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Semi-transparent overlay for readability
const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Adjust opacity as needed */
  z-index: 1;
`;

// Styled component for content container
const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
`;

// Styled Heading
const Heading = styled.h1`
  font-size: 3rem;
  color: #222;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Styled Subheading
const Subheading = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

// Projects Section
const MyProjects = () => {
  const projects = [
    {
      name: "Chrome Extension for Auto Form Filler",
      description:
        "A Chrome extension that intelligently fills forms using data extracted from the user's LinkedIn profile, allowing modifications and local storage.",
      link: "hhttps://github.com/rasadli/AutoFormFiller", // Replace with actual link
    },
    
    {
      name: "Recipe Manager App",
      description:
        "A React-based app for creating, viewing, editing, and organizing recipes with attributes like ingredients, preparation steps, tags, and difficulty levels.",
      link: "https://github.com/yourusername/recipe-manager", // Replace with actual link
    },
  ];

  return (
    <ProjectsWrapper>
      <h3>My Projects</h3>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <strong>{project.name}</strong>
            </a>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </ProjectsWrapper>
  );
};

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <BackgroundOverlay />
        <ContentContainer>
          <Heading>Welcome to the Recipe App</Heading>
          <Subheading>Discover delicious recipes, manage your favorites, and much more!</Subheading>
          <Popular />
          <MyProjects />
        </ContentContainer>
      </BackgroundContainer>
    </>
  );
};

export default Home;

// Styled component for projects section
const ProjectsWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #222;
  }

  ul {
    list-style-type: none;

    li {
      margin-bottom: 1rem;

      a {
        text-decoration: none;
        color: #007BFF;
        font-weight: bold;
        transition: color 0.3s;

        &:hover {
          color: #0056b3;
        }
      }

      p {
        margin: 0.5rem 0 0;
        font-size: 0.9rem;
        color: #555;
      }
    }
  }
`;
