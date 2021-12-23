import React, { useEffect } from "react";
import { Rate, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  const [rating, setRating] = React.useState(recipe.rating);
  useEffect(() => {
    axios.patch(`/rating/${recipe._id}`, { rating: rating });
  }, [rating]);

  const handleRating = (value) => {
    setRating(value);

    message.info("Rating added " + value + " Stars");
  };
  return (
    <React.Fragment>
      <div className="recipe-card shadow">
        <div className="img-holder">
          <img src={"/media/" + recipe.image} alt="" className="img-recipe" />
        </div>
        <div className="content">
          <h4>{recipe.title}</h4>

          <div className="text-start">
            <Rate value={rating} onChange={handleRating} className="ratings" />
          </div>
          <div className="discription">
            <p>
              {recipe.content.length > 70
                ? recipe.content.slice(1, 70)
                : recipe.content}
              ...
              <Link to={`/recipe/${recipe._id}`}> View Details</Link>
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0">
              by <span className="fw-bold">{recipe.author}</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recipe;
