import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import billRest from "../../../api/BillRest";
import BillItem from "../../../components/layout/components/Billtem";
import { DeleteOutlined } from "@ant-design/icons";

function MyBill() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bills, setBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billDelete, setBillDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await billRest.getBillByUserId({ userId: user.userId });
        setBills(data);
      } catch (error) {}
    };
    fetchData();
  }, [user.userId]);

  const redirectToCart = () => {
    navigate("/cart");
  };

  const deleteBill = async (id) => {
    showModal();
    setBillDelete(id);
  };
  if (user === null) {
    return (
      <div className="flex justify-center" style={{ minHeight: "50vh" }}>
        <h1>Bạn chưa đang nhập</h1>
      </div>
    );
  }

  const deleteBillAtc = async () => {
    try {
      await billRest.delete(billDelete);
      const data = await billRest.getBillByUserId({ userId: user.userId });
      setBills(data);
      handleCancel();
    } catch (error) {
      console.log("🚀 ~ deleteBillAtc ~ error:", error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center" style={{ minHeight: "50vh" }}>
      <ToastContainer />
      <div>
        <div className="container mx-auto p-4 grid grid-cols-4 gap-5">
          {bills.map((item) => {
            const delId = item?.bill?.id;
            return (
              <div
                key={item?.bill?.id}
                className="bg-white shadow-md rounded-md p-6 relative"
              >
                <span
                  onClick={() => deleteBill(delId)}
                  className="absolute right-4 top-4"
                >
                  <DeleteOutlined />
                </span>
                <div>
                  <div className="flex">
                    <p className="font-bold">MHD:</p>
                    <p>{item?.bill?.id}</p>
                  </div>

                  {item?.buyList?.map((data) => {
                    return (
                      <div key={data?.id}>
                        <div>
                          <p className="font-bold">Tên sản phẩm:</p>
                          <p>{data.productName}</p>
                        </div>
                        <div className="flex">
                          <p className="font-bold">Số lượng:</p>
                          <p>{data.quantity}</p>
                        </div>
                        <div className="flex">
                          <p className="font-bold">Giá:</p>
                          <p>{data.price}</p>
                        </div>
                        <br />
                      </div>
                    );
                  })}
                  <div className="flex">
                    <p className="font-bold">Tổng:</p>
                    <p>{item?.bill?.sum}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-end">
        <Button onClick={redirectToCart}>Giỏ hàng của tôi</Button>
      </div>
      <Modal
        title="Xác nhận xóa đơn hàng."
        open={isModalOpen}
        onOk={() => deleteBillAtc()}
        onCancel={handleCancel}
        visible={isModalOpen}
      >
        <p>Bạn có muốn huy đơn hàng này không.</p>
      </Modal>
    </div>
  );
}

export default MyBill;
