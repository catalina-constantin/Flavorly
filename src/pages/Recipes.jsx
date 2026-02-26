import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRecipes } from "../hooks/useRecipes";
import RecipeList from "../components/recipes/RecipeList";
import SearchBar from "../components/forms/SearchBar";
import RecipeFilters from "../components/recipes/RecipeFilters";
import Pagination from "../components/common/Pagination";
import RecipeHeader from "../components/recipes/RecipeHeader";
import { useFilteredRecipes } from "../hooks/useFilteredRecipes";
import FloatingActionButton from "../components/common/buttons/FloatingActionButton";
import Loading from "../components/common/Loading";
import styles from "../styles/pages/Recipes.module.css";

function Recipes() {
  const [deleteMode, setDeleteMode] = useState(false);
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const { recipes, loading, error } = useRecipes();
  const { filters, pagination, currentRecipes } = useFilteredRecipes(recipes);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        recipes
          .flatMap((r) => r.categories?.map((cat) => cat.name) || [])
          .filter(Boolean),
      ),
    ],
    [recipes],
  );

  if (loading) return <Loading message="Loading recipes..." />;
  if (error)
    return (
      <div className={`${styles["status-message"]} ${styles["error"]}`}>
        Error: {error}
      </div>
    );

  return (
    <>
      <RecipeHeader />
      <div className={styles["recipes-container"]}>
        <section className={styles["controls-section"]}>
          <div>
            <SearchBar
              searchTerm={filters.searchTerm}
              setSearchTerm={filters.setSearchTerm}
            />
          </div>
          <div>
            <RecipeFilters {...filters} categories={categories} />
          </div>
          <div>
            {isAuthenticated && role === "admin" && (
              <Link to="/recipes/new" className={styles["add-recipe-button"]}>
                Add new recipe
              </Link>
            )}
          </div>
        </section>

        <div className={styles["recipes-results"]}>
          {currentRecipes.length > 0 ? (
            <>
              <RecipeList recipes={currentRecipes} deleteMode={deleteMode} />
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.setCurrentPage}
              />
            </>
          ) : (
            <div className={styles["status-message"]}>
              I haven't cooked that yet! Try another search.
            </div>
          )}
        </div>
      </div>
      {isAuthenticated && role === "admin" && (
        <FloatingActionButton
          onClick={() => setDeleteMode(!deleteMode)}
          isDeleteMode={deleteMode}
        />
      )}
    </>
  );
}

export default Recipes;
