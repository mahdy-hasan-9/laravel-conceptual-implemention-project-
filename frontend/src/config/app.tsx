export const config = {
    apiUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    storageUrl: import.meta.env.VITE_STORAGE_BASE_URL || 'http://localhost:8000/storage/',
    appName: import.meta.env.VITE_APP_NAME || 'My App',
} as const; 