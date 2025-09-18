import { useState, useEffect, useRef } from "react";
import api from "../../utils/api";

export default function useImageUploaderForCompany(setGallery, companyId, image){

const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState(image);  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);

    // ----------------------
    //      FILE CHANGE
    // ----------------------    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Проверка типа файла
        if (!file.type.match('image.*')) {
        setError('Пожалуйста, выберите файл изображения');
        return;
        }

        setSelectedFile(file);
        setError('');

        // Создание превью
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
            setUploadedImage(null)
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };

    // ----------------------
    //      IMAGE UPLOAD
    // ----------------------    
    const handleUpload = async () => {
        if (!selectedFile) {
        setError('Пожалуйста, выберите файл');
        return;
        }

        setIsLoading(true);
        setError('');

        try {
        const formData = new FormData();

        const newFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${selectedFile.name.substring(selectedFile.name.lastIndexOf('.'))}`;

            // Создаем новый File объект с измененным именем
            const renamedFile = new File([selectedFile], newFileName, {
                type: selectedFile.type,
                lastModified: selectedFile.lastModified
            });

        formData.append('image', renamedFile);        

        const response = await api.put(`/companies/${companyId}/image`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        console.log('response', response);

        const uploaded_image = response.data.uploaded_image;
        const gallery = response.data.gallery;
        setUploadedImage(uploaded_image);
        setSelectedFile(null);
        setPreviewUrl('');

        setTimeout(()=>{
            setGallery(gallery);
        },1000);      

        } catch (err) {
        console.error('Upload error:', err);
        let showMessage = 'Ошибка при загрузке файла';
        const errMessage= err.response?.data?.error.details;
            if (errMessage.toLowerCase().includes('too large')) {
                showMessage += '. Слишком большой файл. Ограничение - 5 мб.'
            }
        setError(showMessage);
        } finally {
        setIsLoading(false);
        }
    };

    // ----------------------
    //      IMAGE DELETE
    // ----------------------     
    const handleDelete = async () => {

        if (!uploadedImage?.key) return;

        setIsLoading(true);

        try {
        
            const response = await api.delete(`/companies/${companyId}/image`, {
            data: {
                imageKey: uploadedImage.key,
                }
            });

            console.log('response after deleting', response)
            
            setUploadedImage(null);

            setTimeout(()=>{
                setGallery(response.data.gallery);
            },500);        

        } catch (err) {
        console.error('Delete error:', err);
        setError('Ошибка при удалении файла');
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(() => {
    }, []);

        return {
            selectedFile, 
            previewUrl,
            uploadedImage,
            isLoading,
            error, 
            fileInputRef,
            handleButtonClick,
            handleFileChange,
            handleUpload,
            handleDelete,      
        }
}