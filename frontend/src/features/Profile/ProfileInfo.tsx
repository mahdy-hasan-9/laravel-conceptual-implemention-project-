import { useState } from 'react';
import { Form, Button, Row, Col, Card, message, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import TextInput from '../../components/FormComponents/TextInput';
import SingleSelectWithSearchInput from '../../components/FormComponents/SingleSelectWithSearchInput';
import SwitchInput from '../../components/FormComponents/SwitchInput';
import ImageUpload from '../../components/FormComponents/ImageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const roleOptions = [
    { value: 'role-1', label: 'Role 1' },
    { value: 'role-2', label: 'Role 2' },
    { value: 'role-3', label: 'Role 3' },
];

const ProfileInfo = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    // Replace with your actual API call
    const saveProfile = async (values) => {
        // return await api.saveProfile(values);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const { mutate: saveProfileApi } = useMutation({
        mutationFn: saveProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            message.success('Profile saved successfully!');
            form.resetFields();
        },
        onError: (error) => {
            message.error(error?.message || 'Something went wrong');
        }
    });

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            saveProfileApi(values);
        } catch (error) {
            if (error.errorFields) {
                console.error('Validation failed:', error);
            } else {
                console.error('API error:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                requiredMark="optional"
                autoComplete="off"
                initialValues={{
                    status: true,
                }}
            >
                {/* Profile Image Upload */}
                <Card style={{ marginBottom: 24, textAlign: 'center', padding: '16px' }}>
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload profile image!' }]}
                        style={{ marginBottom: 0 }}
                    >
                        <ImageUpload name="avatar" maxSize={2} />
                    </Form.Item>
                </Card>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <TextInput
                            name="username"
                            label="User Name"
                            placeholder="Enter user name"
                            required={true}
                            min={3}
                            max={50}
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <SingleSelectWithSearchInput
                            name="role"
                            label="Role"
                            options={roleOptions}
                            placeholder="Select a role"
                            required={true}
                            showSearch={true}
                            allowClear={true}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <SwitchInput
                            name="status"
                            label="User Status"
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                            initialValue={true}
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