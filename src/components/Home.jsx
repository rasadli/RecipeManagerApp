import React from "react";
import Popular from "./Popular";

const MyProjects = () => {
  const projects = [
    {
      name: "Chrome Extension for Auto Form Filler",
      description:
        "A Chrome extension that intelligently fills forms using data extracted from the user's LinkedIn profile, allowing modifications and local storage.",
      link: "https://github.com/rasadli/AutoFormFiller",
    },
    {
      name: "Recipe Manager App",
      description:
        "A React-based app for creating, viewing, editing, and organizing recipes with attributes like ingredients, preparation steps, tags, and difficulty levels.",
      link: "https://github.com/rasadli/RecipeManagerApp",
    },
  ];

  return (
    <div className="projects-wrapper">
      <h3>Our Projects</h3>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div className="background-container">
        <div className="background-overlay" />
        <div className="content-container">
          <h1 className="heading">Welcome to the Recipe App</h1>
          <p className="subheading">
            Discover delicious recipes, manage your favorites, and much more!
          </p>
          <Popular />
          <MyProjects />
        </div>
      </div>
    </>
  );
};

export default Home;
