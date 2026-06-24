const API_BASE = 'http://127.0.0.1:8000/api';

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}


const toFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value === undefined || value === null) return;
        if (key === 'image' && Array.isArray(value) && value.length > 0) {
            const fileObj = value[0].originFileObj;
            if (fileObj instanceof File) {
                formData.append('image', fileObj);
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

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Something went wrong');
        (error as any).status = response.status;
        (error as any).errors = data.errors;
        throw error;
    }

    return data;
};

export const getClassList = () => request('/student/class');

export const getActivityList = () => request('/student/activity');

export const getBooksList = () => request('/student/books');


export const createStudentService = async (values: any) => {
    const data = values.image ? toFormData(values) : values;
    return request('/student/rsc', {
        method: 'POST',
        body: data instanceof FormData ? data : JSON.stringify(data),
    });
};


export const updateStudentService = async (id: string, values: any) => {
    const data = (values.image || values.image_removed) ? toFormData(values) : values;
    let body: any = data;
    let method = 'PUT';

    if (data instanceof FormData) {
        data.append('_method', 'PUT');
        method = 'PUT';
        body = data;
    } else {
        body = JSON.stringify(data);
    }
    return request(`/student/rsc/${id}`, {
        method,
        body,
    });
};

export const deleteStudentService = async (id: string) => {
    return request(`/student/rsc/${id}`, {
        method: 'DELETE',
    });
};

export const getStudentList = async (params: any = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/student/rsc?${query}`);
};

export const getStudentDetails = async (id: string) => {
    return request(`/student/rsc/${id}`);
};

export const filterStudents = async (values: any) => {
    console.log(values);
}

