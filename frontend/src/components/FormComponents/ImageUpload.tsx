import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, type UploadFile, type UploadProps } from 'antd';

interface ImageUploadProps {
    value?: UploadFile[];
    onChange?: (fileList: UploadFile[]) => void;
    imageUrl?: string;
}

const ImageUpload = ({ value, onChange, imageUrl }: ImageUploadProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Handle external imageUrl prop (for simple cases)
    useEffect(() => {
        if (imageUrl && !value?.length) {
            setFileList([
                {
                    uid: '-1',
                    name: imageUrl.split('/').pop() || 'existing_image.png',
                    status: 'done',
                    url: imageUrl,
                    thumbUrl: imageUrl,
                },
            ]);
        }
    }, [imageUrl]);

    useEffect(() => {
        if (value && value.length > 0) {
            setFileList(value);
        } else if (!imageUrl) {
            setFileList([]);
        }
    }, [value]);

    const handlePreview = async (file: UploadFile) => {
        setPreviewImage(file.url || file.thumbUrl || '');
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        onChange?.(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                    accept="image/*"
                    beforeUpload={() => false}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </div>

            <Modal
                open={previewOpen}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default ImageUpload;