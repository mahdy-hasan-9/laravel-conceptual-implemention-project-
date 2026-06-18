import { useEffect, useState } from 'react'
import TableTitle from './TableTitle'
import TableHeader from './TableHeader'
import { Pagination, Table, Spin } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons';
import AddDrawer from '../Drawer/AddDrawer';
import { getStudentList } from '../../services/studentService';
import { useQuery } from '@tanstack/react-query';
import { columns } from './studentTableColumn';
import EditDrawer from '../Drawer/EditDrawer';

const itemRender = (_, type, originalElement) => {
  return type === "prev" ? (
    <DoubleLeftOutlined />
  ) : type === 'next' ? (
    <DoubleRightOutlined />
  ) : (originalElement)
}

const StudentTable = () => {
  const [columnInfo, setColumnsInfo] = useState(columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [search , setSearch] = useState("") ; 


  const [filters, setFilters] = useState({
    class_id: '',
    activities: [],
    books: [],
  });

  const handleChangeColumns = (cols) => {
    setColumnsInfo(cols)
  }


  const handleResetFilters = () => {
    setFilters({
      class_id: '',
      activities: [],
      books: [],
    });
    setCurrentPage(1); 
  };

  
  console.log(search);
  


  const { isPending, isFetching, isSuccess, isError, data, error } = useQuery({
    queryKey: ['students', currentPage, pageSize, filters],
    queryFn: () => getStudentList({
      page: currentPage,
      per_page: pageSize,
      class_id: filters.class_id || null,
      activities: filters.activities.length > 0 ? filters.activities.join(',') : null,
      books: filters.books.length > 0 ? filters.books.join(',') : null,
    }),
    placeholderData: (previousData) => previousData,
  })


  useEffect(() => {
    setCurrentPage(1);
  }, [filters , handleResetFilters]) 



  if (isPending) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <Spin size="large" description="Loading students..." />
      </div>
    )
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
  }

  const handlePaginationChange = (page, size) => {
    const newPage = size !== pageSize ? 1 : page;
    setCurrentPage(newPage);
    setPageSize(size);
  };


  return (
    <div style={{ width: '100%' }}>
      <div>
        <TableTitle />
        <TableHeader setSearch={setSearch} columnInfo={columnInfo} handleChangeColumns={handleChangeColumns} filters={filters} setFilters={setFilters} handleResetFilters={handleResetFilters}/>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table
            rowKey="id"
            rowSelection={{ type: "checkbox" }}
            dataSource={data?.data || []}
            columns={columnInfo}
            pagination={false}
            scroll={{ x: 'max-content' }}
            size="small"
            loading={isFetching}
          />
        </div>

        <div style={{
          marginTop: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: 8
        }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data?.total || 0}
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            itemRender={itemRender}
            responsive={true}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          />
        </div>
      </div>
      <AddDrawer />
      <EditDrawer />
    </div>
  );
};

export default StudentTable;