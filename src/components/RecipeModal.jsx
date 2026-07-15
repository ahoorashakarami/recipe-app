import React from "react";
import { Modal, Button } from "react-bootstrap";

const RecipeModal = ({ show, handleClose, recipe, darkMode }) => {
    if (!recipe) return null;

    const modalClass = darkMode ? "bg-dark text-white" : "bg-white text-dark";

    return (
        <Modal show={show} onHide={handleClose} centered size="small">
            <div className={modalClass}>

                <Modal.Header closeButton>
                    <Modal.Title>{recipe.strMeal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="img-fluid mb-3 rounded"
                    />
                    <h5>Ingredients :</h5>
                    <ul>
                        {Array.from({ length: 20 }).map((_, i) => {
                            const ingredient = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            return ingredient && ingredient.trim() !== "" ? (
                                <li key={i}>
                                    {ingredient} - {measure}
                                </li>
                            ) : null;
                        })}
                    </ul>

                    <h5 className="mt-4">Recipe :</h5>
                    <p>{recipe.strInstructions}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={handleClose}>
                        close
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default RecipeModal;
