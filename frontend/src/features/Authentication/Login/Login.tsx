
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginService } from '../../../services/authService';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


const loginSchema = z.object({
    email: z
        .string(),
    password: z
        .string()
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });


    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const resp = await loginService(data);
            localStorage.setItem('token', resp.token);
            if(resp.status == 200){
                reset();
                navigate('/', { replace: true });
                toast.success(resp.message || 'Logged In');
            }
        } catch (error: any) {
            if (error.status === 422 && error.errors) {
                for (const fieldName in error.errors) {
                    setError(fieldName as any, {
                        type: 'server',
                        message: error.errors[fieldName][0],
                    });
                }
            } else {
                console.log(error);
                toast.error(error.message || 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading} description="Login your account...">
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || loading}
                        disabled={isSubmitting}
                        block
                        size="large"
                    >
                        {isSubmitting ? 'Login in...' : 'Login Account'}
                    </Button>
                </Form.Item>
            </Form>
             <Link to='/register'>Register Here</Link>
        </Spin>
    );
}

export default Login