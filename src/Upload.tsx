import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';

const IUpload = ({ query }: any) => {
  const handleChange: UploadProps['onChange'] = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      query();
    }
  };

  const uploadProps: UploadProps = {
    action: 'https://ndzy-server.vercel.app/imgs/upload',
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: handleChange,
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary">上传</Button>
    </Upload>
  );
};

export default IUpload;
