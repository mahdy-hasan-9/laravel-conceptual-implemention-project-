import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, message, Spin, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import TextInput from '../../components/FormComponents/TextInput';
import SingleSelectWithSearchInput from '../../components/FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../../components/FormComponents/SwitchInput';
import ImageUpload from '../../components/FormComponents/ImageUpload';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const initialImage = profileQuery.data?.data?.image_url;
            const currentImage = values.image_url;
            let image_removed = false;
            if (initialImage && (!currentImage || currentImage.length === 0)) {
                image_removed = true;
            }
            await updateProfile({
                ...values,
                image_removed
            });
            message.success('Profile saved successfully!');
            queryClient.invalidateQueries({
                queryKey: ['profile'],
            });
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

    const isLoading = profileQuery.isLoading || loading;

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
                    <Input type="hidden" />
                </Form.Item>

                <Card style={{ marginBottom: 24, textAlign: 'center', padding: '16px' }}>
                    <Form.Item
                        name="image_url"
                        valuePropName="value"
                        getValueFromEvent={normFile}
                        style={{ marginBottom: 0 }}
                    >
                        <ImageUpload />
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
                            loading={loading}
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