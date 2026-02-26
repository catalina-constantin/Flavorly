import RecipeCard from "./RecipeCard";
import styles from "../../styles/recipes/RecipeList.module.css";

const RecipeList = ({ recipes, deleteMode }) => {
  return (
    <div className={styles["recipes-grid"]}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} deleteMode={deleteMode} />
      ))}
    </div>
  );
};

export default RecipeList;
