import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { useEffect, useState } from "react";
import styled from "styled-components";


function Popular() {


const[ popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);
  
  const getPopular = async () => {
    const check = localStorage.getItem('popular'); // Check for cached recipes
  
    if (check) {
      // If cached recipes exist, set them to state
      setPopular(JSON.parse(check));
    } else {
      // If no cached data, fetch from the API
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        );
        const data = await api.json();
        console.log('API Response:', data);
  
        if (data.recipes) {
          localStorage.setItem('popular', JSON.stringify(data.recipes));
          console.log('Saved to Local Storage:', JSON.stringify(data.recipes));
          setPopular(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    }
  };
    
    


return (
  <div>
        <Wrapper>
          <h3>Featured Recipe Pictures</h3>
          <Splide options = {{
    perPage: 3,         // Number of items visible at once
    /*arrows:false,
    pagination:false,*/
    drag: "free",       // Allows free dragging
    gap: "5rem",        // Gap between slides

          }}>
            {popular.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                <Card>
                {console.log("Rendering Gradient for:", recipe.title)} {/* Debugging */}
                <Gradient />
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
                </SplideSlide>
                  
              );
            })}
          </Splide>
        </Wrapper>
  </div>
);
}


const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position:relative;

  img{
    border-radius: 2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;  
  }

  p{
  position:absolute;
  z-index:10;
  left:50%;
  bottom:0%;
  transform:translate(-50%, 0%);
  color:white;
  width:100%;
  text-align:center;
  font-weight:600;
  font-size:1rem;
  height:40%;
  display: flex;
  justify-content:center;
  align-items:center;
  }
  `;

  const Gradient = styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.7));
  `;



export default Popular
