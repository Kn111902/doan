import React from "react";
import { useDispatch } from "react-redux";
import { getProductByPrice } from "../redux/productAction";

const Filter = () => {
  const priceRange = [
    {
      title: "Nhỏ hơn 100.000đ",
      value: [0, 100000],
    },
    {
      title: "Từ 100.000đ - 200.000đ",
      value: [100000, 200000],
    },
    {
      title: "Từ 200.000đ - 350.000đ",
      value: [200000, 350000],
    },
    {
      title: "Từ 350.000đ - 500.000đ",
      value: [350000, 500000],
    },
    {
      title: "Từ 500.000đ - 700.000đ",
      value: [500000, 700000],
    },
    {
      title: "Lớn hơn 700.000đ",
      value: [700000, 200000000],
    },
  ];

  const dispatch = useDispatch();

  const filterByPrice = (price) => {
    dispatch(getProductByPrice(price));
  };
  return (
    <div className="pr-12">
      <div>
        <div className="flex justify-between">
          <h4>Khoảng giá (VNĐ)</h4>
        </div>
        {priceRange.map((data, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <input
                type="radio"
                name="price"
                value={data.value}
                onChange={() => {
                  filterByPrice(data.value);
                }}
              />
              <p>{data.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Filter;
