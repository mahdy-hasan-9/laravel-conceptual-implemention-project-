

const dataSource = [
  { key: '1', name: 'Mike', age: 32, address: '10 Downing Street' },
  { key: '2', name: 'John', age: 42, address: '10 Downing Street' },
  { key: '3', name: 'Sarah', age: 28, address: '22 Baker Street' },
  { key: '4', name: 'Emma', age: 35, address: '15 Oxford Road' },
  { key: '5', name: 'David', age: 29, address: '8 Cambridge Lane' },
  { key: '6', name: 'Lisa', age: 31, address: '33 Piccadilly' },
  { key: '7', name: 'James', age: 45, address: '7 Trafalgar Square' },
  { key: '8', name: 'Anna', age: 27, address: '12 Covent Garden' },
  { key: '9', name: 'Robert', age: 38, address: '19 Westminster' },
  { key: '10', name: 'Laura', age: 33, address: '5 Kensington' },
  { key: '11', name: 'Michael', age: 41, address: '14 Chelsea' },
  { key: '12', name: 'Sophie', age: 26, address: '21 Notting Hill' },
  { key: '13', name: 'Daniel', age: 36, address: '9 Soho' },
  { key: '14', name: 'Olivia', age: 30, address: '17 Mayfair' },
  { key: '15', name: 'Thomas', age: 44, address: '3 Hammersmith' },
  { key: '16', name: 'Jessica', age: 25, address: '28 Fulham' },
  { key: '17', name: 'William', age: 39, address: '11 Greenwich' },
  { key: '18', name: 'Charlotte', age: 34, address: '6 Camden' },
  { key: '19', name: 'Henry', age: 47, address: '20 Islington' },
  { key: '20', name: 'Grace', age: 29, address: '4 Hackney' },
  { key: '21', name: 'Joseph', age: 37, address: '13 Shoreditch' },
  { key: '22', name: 'Amelia', age: 24, address: '25 Brixton' },
  { key: '23', name: 'Samuel', age: 43, address: '16 Clapham' },
  { key: '24', name: 'Ella', age: 32, address: '2 Wandsworth' },
  { key: '25', name: 'Benjamin', age: 28, address: '18 Putney' },
  { key: '26', name: 'Mia', age: 31, address: '7 Richmond' },
  { key: '27', name: 'Lucas', age: 40, address: '24 Twickenham' },
  { key: '28', name: 'Ava', age: 27, address: '10 Ealing' },
  { key: '29', name: 'Alexander', age: 46, address: '15 Harrow' },
  { key: '30', name: 'Isabella', age: 23, address: '8 Wembley' },
  { key: '31', name: 'Ethan', age: 35, address: '19 Croydon' },
  { key: '32', name: 'Lily', age: 30, address: '4 Bromley' },
  { key: '33', name: 'Mason', age: 42, address: '12 Lewisham' },
  { key: '34', name: 'Chloe', age: 26, address: '21 Southwark' },
  { key: '35', name: 'Logan', age: 38, address: '9 Lambeth' },
  { key: '36', name: 'Zoe', age: 33, address: '17 Tower Hamlets' },
  { key: '37', name: 'Oliver', age: 44, address: '5 Haringey' },
  { key: '38', name: 'Megan', age: 29, address: '14 Barnet' },
  { key: '39', name: 'Jack', age: 36, address: '3 Enfield' },
  { key: '40', name: 'Hannah', age: 25, address: '26 Brent' },
  { key: '41', name: 'Ryan', age: 41, address: '11 Hounslow' },
  { key: '42', name: 'Amy', age: 28, address: '7 Kingston' },
  { key: '43', name: 'Noah', age: 39, address: '23 Merton' },
  { key: '44', name: 'Ruby', age: 34, address: '6 Sutton' },
  { key: '45', name: 'Jacob', age: 45, address: '20 Redbridge' },
  { key: '46', name: 'Daisy', age: 22, address: '1 Newham' },
  { key: '47', name: 'Aiden', age: 37, address: '16 Barking' },
  { key: '48', name: 'Freya', age: 31, address: '9 Dagenham' },
  { key: '49', name: 'Matthew', age: 48, address: '27 Havering' },
  { key: '50', name: 'Poppy', age: 27, address: '13 Bexley' },
  { key: '51', name: 'Dylan', age: 33, address: '5 Greenwich' },
  { key: '52', name: 'Evie', age: 24, address: '22 Westminster' },
  { key: '53', name: 'Luke', age: 40, address: '8 Camden' },
  { key: '54', name: 'Scarlett', age: 29, address: '19 Islington' },
  { key: '55', name: 'Harvey', age: 43, address: '4 Hackney' },
  { key: '56', name: 'Phoebe', age: 26, address: '15 Shoreditch' },
  { key: '57', name: 'Oscar', age: 35, address: '2 Brixton' },
  { key: '58', name: 'Alice', age: 32, address: '18 Clapham' },
  { key: '59', name: 'Leo', age: 47, address: '10 Wandsworth' },
  { key: '60', name: 'Matilda', age: 23, address: '25 Putney' },
  { key: '61', name: 'Finley', age: 38, address: '7 Richmond' },
  { key: '62', name: 'Sienna', age: 30, address: '14 Twickenham' },
  { key: '63', name: 'Theo', age: 44, address: '21 Ealing' },
  { key: '64', name: 'Layla', age: 25, address: '3 Harrow' },
  { key: '65', name: 'Toby', age: 36, address: '12 Wembley' },
  { key: '66', name: 'Mila', age: 28, address: '6 Croydon' },
  { key: '67', name: 'Adam', age: 41, address: '17 Bromley' },
  { key: '68', name: 'Willow', age: 27, address: '9 Lewisham' },
  { key: '69', name: 'Reuben', age: 46, address: '24 Southwark' },
  { key: '70', name: 'Holly', age: 31, address: '1 Lambeth' },
  { key: '71', name: 'Harrison', age: 39, address: '20 Tower Hamlets' },
  { key: '72', name: 'Iris', age: 24, address: '5 Haringey' },
  { key: '73', name: 'Sebastian', age: 42, address: '11 Barnet' },
  { key: '74', name: 'Violet', age: 29, address: '16 Enfield' },
  { key: '75', name: 'Elliot', age: 37, address: '8 Brent' },
  { key: '76', name: 'Penelope', age: 33, address: '23 Hounslow' },
  { key: '77', name: 'Nathan', age: 45, address: '4 Kingston' },
  { key: '78', name: 'Eleanor', age: 26, address: '19 Merton' },
  { key: '79', name: 'Max', age: 34, address: '7 Sutton' },
  { key: '80', name: 'Rosie', age: 30, address: '13 Redbridge' },
];


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    render: (text: string) => <p className='capitalize color-slate-700'>{text}</p>
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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => <ActionDropdown data={record} />
  }
];


