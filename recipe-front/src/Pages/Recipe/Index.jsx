import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";

const Index = () => {
  const [recipeDetails, setRecipeDetails] = React.useState([]);

  let { id } = useParams();
  useEffect(() => {
    axios.get(`/recipe/${id}`).then((res) => {
      console.log("RD", res);
      setRecipeDetails(res.data);
    });
  }, []);
  console.log(recipeDetails);
  return (
    <React.Fragment>
      <div className="recipe-details-wrapper shadow">
        <div className="image-holder"></div>
        <div className="content d-flex justify-content-center">
          <div className="text-start w-25 ">
            <h1 className="fw-bold color-gold">{recipeDetails.title} </h1>
            <p className="fs-5 fw-bold">
              Total Time:
              <span className="fs-4 ms-2 fw-light color-gold">
                {recipeDetails.totalTimeReq} hours
              </span>
            </p>
            <p className="fs-5 fw-bold">
              Total Cost:
              <span className="fs-4 fw-light ms-2 color-gold">
                {recipeDetails.totalCost}$
              </span>
            </p>
            <p className="fs-5 fw-bold">
              Popularity :
              <span className="fs-4 fw-light ms-2 color-gold">
                {recipeDetails.rating
                  ? recipeDetails.rating + " Stars"
                  : "None"}
              </span>
            </p>
            <p className="fs-5 fw-bold">
              Posted by:
              <span className="fs-4 fw-light ms-2 color-gold">
                {recipeDetails.author}
              </span>
            </p>
            <Link to="/" className="fs-3">
              <Button className="btn-back">Back</Button>
            </Link>
          </div>
          <div className="text-start w-75">
            <div className="mb-5">
              <h2 className="color-gold">Ingredients: </h2>
              <p>{recipeDetails.ingredients}</p>
            </div>
            <div>
              <h2 className="color-gold">Discription:</h2>
              <p>{recipeDetails.content}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
