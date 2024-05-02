import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { BASEURL } from "../../../api/BaseApi";
import { ToastContainer, toast } from "react-toastify";
import billRest from "../../../api/BillRest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [buy, setBuy] = useState([]);
  const [guest, setGuest] = useState(null);
  const [invalidFullName, setInValidFullName] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  let [sum, setSum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  function getCartfromLocalStorage() {
    const value = localStorage.getItem("cart");
    if (value === null || value === undefined) {
      return [];
    }
    return JSON.parse(value);
  }

  const [cart, setCart] = useState(getCartfromLocalStorage());
  function deleteCart(id) {
    const cartFilter = cart.filter((c) => c.cartId != id);
    setCart(cartFilter);
    localStorage.setItem("cart", JSON.stringify(cartFilter));
  }

  const handelBuy = (e) => {
    if (e.target.checked) {
      const dataCheck = cart.filter((c) => c.cartId == e.target.value);
      setBuy((prev) => [...prev, dataCheck[0]]);
      setSum((sum += dataCheck[0].product.price + dataCheck[0].quantity));
    } else {
      const dataUnCheck = cart.filter((c) => c.cartId == e.target.value);
      setBuy((prev) => prev.filter((c) => c.cartId != e.target.value));
      setSum((sum -= dataUnCheck[0].product.price * dataUnCheck[0].quantity));
    }
  };

  const showModal = () => {
    if (buy.length > 0) {
      setIsModalOpen(true);
      return;
    }
    toast("Bạn cần chọn sản phẩm để mua");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const buyProduct = async () => {
    const billId = Math.floor(Math.random() * 999999);
    if (user === null) {
      if (!guest.fullName) {
        setInValidFullName(true);
        return;
      }
      if (!guest.addressDetail) {
        setInvalidAddress(true);
        return;
      }
      const phoneNumberRegex = /^[0-9]{10}$/;
      if (!phoneNumberRegex.test(guest.phone)) {
        setInvalidPhone(true);
        return;
      }
      const bill = {
        billId,
        userId: null,
        fullName: guest?.fullName,
        address: guest?.addressDetail,
        phone: guest?.phone,
        sum,
      };
      await billRest.createBill(bill);
      const dataBuy = [];
      buy.forEach((data) => {
        dataBuy.push({
          name: data.product.title,
          price: data.product.price,
          quantity: data.quantity,
          image: data.product.image,
          size: data.size,
          color: data.color,
          billId,
          productId: data.product.pid,
        });
      });
      await billRest.createBuy(dataBuy);
      toast("Mua hàng thành công.");
      setIsModalOpen(false);
      setBuy([]);
      setSum(0);
      return;
    }
    try {
      const bill = {
        billId,
        userId: user?.userId,
        fullName: user?.firstName + user?.lastName,
        address: user?.addressDetail,
        phone: user?.phone,
        sum,
      };
      await billRest.createBill(bill);
      const dataBuy = [];
      buy.forEach((data) => {
        dataBuy.push({
          name: data.product.title,
          price: data.product.price,
          quantity: data.quantity,
          image: data.product.image,
          size: data.size,
          color: data.color,
          billId,
          productId: data.product.pid,
        });
      });
      await billRest.createBuy(dataBuy);
      toast("Mua hàng thành công.");
      setIsModalOpen(false);
      setBuy([]);
      setSum(0);
    } catch (error) {
      toast("Mua Hàng thất bại.");
    }
  };

  const navigate = useNavigate();

  const redirectBill = () => {
    if (user === null) {
      toast("Vui lòng cần đăng nhập ");
    } else {
      navigate("/myBill");
    }
  };

  const closeModalGuest = () => {
    setGuest(null);
    setIsModalOpen(false);
  };

  const handleInfoGuest = (e) => {
    const { name, value } = e.target;
    setGuest({
      ...guest,
      [name]: value,
    });
  };
  return (
    <div
      className="container mx-auto px-4 grid grid-cols-4 gap-4 "
      style={{ minHeight: "50vh" }}
    >
      <div className="col-span-3  p-4">
        <h3 className="text-red-500 text-4xl font-bold">Sản phẩm quan tâm</h3>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2"> </th>
              <th className="border px-4 py-2">Tên sản phẩm</th>
              <th className="border px-4 py-2">Ảnh</th>
              <th className="border px-4 py-2">Giá</th>
              <th className="border px-4 py-2">Màu sắc</th>
              <th className="border px-4 py-2">Kích cỡ </th>
              <th className="border px-4 py-2">Số lượng </th>
              <th className="border px-4 py-2">Xoa</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      name="cartCheck"
                      type="checkbox"
                      value={data?.cartId}
                      onChange={(e) => handelBuy(e)}
                    />
                  </td>
                  <td className="border px-4 py-2">{data?.product?.title}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={`${BASEURL}image/${data?.product?.image}`}
                      alt={data?.product?.title}
                      style={{ width: "50px" }}
                      className="block h-auto"
                    />
                  </td>
                  <td className="border px-4 py-2">{data?.product?.price}</td>
                  <td className="border px-4 py-2">{data?.color}</td>
                  <td className="border px-4 py-2">{data?.size}</td>
                  <td className="border px-4 py-2">{data?.quantity}</td>
                  <td className="border px-4 py-2">
                    <Button onClick={() => deleteCart(data.cartId)}>Xóa</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-span-1   bg-gray-300 p-4">
        <h2>Hóa đơn</h2>
        {buy.map((data, index) => {
          return (
            <div key={data?.cartId}>
              <h5>Sản Phẩm : {data?.product?.title}</h5>
              <h5>
                Giá : {data?.product?.price} x {data?.quantity}
              </h5>
            </div>
          );
        })}
        <div>{sum === 0 ? "" : sum}</div>
        <div className="grid">
          <Button type="primary" className="block" onClick={showModal}>
            Mua Hàng
          </Button>
        </div>
      </div>
      {user ? (
        <Modal
          title="Xác nhận mua hàng."
          open={isModalOpen}
          onOk={() => buyProduct()}
          onCancel={handleCancel}
          visible={isModalOpen}
        >
          <p>Bạn có muốn mua đơn hàng này không.</p>
        </Modal>
      ) : (
        <Modal
          footer={null}
          title="Thông tin đơn hàng."
          open={isModalOpen}
          visible={isModalOpen}
        >
          <form action="">
            <div className="flex gap-6 justify-between">
              <label htmlFor="">Họ và tên: </label>
              <input
                type="text"
                name="fullName"
                className="border block w-4/6"
                onChange={(e) => handleInfoGuest(e)}
              />
            </div>
            <div
              className="text-red-500 h-9 text-right"
              style={{ fontSize: "14px" }}
            >
              {invalidFullName ? "Họ và tên là bắt buộc." : ""}
            </div>
            <div className="flex gap-6  justify-between">
              <label htmlFor="">Địa chỉ </label>
              <input
                name="addressDetail"
                type="text"
                className="border block w-4/6"
                onChange={(e) => handleInfoGuest(e)}
              />
            </div>
            <div
              className="text-red-500 h-9 text-right"
              style={{ fontSize: "14px" }}
            >
              {invalidAddress ? "Địa chỉ là bắt buộc." : ""}
            </div>

            <div className="flex gap-6  justify-between">
              <label htmlFor="">Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                className="border block w-4/6"
                onChange={(e) => handleInfoGuest(e)}
              />
            </div>
            <div
              className="text-red-500 h-9 text-right"
              style={{ fontSize: "14px" }}
            >
              {invalidPhone ? "Số điện thoại không hợp lệ." : ""}
            </div>

            <div className="flex justify-around">
              <Button onClick={buyProduct}>Mua hàng</Button>
              <Button onClick={closeModalGuest}>Hủy bỏ</Button>
            </div>
          </form>
        </Modal>
      )}

      <ToastContainer />
      <div className="flex items-center mb-7">
        <Button onClick={redirectBill}>Hóa đơn của tôi</Button>
      </div>
    </div>
  );
}

export default Cart;
