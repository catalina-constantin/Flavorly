import styles from "../../styles/forms/SearchBar.module.css";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className={styles["search-container"]}>
      <input
        id="recipe-search"
        name="recipe-search"
        type="text"
        placeholder="Search recipes..."
        className={styles["search-input"]}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
