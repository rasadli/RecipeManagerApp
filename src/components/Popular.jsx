import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import { useEffect, useState } from "react";
import styled from "styled-components";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        );
        const data = await api.json();

        if (data.recipes) {
          localStorage.setItem("popular", JSON.stringify(data.recipes));
          setPopular(data.recipes);
        }
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Featured Recipe Pictures</h3>
        <CustomSplide
          options={{
            perPage: 3,
            drag: "free",
            gap: "1.5rem",
            pagination: true,
            arrows: true,
            rewind: true,
            breakpoints: {
              1024: {
                perPage: 2,
              },
              768: {
                perPage: 1,
              },
            },
          }}
        >
          {popular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </Card>
            </SplideSlide>
          ))}
        </CustomSplide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 1400px; /* Centralized with a fixed width */
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
`;

const CustomSplide = styled(Splide)`
  .splide__arrow {
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &--prev {
      left: -1.2rem; /* Adjusted closer to the image */
      top: 50%;
      transform: translateY(-50%);
    }
    &--next {
      right: -1.2rem; /* Adjusted closer to the image */
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .splide__pagination {
    margin-top: 2rem; /* Move pagination dots further down */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
  }

  .splide__pagination__page {
    width: 0.4rem; /* Smaller dots */
    height: 0.4rem; /* Smaller dots */
    background: #ccc;
    border-radius: 50%;

    &.is-active {
      background: #555; /* Highlight active dot */
    }
  }
`;


const Card = styled.div`
  width: 18rem;
  height: 24rem;
  margin: 0 auto; /* Center the images horizontally */
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }

  p {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    text-align: center;
  }
`;


export default Popular
