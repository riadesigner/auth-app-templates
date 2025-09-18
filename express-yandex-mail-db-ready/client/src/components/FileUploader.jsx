import React, { useState, useRef } from 'react';
import axios from 'axios';
import api from '../utils/api'
import docIcon from '../../src/i/document.png'

const FileUploader = ({ orderId, setFiles, file = null, nodelete = false }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(file);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('file', file)

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Разрешенные MIME типы
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        // Проверка типа файла
        if (!allowedTypes.includes(file.type)) {
            setError('Пожалуйста, выберите файл документа (Word, Excell, PowerPoint или PDF)');
            e.target.value = ''; // Очищаем input
            return;
        }

        // Проверка расширения (дополнительная проверка)
        const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'];
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));        

        if (!allowedExtensions.includes(fileExtension)) {
            setError('Недопустимое расширение файла');
            e.target.value = '';
            return;
        }

        // Проверка размера файла (например, максимум 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            setError('Файл слишком большой. Максимальный размер: 10MB');
            e.target.value = '';
            return;
        }        

        setSelectedFile(file);
        setError('');
        
        setPreviewUrl(docIcon); 
        setUploadedFile(null);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();


      // Даем безопасное имя файлу (если оригинальное не получится сохранить)
      const newSafeFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${selectedFile.name.substring(selectedFile.name.lastIndexOf('.'))}`;
            
      // Кодируем оригинальное имя
      const encodedName = btoa(encodeURIComponent(selectedFile.name));
    
      // Создаем новый File объект с измененным именем
      const renamedFile = new File([selectedFile], newSafeFileName, {
          type: selectedFile.type,
          lastModified: selectedFile.lastModified
      });      
      
      formData.append('file', renamedFile);      
      formData.append('originalName', encodedName);      
      formData.append('orderId', orderId);      
      
      const response = await api.post('/orders/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('response', response);

      const uploaded_file = response.data.uploaded_file;      
      const files = response.data.files;
      setUploadedFile(uploaded_file);
      setSelectedFile(null);
      setPreviewUrl('');

      setTimeout(()=>{
        setFiles(files);
      },0);

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

  const handleDelete = async () => {

    if (!uploadedFile?.key) return;

    setIsLoading(true);

    try {
      
        const response = await api.delete('/orders/delete-file', {
        data: {
            fileKey: uploadedFile.key,
            orderId: orderId,
            }
        });

        console.log('response after deleting', response)
        
        setUploadedFile(null);

        setTimeout(()=>{
            setFiles(response.data.files);
        },500);        

    } catch (err) {
      console.error('Delete error:', err);
      setError('Ошибка при удалении файла');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{maxWidth:'600px'}}>

        {
            !file && (
                <>
                <h2 className="title is-size-5">Добавить файл</h2>                
                <div style={{ marginBottom: '20px' }}>
                    <input type="file" onChange={handleFileChange} 
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        ref={fileInputRef} style={{display:'none'}}/>
                    <button onClick={handleButtonClick} className="button is-link" > Выберите файл </button>        
                </div>
                </>
            )
        }

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {previewUrl && (
        <div style={{ marginBottom: '20px' }}>          
            <img src={previewUrl} alt="preview" style={{
                maxWidth:'100%',
                height:'50px',
                objectFit:'cover',
                borderRadius:'10px',
            }}/>
        </div>
      )}

      {selectedFile && (
        <button 
          onClick={handleUpload} 
          disabled={isLoading}
          className="button is-primary"
        >
          {isLoading ? 'Загрузка...' : 'Загрузить файл'}
        </button>
      )}

      {uploadedFile && (
        <div style={{ marginTop: '30px' }}>
          <a href={uploadedFile.url} target="_blank">
            <img src={docIcon}  alt="uploaded" style={{
                maxWidth:'100%',
                height:'50px',
                objectFit:'cover',
                borderRadius:'10px',
            }}/>
            <p className="is-size-7">{uploadedFile.originalName}</p>
          </a>          
          <div className="mt-4">
            {!nodelete && (
              <button 
                onClick={handleDelete} 
                disabled={isLoading}              
                className="button is-danger is-small"
              >
                {isLoading ? 'Удаление...' : 'Удалить'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;