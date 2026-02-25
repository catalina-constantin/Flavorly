import RecipeCard from "./RecipeCard";
import "../styles/RecipeList.css";

const RecipeList = ({ recipes, deleteMode }) => {
  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} deleteMode={deleteMode} />
      ))}
    </div>
  );
};

export default RecipeList;
