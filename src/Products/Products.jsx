import React from "react";
import styles from "./Products.module.css";
import Card from "../components/Card";

const Products = ({ result }) => {
  return (
    <ul className={styles.productMain}>
      {result.map((result, index) => (
        <li className={`${styles.productItem}`} key={result.id}>
          <Card
            img={result.sites[0].logoSmall2x}
            title={result.title}
            description={result.shortDescription}
          />
        </li>
      ))}
    </ul>
  );
};

export default Products;