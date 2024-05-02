import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import TableCustom from "../../custom/TableCustom";
import { getUserList, searchCusAct } from "../../redux/userAction";
import authRest from "../../api/AuthRest";

function Users() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const [listCusSelect, setListCusSelect] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const limit = 16;
  const { userList, count, userSearch, loading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList({ limit, page: currentPage - 1 }));
  }, [dispatch, currentPage]);

  const changePage = (p) => {
    setCurrentPage(p);
  };
  const searchCus = () => {
    dispatch(
      searchCusAct({ page: 0, limit: 100, name: keyword.toLowerCase() })
    );
  };
  const lockAccount = async () => {
    try {
      const data = await authRest.lock(listCusSelect);
      toast(data);
      dispatch(getUserList({ limit, page: currentPage - 1 }));
      setIsModalOpen(false);
      setListCusSelect([]);
    } catch (error) {}
  };

  const selectCus = (e) => {
    const data = e.target.value;
    if (listCusSelect.includes(data)) {
      const updatedList = listCusSelect.filter((item) => item !== data);
      setListCusSelect(updatedList);
    } else {
      setListCusSelect([...listCusSelect, data]);
    }
  };

  if (!user?.sellers) {
    return (
      <div
        className="text-center align-middle flex flex-col justify-center"
        style={{ height: "60vh" }}
      >
        <h3 className="font-bold text-yellow-yody text-3xl">
          Bạn không có quyền truy cập trang này.
        </h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{ minHeight: "50vh" }}
        className="flex flex-col justify-center items-center text-center m-auto"
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }
  return (
    <div className="container m-auto">
      <Modal
        title="Xác nhận xóa đơn hàng."
        open={isModalOpen}
        onOk={lockAccount}
        onCancel={handleCancel}
        visible={isModalOpen}
      >
        <p>Bạn có muốn Khóa tài khoản này không.</p>
      </Modal>
      <ToastContainer />
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2">
          <Button
            disabled={listCusSelect.length > 0 ? false : true}
            onClick={showModal}
          >
            Khóa tài khoản
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search customer"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="items-center" onClick={searchCus}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
      {/* <input type="file" value={file}  />
      <Button /> */}

      <TableCustom col={col}>
        {userSearch.length > 0
          ? userSearch.map((b) => {
              return (
                <tr key={b.userId}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      value={b.userId}
                      onChange={(e) => selectCus(e)}
                    />
                  </td>
                  <td className="text-center">{b.firstName + b.lastName}</td>
                  <td className="text-center">{b.phone}</td>
                  <td className="text-center">{b.addressDetail}</td>
                  <td className="text-center">{b.active ? "Mở" : "Đã khóa"}</td>
                </tr>
              );
            })
          : userList.map((b) => {
              return (
                <tr key={b.userId}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      value={b.userId}
                      onChange={(e) => selectCus(e)}
                    />
                  </td>
                  <td className="text-center">{b.firstName + b.lastName}</td>
                  <td className="text-center">{b.phone}</td>
                  <td className="text-center">{b.addressDetail}</td>
                  <td className="text-center">{b.active ? "Mở" : "Đã khóa"}</td>
                </tr>
              );
            })}
      </TableCustom>
      {userSearch.length === 0 ? (
        <div className="text-center mt-4">
          <Pagination
            total={count}
            pageSize={limit}
            current={currentPage}
            onChange={(currentPage) => changePage(currentPage)}
          />
        </div>
      ) : null}
    </div>
  );
}
const col = ["Họ và tên ", "Số điện thoại", "Địa chỉ", "Trạng thái"];

export default Users;
