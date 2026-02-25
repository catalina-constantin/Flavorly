import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRecipes } from "../hooks/useRecipes";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import RecipeFilters from "../components/RecipeFilters";
import Pagination from "../components/Pagination";
import RecipeHeader from "../components/RecipeHeader";
import { useFilteredRecipes } from "../hooks/useFilteredRecipes";
import FloatingActionButton from "../components/FloatingActionButton";
import "../styles/Recipes.css";

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

  if (loading) return <div className="status-message">Loading recipes...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;

  return (
    <>
      <RecipeHeader />
      <div className="recipes-container">
        <section className="controls-section">
          <SearchBar
            searchTerm={filters.searchTerm}
            setSearchTerm={filters.setSearchTerm}
          />
          <RecipeFilters {...filters} categories={categories} />
          {isAuthenticated && role === "admin" && (
            <Link to="/recipes/new" className="add-recipe-button">
              Add new recipe
            </Link>
          )}
        </section>

        <div className="recipes-results">
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
            <div className="status-message">
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
