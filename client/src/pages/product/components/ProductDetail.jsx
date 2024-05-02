import { Button, Col, Divider, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseApi, { BASEURL } from "../../../api/BaseApi";
import billRest from "../../../api/BillRest";

function ProductDetail() {
  function getCartfromLocalStorage() {
    const value = localStorage.getItem("cart");
    if (value === null || value === undefined) {
      return [];
    }
    return JSON.parse(value);
  }

  const [cart, setCart] = useState(getCartfromLocalStorage());
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("red");
  const [selectColor, setSelectColor] = useState(0);
  const [size, setSize] = useState("SM");
  const [selectSize, setSelectSize] = useState(0);
  const [product, setProduct] = useState({});
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const p = await baseApi.get(`http://localhost:8080/product/getById`, {
          params: {
            id,
          },
        });
        setProduct(p.data);
      } catch (err) {
        console.log("🚀 ~ fetchProduct ~ err:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQty = (otp) => {
    if (otp === "-" && qty > 1) {
      setQty(qty - 1);
    } else if (otp === "+") {
      setQty(qty + 1);
    }
  };

  const handleSelectSize = (index, name) => {
    setSelectSize(index);
    setSize(name);
  };
  const handleSelectColor = (index, name) => {
    setSelectColor(index);
    setColor(name);
  };

  const buyProduct = async () => {
    if (!user?.userId) {
      alert("Bạn cần đăng nhập");
      return;
    }
    if (!user?.phone || !user?.addressDetail) {
      alert("Bạn cần cập nhật sdt và dịa chỉ.");
      return;
    }
    try {
      await billRest.create({
        product,
        quantity: qty,
        account: user,
        color,
        size,
      });
      toast("Mua hàng thành công");
      setIsModalOpen(false);
    } catch (error) {
      toast("Error server");
    }
  };

  function addToCart() {
    const cartId = Math.floor(Math.random() * 1000000000);
    const cartItem = {
      cartId,
      product,
      quantity: qty,
      account: user,
      color,
      size,
    };
    const dataCart = getCartfromLocalStorage();
    if (dataCart.length === 0) {
      localStorage.setItem("cart", JSON.stringify([cartItem]));
    } else {
      dataCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(dataCart));
    }
    toast("Đã thêm sản phẩm vào giỏ hàng");
  }
  return (
    <div className="mx-7 my-auto p-4">
      <ToastContainer />
      <div>
        <Row>
          <Col className="flex justify-center" xs={24} sm={12} md={12}>
            <img
              src={`${BASEURL}image/${product.image}`}
              alt="anh"
              className="h-[300px] w-auto"
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Typography>{product.title}</Typography>
            <Typography>{product.description}</Typography>
            <div className="flex gap-5">
              {product?.color?.map((color, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSelectColor(index, color.name);
                  }}
                  className={`w-[30px] h-[30px] `}
                  style={{
                    backgroundColor: color.name,
                    borderRadius: "50%",
                    border: `${
                      index === selectColor ? "3px solid #333" : "none"
                    }`,
                  }}
                ></li>
              ))}
            </div>
            <div className="flex gap-5">
              {product?.size?.map((s, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSelectSize(index, s.name);
                  }}
                  className={`w-[30px] h-[30px] `}
                  style={{
                    backgroundColor: s.name,
                    border: `${
                      index === selectSize ? "1px solid #333" : "none"
                    }`,
                  }}
                >
                  {s.name}
                </li>
              ))}
            </div>
            <Typography>Gia : {product.price} vnd</Typography>
            <div className="btn_group mb-3">
              <br />
              <span
                className="bg-btn-filter px-3 py-2 rounded-md"
                onClick={() => handleQty("-")}
              >
                -
              </span>
              <span className="mx-3">{qty}</span>
              <span
                className="bg-btn-filter px-3 py-2 rounded-md"
                onClick={() => handleQty("+")}
              >
                +
              </span>
            </div>
            <div>
              <div className="mb-2">Total: {qty * product.price}vnd</div>
            </div>

            <Button onClick={addToCart}>Thêm vào giỏ hàng</Button>

            {/* <Button onClick={showModal}>Thêm vào giỏ hàng</Button>
            <Modal
              title="Xác nhận mua hàng"
              open={isModalOpen}
              onOk={buyProduct}
              onCancel={handleCancel}
              visible={isModalOpen}
            >
              <p>Bạn có muốn mua đơn hàng này không ?</p>
            </Modal> */}
          </Col>
        </Row>
        <Divider orientation="left" className="comment" plain={false}>
          <b>Comment</b>
        </Divider>
      </div>
    </div>
  );
}

export default ProductDetail;
