import RecipeCard from "./RecipeCard";
import "../styles/RecipeList.css";

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
