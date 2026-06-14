import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, message, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
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
import ImageUpload from '../FormComponents/ImageUpload';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';



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

    const toggleDrawer = useToggleDrawer();
    const onCloseDrawer = () => {
        toggleDrawer(false, "showDrawerAdd");
    }



    const { mutate: createStudentApi } = useMutation({
        mutationFn: createStudentService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
            message.success('Student added successfully!');
            form.resetFields();
            onCloseDrawer();
        },
        onError: (error: any) => {
            toast.error(error.message || 'Something went wrong');
        }
    })

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            createStudentApi(values);
        } catch (error: any) {
            if (error.errorFields) {
                console.error('Validation failed:', error);
            } else {
                console.error('API error:', error);
            }
        }
    };


    // const handleSubmit = async () => {
    //     try {
    //         const values = await form.validateFields();
    //         setLoading(true);
    //         console.log('Form values:', values);
    //         const res = await createStudentService(values);
    //         message.success('Student added successfully!');
    //         form.resetFields();
    //     } catch (error: any) {
    //         console.error('Submission failed:', error);
    //         if (error.errors) {
    //             toast.error(error.message || 'Validation failed');
    //         } else {
    //             toast.error(error.message || 'Something went wrong');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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

export default AddDrawerForm;