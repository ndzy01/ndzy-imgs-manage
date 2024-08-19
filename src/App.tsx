import { useMount, useSetState, useSize } from 'ahooks';
import { Button, Popconfirm, Table, List, Image, Typography } from 'antd';
import type { TableProps } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useRef } from 'react';
import IUpload from './Upload';
import { service } from 'ndzy-utils';

const { Paragraph } = Typography;
const App = () => {
  const ContainerHeight = 800;
  const ref = useRef(null);
  const size = useSize(ref);
  const [s, setS] = useSetState<{ list: any[]; loading: boolean }>({ list: [], loading: false });

  const query = (params: any = {}) => {
    setS({ loading: true });
    service({ url: '/imgs', method: 'GET', params })
      .then((res: any) => {
        setS({
          list: res.data,
          loading: false,
        });
      })
      .catch(() => {
        setS({ loading: false });
      });
  };

  const del = (id: string) => {
    setS({ loading: true });
    service({ url: `/imgs/${id}`, method: 'DELETE' })
      .then(() => {
        query();
      })
      .catch(() => {
        setS({ loading: false });
      });
  };

  useMount(() => {
    query();
  });

  const columns: TableProps<any>['columns'] = [
    {
      title: '图片',
      dataIndex: 'url',
      width: 60,
      render(value) {
        return (
          <>
            <Paragraph copyable>{value}</Paragraph>
            <Image
              style={{ minWidth: 100, minHeight: 100, maxWidth: 100, maxHeight: 100, margin: '16px 32px' }}
              src={value}
            />
          </>
        );
      },
    },

    {
      title: '仓库',
      dataIndex: 'github',
      width: 120,
    },
    {
      title: '操作',
      width: 20,
      fixed: 'right',
      render: (_text, record: any) => (
        <Popconfirm title="删除将无法恢复,确定删除?" onConfirm={() => del(record.id)}>
          <Button type="link"> 删除</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div ref={ref} style={{ height: '100%', padding: 16 }}>
      <IUpload query={query} imgs={s.list} />

      {Number(size?.width) > 800 ? (
        <Table
          loading={s.loading}
          virtual
          columns={columns}
          scroll={{ x: 1200, y: 900 }}
          rowKey="id"
          dataSource={s.list}
          pagination={false}
          locale={{ emptyText: <div className="center">暂无图片</div> }}
        />
      ) : (
        <List loading={s.loading}>
          <VirtualList data={s.list} height={ContainerHeight} itemHeight={40} itemKey="id">
            {(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Popconfirm
                    title="删除将无法恢复,确定删除?"
                    onConfirm={() => del(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link"> 删除</Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <>
                      <Paragraph copyable>{item.url}</Paragraph>

                      <Image
                        style={{ minWidth: 100, minHeight: 100, maxWidth: 100, maxHeight: 100, margin: '16px 32px' }}
                        src={item.url}
                      />
                    </>
                  }
                  description={item.github}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      )}
    </div>
  );
};

export default App;
