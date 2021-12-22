import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Recipe from "../../Components/Home/Recipe";
import axios from "axios";

const Index = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios
      .get("/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="home">
        <div className="home__hero-container">
          <h1>Find a Recipe</h1>

          <Input className="home__search-input" placeholder="Search..." />
        </div>
        <div className="home__content-wrapper">
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
