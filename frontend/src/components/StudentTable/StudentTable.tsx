const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    render: (text: string) => <p className='capitalize color-slate-700'>{text}</p>
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    key: 'image',
    align: 'center',
    render: (image_url: string) => {
      if (!image_url) {
        return <DefaultImage />;
      }

      const fullUrl = image_url.startsWith('http')
        ? image_url
        :`${import.meta.env.VITE_API_URL}/storage/${image_url}`;

      return (
        <img
          src={fullUrl}
          alt="Student"
          style={{
            margin: '0 auto',
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
      );
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    width: 100,
    // hidden : true , 
  },
  {
    title: 'Class',
    dataIndex: 'student_class',
    key: 'class',
    align: 'center',
    render: (studentClass: any) => studentClass?.name || '-'
  },
  {
    title: 'Activity',
    dataIndex: 'activities',
    key: 'activity',
    align: 'center',
    render: (activities: any[]) => {
      if (!activities || activities.length === 0) return '-';
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
          {activities.map((activity) => (
            <span key={activity.id} style={{
              textAlign: 'center',
              background: '#f0f0f0',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {activity.name}
            </span>
          ))}
        </div>
      );
    }
  },
  {
    title: 'Books',
    dataIndex: 'books',
    key: 'books',
    align: 'center',
    render: (books: any[]) => {
      if (!books || books.length === 0) return '-';
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
          {books.map((book) => (
            <span key={book.id} style={{
              background: '#e6f7ff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#1890ff'
            }}>
              {book.name}
            </span>
          ))}
        </div>
      );
    }
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    render: (_, record) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionDropdown data={record} />
    </div>
  }
];


import React, { useState } from 'react'
import TableTitle from './TableTitle'
import TableHeader from './TableHeader'
import { Pagination, Table } from 'antd';
import AddDrawer from '../Drawer/AddDrawer';
import ActionDropdown from '../ActionDropdown/ActionDropdown';
import EditDrawer from '../Drawer/EditDrawer';
import { getStudentList } from '../../services/studentService';
import { useQuery } from '@tanstack/react-query';
import DefaultImage from '../FormComponents/DefaultImage';

const itemRender = (_, type, originalElement) => {
  return type === "prev" ? (
    <p>Previous</p>
  ) : type === 'next' ? (
    <p>Next</p>
  ) : (originalElement)
}


const StudentTable = () => {
  const [columnInfo, setColumnsInfo] = useState(columns);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleChangeColumns = (cols) => {
    setColumnsInfo(cols)
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['students'],
    queryFn: getStudentList,
  })

  if (isPending) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>
  }


  const paginatedData = data.data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div style={{ width: '100%' }}>
      <div>
        <TableTitle />
        <TableHeader columnInfo={columnInfo} handleChangeColumns={handleChangeColumns} />

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table
            rowKey="id"
            rowSelection={{ type: "checkbox" }}
            dataSource={paginatedData}
            columns={columnInfo}
            pagination={false}
            scroll={{ x: 'max-content' }}  
            size="small"  
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
            total={data.data?.length}
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

    </div>
  );
};

export default StudentTable;