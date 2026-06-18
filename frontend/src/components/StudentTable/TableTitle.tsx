import { Badge } from 'antd'

const TableTitle = () => {
  return (
    <div className='flex items-center gap-3 mb-3'>
      <h3 className="text-xxl">Students Table</h3>
      <Badge>50 Students</Badge>
    </div>
  )
}

export default TableTitle