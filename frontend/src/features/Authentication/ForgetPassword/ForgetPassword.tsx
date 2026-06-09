
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';



const validationSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
});

type ForgetPasswordFormData = z.infer<typeof validationSchema>;

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<ForgetPasswordFormData>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onBlur',
    });


    const onSubmit = async (data: ForgetPasswordFormData) => {
        setLoading(true);
        console.log(data);
    };

    return (
        <Spin spinning={loading} description="Enter your email...">
            <Form
                name="register"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
                style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}
                onFinish={handleSubmit(onSubmit)}
                autoComplete="off"
                layout="horizontal"
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email?.message}
                        >
                            <Input
                                {...field}
                                type="email"
                                placeholder="john@example.com"
                                autoComplete="email"
                            />
                        </Form.Item>
                    )}
                />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || loading}
                        disabled={isSubmitting}
                        block
                        size="large"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export default ForgetPassword