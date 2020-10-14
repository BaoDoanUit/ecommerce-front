import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";


const Card = ({
  product,
  showViewProductButton = true,
  showViewAddToCartButton = true,
  showRemoveProductButton = false,
  cartUpdate = false,
  run = undefined,
  setRun
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`}>
        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Product
        </button>
      </Link>
    );

  const showAddToCartButton = showViewAddToCartButton =>
  showViewAddToCartButton && (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 mr-2">
        Add to cart
      </button>
    );

    const showRemoveButton = showRemoveProductButton =>
    showRemoveProductButton && (
      <button onClick={() => {
                  removeItem(product._id)
                  setRun(!run)
                }} 
      className="btn btn-outline-danger mt-2 mb-2 mr-2">
        Remove Product
      </button>
    ); 

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };

  const addToCart = () => {
    // Add to Cart
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const handleChange = productId => event=>{
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if(event.target.value >= 1){
      updateItem(productId, event.target.value);
    }
  }

  const showCartUpdateOptions =  cartUpdate => {
    return cartUpdate && 
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input type="number" className="form-control" 
        value={count} onChange={handleChange(product._id)} />
      </div>
    </div>
  }

  return (
    <div className="card mb-2">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product"></ShowImage>
        <p className="lead mt-2">{product.description.substring(0, 50)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}
        <br />
        {showCartUpdateOptions(cartUpdate)}
        {showAddToCartButton(showViewAddToCartButton)}
        {showViewButton(showViewProductButton)}
        {showRemoveButton(showRemoveProductButton)}
      </div>
    </div>
  );
};

export default Card;
