import React, { useEffect, useState } from 'react'
import { Dayjs } from "dayjs";
import { Button, Col, DatePicker, Form, Row, Select, Space } from 'antd';
import SingleSelectWithSearchInput from '../FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../FormComponents/SwitchInput';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { filterStudents, getActivityList, getBooksList, getClassList } from '../../services/studentService';
import toast from 'react-hot-toast';
import MultipleSelectWithSearchInput from '../FormComponents/MultipleSelectWithSearchInput';

const { RangePicker } = DatePicker;

const FilterDataComponent = ({ filters, setFilters }: any) => {

  const [form] = Form.useForm();
  const [classes, setClasses] = useState([]);
  const [activityOptions, setActivityOptons] = useState([]);
  const [bookOptions, setBookOptons] = useState([]);
  const [values, setValues] = useState(null);

  const queryClient = useQueryClient();

  const classQuery = useQuery({
    queryKey: ['classList'],
    queryFn: getClassList,
  });
  useEffect(() => {
    if (classQuery.data) {
      const { isPending, isError, data, error, isSuccess } = classQuery;
      if (isPending) {
        console.log("Class list is loading...");
      } else if (isError) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong while fetching class list');
      } else if (isSuccess) {
        setClasses(data.data);
      }
    }
  }, [classQuery.data]);

  const activityQuery = useQuery({
    queryKey: ['activityList'],
    queryFn: getActivityList,
  });
  useEffect(() => {
    if (activityQuery.data) {
      const { isPending, isError, data, error, isSuccess } = activityQuery;
      if (isPending) {
        console.log("Activity list is loading...");
      } else if (isError) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong while fetching activity list');
      } else if (isSuccess) {
        setActivityOptons(data.data);
      }
    }
  }, [activityQuery.data]);

  const bookQuery = useQuery({
    queryKey: ['bookList'],
    queryFn: getBooksList,
  });
  useEffect(() => {
    if (bookQuery.data) {
      const { isPending, isError, data, error, isSuccess } = bookQuery;
      if (isPending) {
        console.log("Book list is loading...");
      } else if (isError) {
        toast.error(error instanceof Error ? error.message : 'Something went wrong while fetching book list');
      } else if (isSuccess) {
        setBookOptons(data.data);
      }
    }
  }, [bookQuery.data]);

  const handleFilter = async () => {
    const values = await form.validateFields();
    setFilters({
      class_id: values.class_id || '',
      activities: values.activities || [],
      books: values.books || [],
    });

  }


  return (

    <Form form={form} layout="vertical" requiredMark="optional" autoComplete="off">

      <div className=''>
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-x-5'>
          <div className='w-full'>
            <SingleSelectWithSearchInput
              placeholder='Choose Class'
              name="class_id"
              label=""
              options={classes}
              required={false}
            />
          </div>
          <div className='w-full'>
            <MultipleSelectWithSearchInput
              name="activities"
              label=""
              placeholder="Choose Activity"
              options={activityOptions}
              required={false}
            />
          </div>
          <div className='w-full'>
            <MultipleSelectWithSearchInput
              name="books"
              label=""
              placeholder="Choose Books"
              options={bookOptions}
              required={false}
            />
          </div>
          <div className='w-full text-end'>
            <Button onClick={handleFilter} type="primary">
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default FilterDataComponent