import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { listRelated, read } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [err, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
      }
    });
  };

  const loadRelatedProducts = (productId) => {
    listRelated(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    loadRelatedProducts(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false}></Card>
          )}     
        </div>
        <div className="col-4">
          <h4>Related Product</h4>
          {relatedProduct.map((product, i) => (
            <div key={i} className="mb-3">
              <Card product={product}></Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
