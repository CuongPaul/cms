import {
  Flex,
  Card,
  Form,
  Menu,
  Modal,
  Input,
  Space,
  Avatar,
  Button,
  message,
  Typography,
} from "antd";
import moment from "moment";
import {
  ProCard,
  ProTable,
  ProColumns,
  ProDescriptions,
} from "@ant-design/pro-components";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, Fragment, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./index.scss";
import { AppContext } from "../../contexts";
import { UploadFile } from "../../components";
import { fakeApi, generateColor } from "../../utils";
import { IAccountState } from "../../contexts/account";

const findAllSessionsFakeData = {
  itemCount: 5,
  data: [
    {
      ip: "118.70.236.175",
      agent: "Chrome - Linux",
      location: "Hanoi, Hanoi, Vietnam",
      createdAt: "2024-11-27T04:51:31.361Z",
      updatedAt: "2024-11-27T08:10:35.230Z",
      id: "7fbd825e-7c0a-4d10-bd6b-7ac9c3f1d213",
      location_flag:
        "https://cdn.ipinfo.io/static/images/countries-flags/VN.svg",
    },
    {
      agent: "Chrome - Linux",
      ip: "118.70.236.175",
      location: "Hanoi, Hanoi, Vietnam",
      createdAt: "2024-11-27T07:08:06.936Z",
      updatedAt: "2024-11-27T07:08:06.936Z",
      id: "635f42e6-75dd-4ba3-bcae-ac371ba47bcb",
      location_flag:
        "https://cdn.ipinfo.io/static/images/countries-flags/VN.svg",
    },
    {
      ip: "118.70.236.175",
      agent: "Chrome - Linux",
      location: "Hanoi, Hanoi, Vietnam",
      createdAt: "2024-11-27T06:57:55.033Z",
      updatedAt: "2024-11-27T06:57:55.033Z",
      id: "bb8e5538-629a-40bb-a8c9-82eb7af34344",
      location_flag:
        "https://cdn.ipinfo.io/static/images/countries-flags/VN.svg",
    },
    {
      ip: "118.70.236.175",
      agent: "Chrome - Linux",
      location: "Hanoi, Hanoi, Vietnam",
      createdAt: "2024-11-27T06:47:28.668Z",
      updatedAt: "2024-11-27T06:47:28.668Z",
      id: "c4344d19-edec-49e3-8123-32313e86a4fc",
      location_flag:
        "https://cdn.ipinfo.io/static/images/countries-flags/VN.svg",
    },
    {
      ip: "118.70.236.175",
      agent: "Chrome - Linux",
      location: "Hanoi, Hanoi, Vietnam",
      createdAt: "2024-11-27T06:32:14.017Z",
      updatedAt: "2024-11-27T06:32:14.017Z",
      id: "d201d68d-6ff7-469a-98d0-78d664119bf6",
      location_flag:
        "https://cdn.ipinfo.io/static/images/countries-flags/VN.svg",
    },
  ],
};

const Account = () => {
  const items = [
    { key: "overview", label: "Overview" },
    { key: "security", label: "Security" },
    { key: "settings", label: "Settings" },
  ];

  const { accountState } = useContext(AppContext);

  const [selectedItem, setSelectedItem] = useState("overview");

  return (
    <div className="account-container">
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <div
          className="account__header-background"
          style={{
            backgroundImage:
              "url('https://mega.com.vn/media/news/2037_hinh_nen_thien_nhien_4k__28_.jpg')",
          }}
        />
        <div className="account__header-avatar">
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Card.Meta
              avatar={
                accountState.avatar ? (
                  <Avatar
                    size={60}
                    shape="square"
                    src={`${process.env.REACT_APP_FILE_BASE_URL}/${accountState.avatar}`}
                  />
                ) : (
                  <Avatar
                    size={60}
                    shape="square"
                    style={{
                      borderColor: "transparent",
                      backgroundColor: generateColor(accountState.name),
                    }}
                  >
                    {accountState.name[0]?.toUpperCase()}
                  </Avatar>
                )
              }
            />
          </Card>
        </div>
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={[selectedItem]}
          onClick={(e) => setSelectedItem(e.key)}
        />
        {selectedItem === "overview" ? (
          <Overview account={accountState} />
        ) : null}
        {selectedItem === "security" ? <Security /> : null}
        {selectedItem === "settings" ? <Settings /> : null}
      </Space>
    </div>
  );
};

