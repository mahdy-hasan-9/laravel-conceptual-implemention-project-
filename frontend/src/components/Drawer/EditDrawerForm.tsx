import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, message, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import ImageUpload from '../FormComponents/ImageUpload';
import TextInput from '../FormComponents/TextInput';
import NumberInput from '../FormComponents/NumberInput';
import RadioInput from '../FormComponents/RadioInput';
import SingleSelectWithSearchInput from '../FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../FormComponents/SwitchInput';
import MultipleSelectWithSearchInput from '../FormComponents/MultipleSelectWithSearchInput';
import TextAreaInput from '../FormComponents/TextAreaInput';
import MultipleCheckboxInput from '../FormComponents/MultipleCheckboxInput';
import { createStudentService, getActivityList, getBooksList, getClassList, getStudentDetails, getStudentList, updateStudentService } from '../../services/studentService';
import toast from 'react-hot-toast';



const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];


const EditDrawerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [activityOptions, setActivityOptons] = useState([]);
  const [bookOptions, setBookOptons] = useState([]);
  const [studentId , setStudentId] = useState<string>();

  useEffect(() => {
    const classList = async () => {
      try {
        const resp = await getClassList();
        if (resp.status === 200 && resp.success === true) {
          setClasses(resp.data);
        }
      } catch (error: any) {
        localStorage.removeItem('token');
        toast.error(error.message || 'Something went wrong');
      }
    };
    classList();


    const activityList = async () => {
      try {
        const resp = await getActivityList();
        if (resp.status === 200 && resp.success === true) {
          setActivityOptons(resp.data);
        }
      } catch (error: any) {
        localStorage.removeItem('token');
        toast.error(error.message || 'Something went wrong');
      }
    }
    activityList();

    const bookList = async () => {
      try {
        const resp = await getBooksList();
        if (resp.status === 200 && resp.success === true) {
          setBookOptons(resp.data);
        }
      } catch (error: any) {
        localStorage.removeItem('token');
        toast.error(error.message || 'Something went wrong');
      }
    }
    bookList();

  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const showDrawerParam = queryParams.get("showDrawerEdit");
        const id = showDrawerParam?.split("-")[1];
        setStudentId(id);

        if (id) {
          const resp = await getStudentDetails(id);

          if (resp.status === 200 && resp.success === true) {

            const studentData = Array.isArray(resp.data) ? resp.data[0] : resp.data;

            const activityIds = studentData.activities?.map((a: any) => a.id) || [];
            const bookIds = studentData.books?.map((b: any) => b.id) || [];

            const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/storage/';
            const fullImageUrl = studentData.image_url
              ? `${BASE_URL}${studentData.image_url}`
              : null;

            const imageFileList = fullImageUrl ? [{
              uid: '-1',
              name: studentData.image_url.split('/').pop() || 'image.jpg',
              status: 'done',
              url: fullImageUrl,
              thumbUrl: fullImageUrl,
            }] : [];

            form.setFieldsValue({
              name: studentData.name,
              age: studentData.age,
              gender: studentData.gender,
              class_id: studentData.class_id,
              is_active: studentData.is_active,
              activities: activityIds,
              books: bookIds,
              address: studentData.address,
              image: imageFileList,
            });
          }
        }
      } catch (error: any) {
        localStorage.removeItem('token');
        toast.error(error.message || 'Something went wrong');
      }
    };
    fetchStudentData();
  }, [form]);


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      console.log(values + " from form submit");

      const res = await updateStudentService(studentId, values);
      message.success('Student updated successfully!');
      form.resetFields();
    } catch (error: any) {
      console.error('Submission failed:', error);
      if (error.errors) {
        toast.error(error.message || 'Validation failed');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <div>
      <Form form={form} layout="vertical" requiredMark="optional" autoComplete="off">

        <Card style={{ marginBottom: 24, textAlign: 'center', padding: '16px' }}>
          <Form.Item
            name="image"
            valuePropName="value"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload student image!' }]}
            style={{ marginBottom: 0 }}
          >
            <ImageUpload name="avatar" maxSize={2} />
          </Form.Item>
        </Card>

        <TextInput
          name="name"
          label="Student Name"
          min={2}
          max={50}
        />

        <Row gutter={16}>
          <Col span={12}>
            <NumberInput
              name="age"
              label="Age"
              min={5}
              max={25}
            />
          </Col>
          <Col span={12}>
            <RadioInput
              name="gender"
              label="Gender"
              options={GENDER_OPTIONS}
              optionType="button"
              buttonStyle="solid"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <SingleSelectWithSearchInput
              name="class_id"
              label={
                <Space>
                  Class
                </Space>
              }
              options={classes}
            />
          </Col>
          <Col span={12}>
            <SwitchInput
              name="is_active"
              label="Status"
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              initialValue={true}
            />
          </Col>
        </Row>

        <MultipleSelectWithSearchInput
          name="activities"
          label="Activities"
          options={activityOptions}
        />


        <TextAreaInput
          name="address"
          label={
            <Space>
              Address
            </Space>
          }
          min={10}
          max={200}
          rows={3}
        />


        <MultipleCheckboxInput
          name="books"
          label="Books"
          options={bookOptions}
          layout="grid"
          gridCols={3}
        />


        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
              icon={<SaveOutlined />}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditDrawerForm;