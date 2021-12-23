import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Index = () => {
  const [recipeDetails, setRecipeDetails] = React.useState([]);

  let { id } = useParams();
  useEffect(() => {
    axios.get(`/recipe/${id}`).then((res) => {
      console.log("RD", res);
      setRecipeDetails(res.data);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="recipe-details-wrapper">
        <div className="image-holder"></div>
        <div className="content d-flex justify-content-center">
          <div className="text-start w-25">
            <h1 className="fw-bold">{recipeDetails.title} </h1>
            <p className="fs-5">
              Total Time: <span className="fs-5">{recipeDetails.totalTimeReq}</span>
            </p>
            <p className="fs-5">
              Total Cost: <span>{recipeDetails.totalCost}</span>
            </p>
            <p className="fs-5">
              Popularity : <span>{recipeDetails.rating}</span>
            </p>
            <p className="fs-5">
              Posted by: <span>{recipeDetails.author}</span>
            </p>
          </div>
          <div className="text-start w-75">
            <div>
              <p>
                Ingredients: <span>{recipeDetails.ingredients}</span>
              </p>
            </div>
            <div>
              <p>
                Discription: <span>{recipeDetails.content}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
