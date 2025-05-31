import React from "react";
import styles from "./FilterSidebar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setPriceRange, setSelectedCategories } from "../../redux/reducers/filterSideBarReducer";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector((state) => state.filter.priceRange);
  const selectedCategories = useSelector((state) => state.filter.selectedCategories);

  const handlePriceChange = (event) => {
    dispatch(setPriceRange(Number(event.target.value)));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const updatedCategories = event.target.checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    dispatch(setSelectedCategories(updatedCategories));
  };

  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>

      {/* Price Filter */}
      <label htmlFor="price">Price: {priceRange}</label>
      <input
        type="range"
        id="price"
        min="1"
        max="100000"
        value={priceRange}
        className={styles.priceRange}
        step="10"
        onChange={handlePriceChange}
      />

      {/* Category Filter */}
      <h2>Category</h2>
      <div className={styles.categoryContainer}>
        {["men's clothing", "women's clothing", "jewelery", "electronics"].map((category) => (
          <div className={styles.inputContainer} key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label>{category}</label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
