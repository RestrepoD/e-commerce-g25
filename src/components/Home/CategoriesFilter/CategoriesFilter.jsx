import { useEffect, useRef, useState } from "react";
import { useCategories } from "../../../hooks/queries/useCategories";
import "./CategoriesFilter.css";

const CategoriesFilter = ({
  formId,
  onChangeCategories,
  initialCategories = [],
}) => {
  const { data, isLoading, isError, error } = useCategories();
  const [categoryIdList, setCategoryIdList] = useState(initialCategories);
  const isFirstRender = useRef(true);

  function addIdToList(categoryId) {
    const listCopy = structuredClone(categoryIdList);
    listCopy.push(categoryId);
    const noRepeatsCopy = Array.from(new Set(listCopy));
    if (noRepeatsCopy.length === data.length) setCategoryIdList([]);
    else setCategoryIdList(noRepeatsCopy);
  }

  function removeIdFromList(categoryId) {
    const noIdList = categoryIdList.filter((id) => id != categoryId);
    setCategoryIdList(noIdList);
  }

  function handleEmpty(isChecked) {
    if (isChecked) setCategoryIdList([]);
  }

  function handleChange(isChecked, categoryId) {
    if (isChecked) addIdToList(categoryId);
    else removeIdFromList(categoryId);
  }

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else onChangeCategories();
  }, [categoryIdList, onChangeCategories]);

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>{error.message ?? "Couldn't get categories"}</p>;

  return (
    <fieldset form={formId} className="categories_list">
      <legend>Categories</legend>
      <div>
        <input
          checked={categoryIdList.length === 0}
          onChange={(e) => handleEmpty(e.target.checked)}
          type="checkbox"
          name="categories"
          id="empty-category"
          value=""
          form={formId}
        />
        <label htmlFor="empty-category">All</label>
      </div>
      {data.map((category) => (
        <div key={category.id}>
          <input
            checked={categoryIdList.includes(category.id)}
            onChange={(e) => handleChange(e.target.checked, category.id)}
            type="checkbox"
            name="categories"
            id={category.id + "category"}
            value={category.id}
            form={formId}
          />
          <label htmlFor={category.id + "category"}>{category.name}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesFilter;
