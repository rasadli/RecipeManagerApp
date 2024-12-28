import { useEffect, useState } from "react";
import styled from "styled-components";

function Popular() {


const[ popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);
  
  const getPopular = async () => {
    try {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
      const data = await api.json();
      console.log(data); // Debugging
      setPopular(data.recipes || []); // Fallback to an empty array
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
      setPopular([]); // Handle errors gracefully
    }
  };
  
  
  
  return (
    <div>
      <Wrapper>
        <h3>Featured Recipe Pictures</h3>
        {popular.map((recipe) => (
          <Card key={recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
          </Card>
        ))}
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
  `;



export default Popular
