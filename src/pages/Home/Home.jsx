import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import ProductsList from "../../components/Home/ProductsList/ProductsList";
import CategoriesFilter from "../../components/Home/CategoriesFilter/CategoriesFilter";
import "./Home.css";

const Home = () => {
  const formId = useId();
  const submit = useSubmit();
  const formRef = useRef();
  const { categories, title } = useLoaderData();
  const [titleValue, setTitleValue] = useState(title);

  const handleChangeCategories = useCallback(() => {
    if (!formRef.current) return;
    submit(formRef.current);
  }, [submit]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  return (
    <div className="home_cont">
      <aside className="categories_cont">
        <CategoriesFilter
          formId={formId}
          onChangeCategories={handleChangeCategories}
          initialCategories={categories}
        />
      </aside>
      <section>
        <Form id={formId} ref={formRef} className="searchbar_cont">
          <input
            type="search"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="What are you looking for?"
            className="searchbar"
          />
        </Form>
        <ProductsList categories={categories} title={title} />
      </section>
    </div>
  );
};

export default Home;