import React, { useState } from 'react'
import TableTitle from './TableTitle'
import TableHeader from './TableHeader'
import { Pagination, Table } from 'antd';
import AddDrawer from '../Drawer/AddDrawer';
import ActionDropdown from '../ActionDropdown/ActionDropdown';
import EditDrawer from '../Drawer/EditDrawer';

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

  const paginatedData = dataSource.slice(
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
        
        {/* 🔥 FIX: Wrap table in scrollable container for mobile */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table
            rowSelection={{ type: "checkbox" }}
            dataSource={paginatedData}       
            columns={columnInfo}
            pagination={false}
            scroll={{ x: 'max-content' }}  // 🔥 Horizontal scroll on small screens
            size="small"  // 🔥 Smaller padding on mobile
          />
        </div>
        
        {/* 🔥 FIX: Pagination wraps on mobile */}
        <div style={{ 
          marginTop: 16, 
          display: 'flex', 
          justifyContent: 'flex-end',
          flexWrap: 'wrap',  // Wrap to next line on small screens
          gap: 8
        }}>
          <Pagination
            current={currentPage}            
            pageSize={pageSize}              
            total={dataSource.length}       
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
            onChange={handlePaginationChange} 
            onShowSizeChange={handlePaginationChange} 
            itemRender={itemRender}
            responsive={true}  // 🔥 AntD responsive pagination
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