import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Filter from "../../components/Filter";
import ProductItem from "../../components/product/ProductItem";
import { getProductByName } from "../../redux/productAction";

export default function Search() {
  const { name } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      page: 0,
      limit: 12,
      name: name.toLowerCase(),
    };

    dispatch(getProductByName(params));
  }, [name, dispatch]);
  const { products } = useSelector((state) => state.product);

  return (
    <div className="my-[50px] container m-auto">
      <div>
        <div className="text-center font-bold my-12 ">
          <h2 className="text-yellow-yody text-3xl">
            POLO YODY - THOẢI MÁI, TỰ TIN MỌI LÚC MỌI NƠI{" "}
          </h2>
        </div>

        <div className="flex">
          <div style={{ width: "20%", height: "300px" }}>
            <Filter />
          </div>
          <div style={{ width: "80%" }} className="grid-container">
            {products?.map((item, index) => (
              <ProductItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
