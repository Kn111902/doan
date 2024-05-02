import React from "react";
import CustomLink from "../Link/CustomLink";
import { managementMenu } from "../layout/components/MenuList";
import { Avatar, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const menu = (
  <Menu
    items={[
      {
        label: <Link to="/">Quay lại</Link>,
        key: "0",
      },
    ]}
  />
);

function ManagerLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="flex justify-between p-5 border-b-red-100 border-b-2 items-center pr-10 ">
        <nav className="flex justify-center mt-6">
          <ul className="flex justify-between w-[500px] mb-10 ">
            {managementMenu.map((link, index) => {
              return (
                <CustomLink to={`/management/${link.to}`} key={index}>
                  {link.displayName}
                </CustomLink>
              );
            })}
          </ul>
        </nav>
        <div>
          {user ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <span>
                <Avatar size={"small"} />
              </span>
            </Dropdown>
          ) : null}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ManagerLayout;
