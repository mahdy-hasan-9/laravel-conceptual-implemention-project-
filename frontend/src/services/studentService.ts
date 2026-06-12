const API_BASE = 'http://127.0.0.1:8000/api';

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export const getClassList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}


export const getActivityList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/activity`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}


export const getBooksList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}



export const createStudentService = async (data: any) => {
    const token = isAuthenticated();
    const res = await fetch(`${API_BASE}/student/rsc`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: data
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
