import React from "react";
import { Upload, message } from "antd";
import type { UploadProps } from "antd";

interface Props {
  children: React.ReactNode;
  onPreviewFile: (path: string) => void;
  onChooseFile: (path: string, name: string) => void;
}

const UploadFile: React.FC<Props> = ({
  children,
  onChooseFile,
  onPreviewFile,
}) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    showUploadList: false,
    withCredentials: true,
    action: `${process.env.REACT_APP_UPLOAD_BASE_URL}/upload`,
    beforeUpload: (file) => {
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isLt2M) message.error("Image must smaller than 5MB!");

      return isLt2M;
    },
    onChange: (info) => {
      const { status, response } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        onChooseFile(response.id, info.file.name);

        const reader = new FileReader();
        reader.addEventListener("load", () =>
          onPreviewFile(reader.result as string)
        );
        reader.readAsDataURL(info.file.originFileObj as Blob);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return <Upload {...props}>{children}</Upload>;
};

export default UploadFile;
