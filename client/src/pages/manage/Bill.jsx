import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import billRest from "../../api/BillRest";

function Bill() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bills, setBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billDelete, setBillDelete] = useState(null);
  const [keySearch, setKeySearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await billRest.getBills();
        setBills(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

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
      const data = await billRest.getBills();
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
  const searchBill = async () => {
    if (keySearch.length === 0) {
      return;
    } else {
      const data = await billRest.getBillByCus(keySearch);
      setBills(data);
    }
  };

  const exportBill = async (billId) => {
    try {
      const response = await billRest.export(billId);
      const file = new Blob([response], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = new Date() + ".pdf";
      link.click();
    } catch (error) {
      console.error("Error exporting bill:", error);
    }
  };

  const dagiao = async (id) => {
    try {
      await billRest.dagiao(id);
      const data = await billRest.getBills();
      setBills(data);
    } catch (error) {}
  };
  return (
    <div className="block">
      <div className=" flex float-end gap-3 mt-4">
        <Input
          type="text"
          placeholder="Tìm theo tên khách hàng"
          onChange={(e) => setKeySearch(e.target.value)}
        />
        <Button onClick={searchBill}>
          <SearchOutlined />
        </Button>
      </div>
      <br />
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
                    <div className="flex">
                      <p className="font-bold">Khách hàng:</p>
                      <p>{item?.bill?.fullName}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold">Số điện thoại:</p>
                      <p>{item?.bill?.phone}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold">Địa chỉ:</p>
                      <p>{item?.bill?.address}</p>
                    </div>

                    <br />
                    <h2>Danh sách sản phẩm</h2>
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
                      <p className="font-bold">Ngày đặt:</p>
                      <p>
                        {item.bill.createdAt
                          ? `${new Date(item.bill.createdAt).getDate()}/${
                              new Date(item.bill.createdAt).getMonth() + 1
                            }/${new Date(item.bill.createdAt)
                              .getFullYear()
                              .toString()
                              .slice(2)}`
                          : ""}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-bold">Trạng thái:</p>
                      <p>
                        {item?.bill?.received
                          ? "Đã giao xong"
                          : "Chưa giao xong"}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-bold">Tổng:</p>
                      <p>{item?.bill?.sum}</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button onClick={() => exportBill(delId)}>
                      Xuất hóa đơn
                    </Button>
                    <Button onClick={() => dagiao(delId)}>Đã giao xong</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal
          title="Xác nhận xóa đơn hàng."
          open={isModalOpen}
          onOk={() => deleteBillAtc()}
          onCancel={handleCancel}
          visible={isModalOpen}
        >
          <p>Bạn có muốn xoa đơn hàng này không.</p>
        </Modal>
      </div>
    </div>
  );
}

export default Bill;
