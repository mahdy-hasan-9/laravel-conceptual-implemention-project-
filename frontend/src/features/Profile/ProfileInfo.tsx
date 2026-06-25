import { Form, Button, Row, Col, Card, Spin, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import TextInput from '../../components/FormComponents/TextInput';
import SingleSelectWithSearchInput from '../../components/FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../../components/FormComponents/SwitchInput';
import ImageUpload from '../../components/FormComponents/ImageUpload';
import { useMutation, } from '@tanstack/react-query';
import { updateProfile } from '../../services/authService';
import toast from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PermissionGuard, RoleGuard } from '../../layouts/PermissionGuard';

const ROLE_OPTIONS = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'Staff', value: 'staff' },
    { label: 'Student', value: 'student' },
];

const ProfileInfo = () => {
    const [form] = Form.useForm();
    const { profile, isProfileLoading, refetchProfile } = useContext(AuthContext);

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                id: profile.id,
                name: profile.name,
                role: profile.role,
                is_active: profile.is_active,
                image_url: profile.imageFileList,
            });
        }
    }, [profile, form]);



    const { mutate: submitProfile, isPending: isUpdating } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success('Profile saved successfully!');
            refetchProfile();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
        }
    });

    const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const initialImage = profile?.image_url;
            const currentImage = values.image_url;
            const image_removed = !!(initialImage && (!currentImage || currentImage.length === 0));
            submitProfile({
                ...values,
                image_removed
            });
        } catch (validationError) {
            toast.error('Please check the required fields');
        }
    };

    if (isProfileLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin size="large" />
            </div>
        );
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


                    <RoleGuard role="admin">
                        <Col xs={24} md={12}>
                            <SingleSelectWithSearchInput
                                name="role"
                                label="Role"
                                options={ROLE_OPTIONS}
                                placeholder="Select a role"
                                showSearch
                                allowClear
                            />
                        </Col>
                    </RoleGuard>

                    {/* <PermissionGuard permission="edit-articles">
                        <Col xs={24} md={12}>
                            <SingleSelectWithSearchInput
                                name="role"
                                label="Role"
                                options={ROLE_OPTIONS}
                                placeholder="Select a role"
                                showSearch
                                allowClear
                            />
                        </Col>
                    </PermissionGuard> */}
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