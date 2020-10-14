import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, serProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
     //   console.log(data);
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
       // console.log(data);

        serProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout title="Home page" 
    description="Node React E-commerce App">
      <Search></Search>
      <h2 className="ml-2 mb-4">New Arrivals</h2>
      <div className="row ml-2 mr-2">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product}></Card>
          </div>
        ))}
      </div>
      <h2 className="ml-2 mb-4">Best Sellers</h2>
      <div className="row ml-2 mr-2">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product}></Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
