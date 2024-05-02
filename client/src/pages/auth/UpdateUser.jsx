import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import authRest from "../../api/AuthRest";
import { update } from "../../redux/AuthSlice";

function UpdateUser() {
  const { userId } = useParams();
  // const [file, setFile] = useState(null);
  const [infUser, setInfUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await authRest.findByUser(userId);
        setInfUser(data);
      } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
      }
    };
    getUser(userId);
  }, [userId]);

  const handeInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfUser({ ...infUser, [name]: value });
  };

  const updateUser = async () => {
    try {
      const data = await authRest.update(infUser);
      dispatch(update(data));
      toast("Cập nhật thông tin thành công.");
    } catch (error) {
      console.log("🚀 ~ updateUser ~ error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Cập nhật thông tin</h2>
      <ToastContainer />

      <div className="mb-4">
        <label className="block text-gray-700">Họ:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          onChange={(e) => handeInfo(e)}
          value={infUser?.firstName}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tên:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          onChange={(e) => handeInfo(e)}
          value={infUser?.lastName}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="addressDetail"
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          onChange={(e) => handeInfo(e)}
          value={infUser?.addressDetail}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Số diện thoại:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Format: 123-456-7890"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md"
          onChange={(e) => handeInfo(e)}
          value={infUser?.phone}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Ảnh:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => updateUser()}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateUser;
