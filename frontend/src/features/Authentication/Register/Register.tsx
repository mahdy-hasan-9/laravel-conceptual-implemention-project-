import { useContext } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const registerSchema = z.object({
    name: z
        .string()
        .min(3, 'name must be at least 3 characters')
        .max(30, 'name must be at most 30 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    accept_terms: z.boolean().refine(val => val === true, { message: 'You must accept the terms and conditions' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;


const Register = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            accept_terms: false,
        },
        mode: 'onBlur',
    });

    const authContext = useContext(AuthContext);
    const { registerHandlerMutation } = authContext;


    const onSubmit = (data: RegisterFormData) => {
        registerHandlerMutation.mutate(data, {
            onSuccess: (resp) => {
                if (resp.status === 201) {
                    reset();
                }
            },
            onError: (error: any) => {
                if (error.status === 422 && error.errors) {
                    for (const fieldName in error.errors) {
                        setError(fieldName as any, {
                            type: 'server',
                            message: error.errors[fieldName][0],
                        });
                    }
                } else {
                    console.error(error.message);
                }
            }
        });
    };
    const isPending = registerHandlerMutation.isPending;
    return (
        <Spin spinning={isPending} description="Creating your account...">
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
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="name"
                            validateStatus={errors.name ? 'error' : ''}
                            help={errors.name?.message}
                        >
                            <Input
                                {...field}
                                placeholder="johndoe"
                                autoComplete="name"
                            />
                        </Form.Item>
                    )}
                />
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
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="Password"
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password?.message}
                        >
                            <Input.Password
                                {...field}
                                placeholder="••••••••"
                                autoComplete="new-password"
                            />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="accept_terms"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Form.Item
                            validateStatus={errors.accept_terms ? 'error' : ''}
                            help={errors.accept_terms?.message}
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox
                                checked={!!value}
                                onChange={(e) => onChange(e.target.checked)}
                            >
                                I accept the{' '}
                                <a href="/terms" target="_blank" rel="noopener noreferrer">
                                    Terms and Conditions
                                </a>
                            </Checkbox>
                        </Form.Item>
                    )}
                />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || isPending}
                        disabled={isSubmitting}
                        block
                        size="large"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </Form.Item>
            </Form>
            <Link to='/login'>Login Here</Link>
        </Spin>
    );
};

export default Register;