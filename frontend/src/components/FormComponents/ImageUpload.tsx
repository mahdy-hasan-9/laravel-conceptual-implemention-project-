import { Upload, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import DefaultImage from './DefaultImage';

interface ImageUploadProps {
    name?: string;
    required?: boolean;
    maxSize?: number;
    acceptedTypes?: string[];
    maxCount?: number;
    onChange?: (fileList: any[]) => void;
    value?: any[]; 
    width?: number;
    height?: number;
}

const ImageUpload = ({
    name = 'image',
    required = true,
    maxSize = 2,
    acceptedTypes = ['image/jpeg', 'image/png'],
    maxCount = 1,
    onChange,
    value = [], 
    width = 650,
    height = 100
}: ImageUploadProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        if (value && value.length > 0) {
            const file = value[0];
            if (file.url || file.thumbUrl) {
                setImageUrl(file.url || file.thumbUrl);
                setIsRemoved(false);
            } 
            else if (file.originFileObj) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageUrl(e.target?.result as string);
                };
                reader.readAsDataURL(file.originFileObj);
                setIsRemoved(false);
            }
        } else {
            setImageUrl(null);
            setIsRemoved(false);
        }
    }, [value]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const beforeUpload = (file: File) => {
        const isAccepted = acceptedTypes.includes(file.type);
        if (!isAccepted) {
            message.error(`You can only upload ${acceptedTypes.join('/')} files!`);
            return Upload.LIST_IGNORE;
        }
        const isLtMax = file.size / 1024 / 1024 < maxSize;
        if (!isLtMax) {
            message.error(`Image must be smaller than ${maxSize}MB!`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const customRequest = ({ file, onSuccess, onError }: any) => {
        setTimeout(() => {
            onSuccess?.('ok');
        }, 0);
    };

    const handleChange = (info: any) => {
        const { fileList } = info;
        if (fileList.length === 0) {
            setImageUrl(null);
            setIsRemoved(true);
        } else {
            const file = fileList[fileList.length - 1];
            if (file.originFileObj && !file.url) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImageUrl(e.target?.result as string);
                    setIsRemoved(false);
                };
                reader.readAsDataURL(file.originFileObj);
            }
        }
        onChange?.(normFile(info));
    };

    const handleCancel = useCallback(() => {
        setImageUrl(null);
        setIsRemoved(true);
        onChange?.([]); 
        message.info('Image removed. Default will be used.');
    }, [onChange]);

    const handleRemove = () => {
        setImageUrl(null);
        setIsRemoved(false);
        return true;
    };

    const containerStyle = {
        width,
        height,
        position: 'relative' as const,
        overflow: 'hidden',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        border: '2px dashed #d9d9d9',
        cursor: 'pointer'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
        borderRadius: 8
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
                type="hidden"
                name={`${name}_removed`}
                value={isRemoved ? 'true' : 'false'}
            />

            <Upload
                name={name}
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                onChange={handleChange}
                onRemove={handleRemove}
                maxCount={maxCount}
                accept={acceptedTypes.join(',')}
                fileList={value} 
            >
                <div style={containerStyle}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={imageStyle}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%' }}>
                            <DefaultImage />
                        </div>
                    )}
                </div>
            </Upload>

            {imageUrl && !isRemoved && (
                <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#ff4d4f',
                        border: '2px solid #fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        padding: 0
                    }}
                    title="Remove photo"
                >
                    <CloseOutlined style={{ 
                        fontSize: 14, 
                        color: '#fff',
                        fontWeight: 'bold'
                    }} />
                </button>
            )}
        </div>
    );
};

export default ImageUpload;