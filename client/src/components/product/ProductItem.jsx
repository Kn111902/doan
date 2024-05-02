import React from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../api/BaseApi";

function ProductItem({ data, hot, newProduct }) {
  const handleAddToCart = (data) => {};

  return (
    <div className="relative">
      <Link to={`/product/${data.pid}`}>
        <div className="flex rounded-[2px] flex-col w-full h-full card">
          <div className="object-cover">
            <img
              src={`${BASEURL}image/${data.image}`}
              alt={data.title}
              className="block w-full h-auto"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold p-2">{data.title}</h3>
            <div className="text-center m-[10px]"> {data.price} vnd</div>
          </div>
          <div className="flex justify-center">
            <button className="btn_add" onClick={() => handleAddToCart(data)}>
              Add to card
            </button>
          </div>
        </div>
      </Link>
      {hot ? (
        <span className="absolute bg-red-500 text-white px-4 py-2 right-0 top-0">
          Hot
        </span>
      ) : null}
      {newProduct ? (
        <span className="absolute bg-yellow-500 text-white px-4 py-2 right-0 top-0">
          New
        </span>
      ) : null}
    </div>
  );
}

export default ProductItem;
