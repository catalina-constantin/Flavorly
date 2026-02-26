import recipesHeaderImage from "../../assets/images/recipes-header.png";
import styles from "../../styles/recipes/RecipeHeader.module.css";

function RecipeHeader() {
  return (
    <header className={styles["recipes-header"]}>
      <img
        src={recipesHeaderImage}
        alt="Recipes Banner"
        className={styles["recipes-banner"]}
      />
      <div className={styles["header-content"]}>
        <h1>From my kitchen to yours</h1>
        <p>
          Pull up a chair and find something delicious. These are the recipes I
          finally wrote down so I would stop forgetting my own secrets.
        </p>
      </div>
    </header>
  );
}

export default RecipeHeader;
