import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const STORAGE_KEY = "recipe_filters";

const readStoredFilters = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    return {
      searchTerm:
        typeof parsed.searchTerm === "string" ? parsed.searchTerm : "",
      selectedCategory:
        typeof parsed.selectedCategory === "string"
          ? parsed.selectedCategory
          : "All",
      sortBy: typeof parsed.sortBy === "string" ? parsed.sortBy : "newest",
    };
  } catch {
    return null;
  }
};

export function useFilteredRecipes(recipes, recipesPerPage = 12) {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedFilters = readStoredFilters();
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || storedFilters?.searchTerm || "",
  );
  const displaySearchTerm = searchParams.get("search") || "";
  const [localSearchTerm, setLocalSearchTerm] = useState(displaySearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(
    () =>
      searchParams.get("category") || storedFilters?.selectedCategory || "All",
  );
  const [sortBy, setSortBy] = useState(
    () => searchParams.get("order") || storedFilters?.sortBy || "newest",
  );
  const [currentPage, setCurrentPage] = useState(() => {
    const nextPage = Number(searchParams.get("page") || 1);
    return Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
  });

  useEffect(() => {
    setLocalSearchTerm(displaySearchTerm);
  }, [displaySearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearchTerm]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (searchTerm) nextParams.set("search", searchTerm);
    if (selectedCategory && selectedCategory !== "All") {
      nextParams.set("category", selectedCategory);
    }
    if (sortBy && sortBy !== "newest") nextParams.set("order", sortBy);
    if (currentPage && currentPage !== 1) {
      nextParams.set("page", String(currentPage));
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ searchTerm, selectedCategory, sortBy }),
    );
  }, [searchTerm, selectedCategory, sortBy]);

  const processedRecipes = useMemo(() => {
    let result = [...recipes];

    if (searchTerm) {
      result = result.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((r) =>
        r.categories?.some((cat) => cat.name === selectedCategory),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "time-asc")
        return a.cooking_time_minutes - b.cooking_time_minutes;
      if (sortBy === "time-desc")
        return b.cooking_time_minutes - a.cooking_time_minutes;
      if (sortBy === "newest")
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

    return result;
  }, [recipes, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(processedRecipes.length / recipesPerPage);
  const validCurrentPage = currentPage > totalPages ? 1 : currentPage;

  const currentRecipes = processedRecipes.slice(
    (validCurrentPage - 1) * recipesPerPage,
    validCurrentPage * recipesPerPage,
  );

  return {
    filters: {
      searchTerm: localSearchTerm,
      setSearchTerm: setLocalSearchTerm,
      selectedCategory,
      setSelectedCategory,
      sortBy,
      setSortBy,
    },
    pagination: { currentPage: validCurrentPage, setCurrentPage, totalPages },
    currentRecipes,
  };
}