const Overview = ({ account }: { account: IAccountState }) => {
  return (
    <ProCard>
      <ProDescriptions>
        <ProDescriptions.Item label="Email" span={3}>
          {account.email}
        </ProDescriptions.Item>
      </ProDescriptions>
    </ProCard>
  );
};

const Security = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useState({ page: 1, pageSize: 20 });

  const { data, isLoading } = useQuery({
    queryKey: ["findAllSessions", query],
    queryFn: () =>
      fakeApi(query, { responseData: findAllSessionsFakeData }) as any,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: fakeApi,
    onSuccess: () => {
      setIsOpenModal(false);
      message.success("Success");
      queryClient.invalidateQueries({ queryKey: ["findAllSession"] });
    },
  });

  const handleClickOk = (values: { ids: string[]; password: string }): void => {
    if (selectedRows.length) mutate({ ...values, ids: selectedRows });
  };

  const columns: Array<ProColumns> = [
    {
      title: "Location",
      dataIndex: "location",
      render: (_text, record) => (
        <Space wrap>
          <Avatar src={record.location_flag} />
          <Typography.Text>{record.location}</Typography.Text>
        </Space>
      ),
    },
    {
      search: false,
      title: "Agent",
      dataIndex: "agent",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      search: false,
      title: "IP",
      dataIndex: "ip",
    },
    {
      search: false,
      title: "Sign in at",
      valueType: "dateTime",
      dataIndex: "createdAt",
    },
    {
      search: false,
      title: "Last activity",
      dataIndex: "updatedAt",
      render: (_text, record) => moment(record.updatedAt).fromNow(),
    },
    {
      hideInTable: true,
      title: "Sign in time",
      valueType: "dateRange",
      search: { transform: (value) => ({ to: value[1], from: value[0] }) },
    },
  ];

  return (
    <Fragment>
      <ProTable
        rowKey="id"
        columns={columns}
        loading={isLoading}
        scroll={{ x: "auto" }}
        dataSource={data?.data}
        toolbar={{ settings: [] }}
        search={{ layout: "vertical" }}
        rowSelection={{ selections: undefined }}
        tableAlertOptionRender={() => {
          return (
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => setIsOpenModal(true)}
            >
              Remove
            </Button>
          );
        }}
        onSubmit={(values) => {
          setQuery({ ...values, page: 1, pageSize: query.pageSize });
        }}
        pagination={{
          current: query.page,
          total: data?.itemCount,
          pageSize: query.pageSize,
          onChange: (page, pageSize) => setQuery({ page, pageSize }),
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          setSelectedRows(selectedRowKeys as []);

          return (
            <span>
              Selected {selectedRowKeys.length} item
              {/* eslint-disable-next-line */}
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                Cancel
              </a>
            </span>
          );
        }}
      />
      <Modal
        centered
        open={isOpenModal}
        title="Remove session"
        confirmLoading={isPending}
        onCancel={() => setIsOpenModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => handleClickOk(values))
            .catch(() => {});
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

const Settings = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [imageUrl, setImageUrl] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: fakeApi,
    onSuccess: () => {
      message.success("Success");
      queryClient.invalidateQueries({ queryKey: ["getAccount"] });
    },
  });

  const onChooseFile = (id: string) => {
    form.setFieldValue("avatar", id);
  };

  const onPreviewFile = (filePath: string) => {
    setImageUrl(filePath);
  };

  return (
    <ProCard>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={(values) => mutate(values)}
      >
        <Form.Item
          name="avatar"
          label="Avatar"
          style={{ cursor: "pointer" }}
          rules={[{ required: true, message: "Avatar is required" }]}
        >
          <UploadFile onChooseFile={onChooseFile} onPreviewFile={onPreviewFile}>
            <Avatar alt="" size={100} shape="square" src={imageUrl} />
          </UploadFile>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Flex justify="flex-end">
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </ProCard>
  );
};

export default Account;
