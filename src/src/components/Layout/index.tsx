import {
  UserOutlined,
  FileTextFilled,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { useEffect, useContext } from "react";
import { ProLayout } from "@ant-design/pro-components";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { AppContext } from "../../contexts";
import { signOut } from "../../services/auth";
import { ACCOUNT_ACTION } from "../../contexts/account";

const Layout = () => {
  const navigate = useNavigate();
  const { accountState, accountDispatch } = useContext(AppContext);

  useEffect(() => {
    const account = {
      id: "annv",
      name: "Nguyen Van An",
      email: "annv@gmail.com",
    };

    accountDispatch({ payload: account, type: ACCOUNT_ACTION.UPDATE });
  }, [accountDispatch]);

  return (
    <div className="layout-container">
      <ProLayout
        layout="mix"
        title="Ebook"
        style={{ minHeight: "100vh" }}
        logo={`${window.location.origin}/images/ebook-icon.png`}
        route={{
          routes: [
            {
              name: "Home",
              path: "/home",
              icon: <DashboardOutlined />,
            },
            {
              name: "Product manager",
              path: "/product-manager",
              icon: <FileTextFilled />,
              routes: [
                { name: "Product", path: "/product" },
                { name: "Category", path: "/category" },
              ],
            },
          ],
        }}
        menuItemRender={(item, dom) => (
          <div onClick={() => navigate(item.path ?? "")}>{dom}</div>
        )}
        avatarProps={{
          title: accountState.name,
          render: (_props: any, dom: any) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "account",
                      icon: <UserOutlined />,
                      label: <Link to="/account">Account</Link>,
                    },
                    {
                      type: "divider",
                    },
                    {
                      danger: true,
                      key: "sign-out",
                      onClick: signOut,
                      label: "Sign out",
                      icon: <LogoutOutlined />,
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
          src: `${process.env.REACT_APP_FILE_BASE_URL}/${accountState.avatar}`,
        }}
        bgLayoutImgList={[
          {
            left: 0,
            bottom: 0,
            width: "331px",
            src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
          },
        ]}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default Layout;
