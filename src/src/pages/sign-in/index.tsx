import { Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";

import { signIn } from "../../services/auth";

const SignIn = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      if (res.accessToken) {
        window.location.href = "/home";
        localStorage.setItem("accessToken", res.accessToken);
      }
    },
  });

  return (
    <ProForm
      autoComplete="off"
      submitter={{
        render: () => (
          <Button block type="primary" htmlType="submit" loading={isPending}>
            Sign In
          </Button>
        ),
      }}
      onFinish={(values: { email: string; password: string }) => mutate(values)}
    >
      <ProFormText
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Email is not valid" },
        ]}
        fieldProps={{ prefix: <MailOutlined className={"prefixIcon"} /> }}
      />
      <ProFormText.Password
        name="password"
        label="Password"
        fieldProps={{
          prefix: <LockOutlined className={"prefixIcon"} />,
        }}
        rules={[{ required: true, message: "Password is required" }]}
      />
    </ProForm>
  );
};

export default SignIn;
