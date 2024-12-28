import React from "react";

const projects = [
  /*{ name: "Recipe Manager", link: "https://github.com/yourrepo/recipe-manager" },
  { name: "Weather App", link: "https://github.com/yourrepo/weather-app" },*/
  { name: "Portfolio Website", link: "https://www.youtube.com/watch?v=xc4uOzlndAk&t=2011s" },
];

const ProjectList = () => {
  return (
    <div>
      <h2>My Web and Mobile Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
