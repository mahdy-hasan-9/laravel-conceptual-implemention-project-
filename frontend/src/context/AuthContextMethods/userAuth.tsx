import { useMutation } from '@tanstack/react-query';
import { logoutService } from '../../services/authService';

export const logoutMutation = () => {
    return useMutation({
        mutationFn: logoutService,
    });
};