import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authRest from "../../api/AuthRest";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthSlice";
function Auth() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    if (register) {
      try {
        await authRest.register(values);
        toast("Đăng kí thành công.");
        setRegister(false);
      } catch (error) {
        toast("Tài khoản đã tồn tại rồi.");
      }
    } else {
      try {
        const user = await authRest.login(values);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
        navigate("/");
      } catch (error) {
        toast(
          "Thông tin tài khoản hoặc mật khẩu không chính xác hoặc đã bị khóa"
        );
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wrapper" style={{ height: "50vh" }}>
      <ToastContainer />
      <div className="container">
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tài khoản.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu  từ 6 ký tự trở lên",
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {register ? (
            <>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Xác nhận mật khẩu phải trùng với mật khẩu.")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Họ"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền họ.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Dịa chỉ"
                name="addressDetail"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          ) : (
            <></>
          )}

          <div className=" flex  justify-center ">
            <Form.Item>
              {register ? (
                <>
                  <Button htmlType="submit" className="mr-3">
                    Đăng ký
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setRegister(false)}
                    className="mr-3"
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                <>
                  <Button htmlType="submit" className="mr-3">
                    Đăng nhập
                  </Button>
                </>
              )}
            </Form.Item>
          </div>
          {register ? (
            <></>
          ) : (
            <div className=" flex  justify-center ">
              <p
                className="inline text-blue-400 cursor-pointer"
                onClick={() => setRegister(true)}
              >
                Tạo một tài khoản..
              </p>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Auth;
