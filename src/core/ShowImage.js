import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.nam}
      className="mb-3"
      style={{ height: "100%", width: "100%" }}
    />
  </div>
);

export default ShowImage;