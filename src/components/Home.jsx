import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Popular from "./Popular";

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
      link: "https://github.com/rasadli/AutoFormFiller", // Replace with actual link
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
      <h3>Our Projects</h3>
      <ProjectsContainer>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </ProjectCard>
        ))}
      </ProjectsContainer>
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
  margin-top: 3rem;
  text-align: center;

  h3 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid #ff6f61;
    display: inline-block;
    padding-bottom: 0.5rem;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ProjectCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h4 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: #ff6f61;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #d63c2f;
    }
  }
`;
