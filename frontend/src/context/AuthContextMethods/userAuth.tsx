import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logoutService } from '../../services/authService';


export const logoutMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutService,
        onSuccess: (resp) => {
            if (resp.status === 200 && resp.success) {
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
                toast.success(resp.message || 'Logged out successfully');
            } else {
                toast.error(resp.message || 'Something went wrong');
            }
        },
        onError: (error: any) => {
            toast.error(error.message || 'Something went wrong');
        },
    });
};