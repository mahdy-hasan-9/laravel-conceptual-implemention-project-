import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, message, Space, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import TextInput from '../../components/FormComponents/TextInput';
import SingleSelectWithSearchInput from '../../components/FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../../components/FormComponents/SwitchInput';
import ImageUpload from '../../components/FormComponents/ImageUpload';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../../services/authService';
import toast from 'react-hot-toast';


const ROLE_OPTIONS = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'Staff', value: 'staff' },
    { label: 'Student', value: 'student' },
];



const ProfileInfo = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });

    useEffect(() => {
        if (profileQuery.data) {
            const { isPending, isError, data, error, isSuccess } = profileQuery;
            if (isPending) {
                console.log("Profile is loading...");
            } else if (isError) {
                toast.error(error instanceof Error ? error.message : 'Something went wrong while fetching profile');
            } else if (isSuccess) {
                const profileData = Array.isArray(data.data) ? data.data[0] : data.data;

                const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/storage/';
                const fullImageUrl = profileData.image_url
                    ? `${BASE_URL}${profileData.image_url}`
                    : null;

                const imageFileList = fullImageUrl ? [{
                    uid: '-1',
                    name: profileData.image_url.split('/').pop() || 'image.jpg',
                    status: 'done',
                    url: fullImageUrl,
                    thumbUrl: fullImageUrl,
                }] : [];

                form.setFieldsValue({
                    id: profileData.id,
                    name: profileData.name,
                    role: profileData.role,
                    is_active: profileData.is_active,
                    image_url: imageFileList,
                });
            }
        }
    }, [profileQuery.data, form]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    // Build FormData helper
    const buildFormData = (values: any): FormData => {
        const formData = new FormData();
        formData.append('id', values.id);
        formData.append('name', values.name);
        formData.append('role', values.role);
        formData.append('is_active', values.is_active ? '1' : '0');

        const currentImage = values.image_url;

        if (currentImage && currentImage.length > 0) {
            const imageFile = currentImage[0];
            if (imageFile.originFileObj) {
                formData.append('image_url', imageFile.originFileObj);
                formData.append('image_removed', '0');
            } else {
                formData.append('image_removed', '0');
            }
        } else {
            formData.append('image_removed', '1');
        }

        return formData;
    };

    // useMutation with FormData
    const { mutate: updateProfileApi, isPending: isUpdating } = useMutation({
        mutationFn: (formData: FormData) => updateProfile(formData),
        onSuccess: (res) => {
            if (!res.success) {
                toast.error(res.message || 'Something went wrong');
                return;
            }
            message.success('Profile saved successfully!');
            queryClient.invalidateQueries({
                queryKey: ['profile'],
            });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Something went wrong');
        }
    });

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = buildFormData(values);
            console.log(formData);

            updateProfileApi(formData);
        } catch (error: any) {
            if (error.errorFields) {
                console.error('Validation failed:', error);
            } else {
                toast.error(error.message || 'Something went wrong');
            }
        }
    };

    const isLoading = profileQuery.isLoading || isUpdating;

    if (isLoading && profileQuery.isLoading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
        }}>
            <Spin size="large" />
        </div>
    }

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                autoComplete="off"
            >
                <Form.Item name="id" hidden>
                    <input type="hidden" />
                </Form.Item>

                <Card style={{ marginBottom: 24, textAlign: 'center', padding: '16px' }}>
                    <Form.Item
                        name="image_url"
                        valuePropName="value"
                        getValueFromEvent={normFile}
                        style={{ marginBottom: 0 }}
                    >
                        <ImageUpload maxSize={2} />
                    </Form.Item>
                </Card>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <TextInput
                            name="name"
                            label="User Name"
                            placeholder="Enter user name"
                            min={3}
                            max={50}
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <SingleSelectWithSearchInput
                            name="role"
                            label="Role"
                            options={ROLE_OPTIONS}
                            placeholder="Select a role"
                            showSearch={true}
                            allowClear={true}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <SwitchInput
                            name="is_active"
                            label="User Status"
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                        />
                    </Col>
                </Row>

                <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleSubmit}
                            loading={isUpdating}
                            icon={<SaveOutlined />}
                        >
                            Save All
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfileInfo;