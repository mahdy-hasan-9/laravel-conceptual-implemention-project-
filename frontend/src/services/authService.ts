const API_BASE = 'http://127.0.0.1:8000/api';

export const registerService = async (data: any) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resp = await res.json();
    if (resp.success === false && resp.status === 422 && resp.errors) {
        const error = new Error('Validation failed');
        (error as any).errors = resp.errors;
        (error as any).status = 422;
        throw error;
    }
    if (resp.success === false) {
        const error = new Error(resp.message || 'Something went wrong');
        (error as any).status = resp.status;
        throw error;
    }
    return resp;
};

export const loginService = async (data: any) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resp = await res.json();
    if (resp.success === false && resp.status === 422 && resp.errors) {
        const error = new Error('Validation failed');
        (error as any).errors = resp.errors;
        (error as any).status = 422;
        throw error;
    }
    if (resp.success === false) {
        const error = new Error(resp.message || 'Something went wrong');
        (error as any).status = resp.status;
        throw error;
    }
    return resp;
};

export const logoutService = () => { }
