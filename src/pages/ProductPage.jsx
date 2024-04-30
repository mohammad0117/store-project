import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { createQueryObject, filterProducts, getInitialQuery, searchProducts } from "../helpers/helper";

import styles from "./ProductPage.module.css";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

function ProductPage() {
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);
  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);
  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div>
        <div className={styles.container}>
          <div className={styles.products}>
            {!displayed?.length && <Loader />}
            {displayed?.map((p) => (
              <Card key={p.id} data={p} />
            ))}
          </div>
          <Sidebar query={query} setQuery={setQuery} />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
