import React from 'react'
import TableTitle from './TableTitle'
import TableHeader from './TableHeader'
import { Pagination, Table } from 'antd';


const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
     align : 'left',
    //  render : (text:string) => <p>{text}</p>
     render : (text:string) => <p className='capitalize color-slate-700'>{text}</p>

  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    align : 'center',
    width : 100
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
     align : 'center'
  },
];




const StudentTable = () => {
  return (
    <div>
        <TableTitle/>
        <TableHeader/>
        <Table rowSelection={{type:"checkbox"}} dataSource={dataSource} columns={columns} pagination={false}/>
        <Pagination showSizeChanger pageSizeOptions={['5','10','20']}/>
    </div>
  )
}

export default StudentTable