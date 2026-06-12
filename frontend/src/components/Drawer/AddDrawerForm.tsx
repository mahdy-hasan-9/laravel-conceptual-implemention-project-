import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, message, Space } from 'antd';
import { SaveOutlined, UserOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import ImageUpload from '../FormComponents/ImageUpload';
import TextInput from '../FormComponents/TextInput';
import NumberInput from '../FormComponents/NumberInput';
import RadioInput from '../FormComponents/RadioInput';
import SingleSelectWithSearchInput from '../FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../FormComponents/SwitchInput';
import MultipleSelectWithSearchInput from '../FormComponents/MultipleSelectWithSearchInput';
import TextAreaInput from '../FormComponents/TextAreaInput';
import MultipleCheckboxInput from '../FormComponents/MultipleCheckboxInput';
import { createStudentService, getActivityList, getBooksList, getClassList } from '../../services/studentService';
import toast from 'react-hot-toast';



const GENDER_OPTIONS = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
];


const AddDrawerForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [activityOptions, setActivityOptons] = useState([]);
    const [bookOptions, setBookOptons] = useState([]);

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

    getActivityList


    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log(values);


            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('age', String(values.age));
            formData.append('gender', values.gender);
            formData.append('address', values.address);
            formData.append('is_active', values.is_active ? '1' : '0');
            formData.append('class', String(values.class));
            if (values.image && values.image.length > 0) {
                const fileObj = values.image[0].originFileObj;
                if (fileObj instanceof File) {
                    formData.append('image', fileObj, fileObj.name);
                }
            }
            setLoading(true);
            const res = await createStudentService(formData);
            console.log(res);
            message.success('Student added successfully!');
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
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
                        valuePropName="fileList"
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
                    // placeholder="Enter student full name"
                    min={2}
                    max={50}
                />

                <Row gutter={16}>
                    <Col span={12}>
                        <NumberInput
                            name="age"
                            label="Age"
                            // placeholder="Age"
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
                            name="class"
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

export default AddDrawerForm;