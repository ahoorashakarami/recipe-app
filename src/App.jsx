import React, { useState } from "react";
import SearchBox from "./components/Searchbox";
import RecipeModal from "./components/RecipeModal";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (term) => {
    setRecipes([]);
    setError(null);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );

      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError("Recipe Not Found.");
      }
    } catch (err) {
      setError("Error Receiving Information From The Server.");
    }
  };

  return (
    <div
      className="bg-light text-dark"
      style={{
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center mb-4 pt-5">
        Find Food Recipe 🍽️
      </h1>

      <SearchBox onSearch={handleSearch} />

      <div className="container">
        {error && (
          <div className="alert alert-danger text-center mt-4" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="container">
        <div className="row mt-4 justify-content-center">
          {recipes.map((meal) => (
            <div
              className="col-auto mb-4 d-flex justify-content-center"
              key={meal.idMeal}
            >
              <div
                className="card h-100"
                style={{
                  width: "300px",
                  boxShadow: "0 0 4px rgba(0,0,0,.4)",
                }}
              >
                <img
                  src={meal.strMealThumb}
                  className="card-img-top"
                  alt={meal.strMeal}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{meal.strMeal}</h5>

                  <p className="card-text">
                    {meal.strInstructions.substring(0, 100)}...
                  </p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => {
                      setSelectedRecipe(meal);
                      setShowModal(true);
                    }}
                  >
                    See Full Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RecipeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        recipe={selectedRecipe}
      />
    </div>
  );
}

export default App;