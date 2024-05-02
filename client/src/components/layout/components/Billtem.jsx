import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";

function BillItem({
  item,
  handleCancel,
  isModalOpen,
  deleteBill,
  showModal,
  setBillDelete,
}) {
  return (
    <div
      key={item?.bill?.id}
      className="bg-white shadow-md rounded-md p-6 relative"
    >
      <span onClick={showModal} className="absolute right-4 top-4">
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
}

export default BillItem;
