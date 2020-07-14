import React, { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const Header = () => {
  const { recipes } = useContext(RecipeContext);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>📈</h2>
          <div style={{ height: 10 }} />
          {recipes?.length > 0 &&
            (recipes?.length > 1 ? (
              <h1> I've invested in {recipes?.length} stocks!</h1>
            ) : (
              <h1>I've invested in {recipes?.length} stock!</h1>
            ))}
          {(recipes?.length <= 0 || !recipes) && (
            <h1>Start tracking your stocks today!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
