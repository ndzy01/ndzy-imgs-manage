import { Button, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';

const IUpload = ({ query }: any) => {
  const [s, setS] = useState('');

  const handleChange: UploadProps['onChange'] = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      query();
      setS('');
    }
  };

  const token = localStorage.getItem('token');
  const uploadProps: UploadProps = {
    action: 'https://ndzy-s.vercel.app/imgs',
    name: 'file',
    headers: {
      authorization: 'Basic' + ' ' + token,
    },
    onChange: handleChange,
    data: { name: s },
  };

  return (
    <Input
      style={{ marginBottom: 16 }}
      placeholder="请输入文件名称 eg: xxx.png"
      value={s}
      onChange={(e) => setS(e.target.value)}
      addonAfter={
        <Upload {...uploadProps} disabled={!s}>
          <Button type="primary" disabled={!s}>
            上传
          </Button>
        </Upload>
      }
    />
  );
};

export default IUpload;
