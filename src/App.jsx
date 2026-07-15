import React, { useEffect, useState } from "react";
import SearchBox from "./components/Searchbox";
import RecipeModal from "./components/RecipeModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [backgroundImage, setBackgroundImage] = useState(() => {
    return localStorage.getItem("backgroundImage") || null;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setRecipes([]);
    setError(null);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
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

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result);
        localStorage.setItem("backgroundImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
    localStorage.removeItem("backgroundImage");
  };

  return (

    <>

      <div style={{
        backgroundColor: backgroundImage ? "transparent" : darkMode ? "#212529" : "#f8f9fa",
        height: "100vh", width: "100vw", overflowX: "hidden",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }} className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>

        <div className="d-flex align-items-center gap-2">
          <label
            htmlFor="bgUpload"
            className={`btn btn-sm btn-dark`}
            title="Choose Background"
          >
            🖼️
          </label>
          <input
            type="file"
            accept="image/*"
            id="bgUpload"
            onChange={handleBackgroundUpload}
            style={{ display: "none" }}
          />

          {backgroundImage && (
            <button
              className={`btn btn-sm btn-dark`}
              onClick={removeBackgroundImage}
            >
              Remove Background
            </button>
          )}
        </div>

        <button
          className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"} position-fixed top-0 end-0 m-3`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        <h1 className="text-center mb-4 pt-5"> Find Food Recipe 🍽️</h1>
        <SearchBox onSearch={handleSearch} />
        <div className="container">
          {error && (
            <div className="alert alert-danger text-center mt-4" role="alert">
              {error}
            </div>
          )}
        </div>
        <div className="container">

          <div className="row mt-4">
            {recipes.map((meal) => (
              <div className="col-md-4 mb-4" style={{ maxWidth: "300px" }} key={meal.idMeal}>
                <div style={{ boxShadow: "0 0 4px #000" }} className={`card h-100 ${darkMode ? "bg-dark text-white" : ""}`}>
                  <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                  <div className="card-body">
                    <h5 className="card-title">{meal.strMeal}</h5>
                    <p className="card-text">{meal.strInstructions.substring(0, 100)}...</p>
                    <button className="btn btn-primary" onClick={() => {
                      setSelectedRecipe(meal);
                      setShowModal(true);
                    }}>
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
          darkMode={darkMode}
        />

      </div>
    </>
  );
}

export default App;

