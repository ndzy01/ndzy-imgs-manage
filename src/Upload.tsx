import { Button, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';

const IUpload = ({ query }: any) => {
  const [s, setS] = useState('ndzy');

  const handleChange: UploadProps['onChange'] = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      query();
      setS('ndzy');
    }
  };

  const token = localStorage.getItem('token');
  const uploadProps: UploadProps = {
    action: 'https://ndzy-service-89589-7-1307521321.sh.run.tcloudbase.com/imgs',
    name: 'file',
    headers: {
      authorization: 'Basic' + ' ' + token,
    },
    onChange: handleChange,
    data: { name: s },
  };

  return (
    <>
      <Input value={s} onChange={(e) => setS(e.target.value)} />
      <Upload {...uploadProps} disabled={s === 'ndzy' || !s}>
        <Button type="primary" disabled={s === 'ndzy' || !s}>
          上传
        </Button>
      </Upload>
    </>
  );
};

export default IUpload;
