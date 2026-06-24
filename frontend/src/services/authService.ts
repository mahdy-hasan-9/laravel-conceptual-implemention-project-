const API_BASE = 'http://127.0.0.1:8000/api';

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}


const toFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value === undefined || value === null) return;
        if (key === 'image_url') {
            if (Array.isArray(value) && value.length > 0) {
                const fileObj = value[0].originFileObj;
                if (fileObj instanceof File) {
                    formData.append('image', fileObj);
                }
            }
        } else if (Array.isArray(value)) {
            value.forEach(val => formData.append(`${key}[]`, val));
        } else if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = isAuthenticated();
    const headers: any = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
    }

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Something went wrong');
        (error as any).status = response.status;
        (error as any).errors = data.errors;
        throw error;
    }

    return data;
};


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

export const getProfile = () => request('/auth/user/profile');


export const updateProfile = async (values: any) => {
    const hasNewImage = values.image_url && Array.isArray(values.image_url) && values.image_url.length > 0 && values.image_url[0].originFileObj;
    const isImageRemoved = values.image_removed === true;

    const data = (hasNewImage || isImageRemoved) ? toFormData(values) : values;
    let body: any = data;
    let method = 'PUT';

    if (data instanceof FormData) {
        data.append('_method', 'PUT');
        method = 'POST';
        body = data;
    } else {
        body = JSON.stringify(data);
    }

    return request('/auth/user/profile', {
        method,
        body,
    });
};


export const logoutService = async () => {
    const token = isAuthenticated();
    if (token != null) {
        const res = await fetch(`${API_BASE}/auth/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const resp = await res.json();
        return resp;
    }
}
