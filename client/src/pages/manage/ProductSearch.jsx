import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseApi, { BASEURL } from "../../api/BaseApi";
import TableCustom from "../../custom/TableCustom";

function ProductSearch() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const p = await baseApi.get("http://localhost:8080/product/" + id);
        setProduct(p.data);
      } catch (err) {
        console.log("🚀 ~ fetchProduct ~ err:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div
        className="text-center align-middle flex flex-col justify-center"
        style={{ height: "60vh" }}
      >
        Not Found
      </div>
    );
  }

  return (
    <TableCustom col={col}>
      <tr key={product?.pid}>
        <td className="text-center">
          <input type="checkbox" value={product?.pid} name="pid" />
        </td>
        <td className="text-center">{product?.pid}</td>
        <td className="text-center">{product?.title}</td>
        <td className="text-center">{product?.price}</td>
        <td className="text-center">{product?.description}</td>
        <td className="text-center">
          <a href={`${BASEURL}/image/${product?.image}`}>{product?.image}</a>
        </td>
        <td className="text-center">
          {product?.size.map((c) => {
            return (
              <span className="mr-2 bg-btn-filter p-2 rounded-md">
                {c.name}
              </span>
            );
          })}
        </td>
        <td className="text-center">
          {product?.color.map((c) => {
            return (
              <span className="mr-2 bg-btn-filter p-2 rounded-md">
                {c.name}
              </span>
            );
          })}
        </td>
        <td className="text-center">
          {product?.active ? "Đang bán" : "Ngừng bán"}
        </td>
      </tr>
    </TableCustom>
  );
}

export default ProductSearch;

const col = [
  "MSV",
  "Tên sản phẩm",
  "Giá",
  "Mô tả",
  "Ảnh",
  "Kích cỡ",
  "Màu sắc",
  "Đang bán",
];
