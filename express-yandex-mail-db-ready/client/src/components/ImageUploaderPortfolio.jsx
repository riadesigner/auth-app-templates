import React, { useState, useRef } from 'react';
import axios from 'axios';
import api from '../utils/api'
import useImageUploaderForPortfoliio from './hooks/useImageUploaderForPortfolio';


export default function ImageUploaderPortfolio({ portfolioId, setImages, image = null }){
  
  const {
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
  } = useImageUploaderForPortfoliio(setImages, portfolioId, image);

  return (
    <div style={{maxWidth:'600px'}}>

        {
            !image && (
                <>
                <h2 className="title">Загрузка <br />изображения</h2>      
                <div style={{ marginBottom: '20px' }}>
                    <input type="file" onChange={handleFileChange} accept="image/*" ref={fileInputRef} style={{display:'none'}}/>
                    <button onClick={handleButtonClick} className="button is-link" > Выберите файл </button>        
                </div>
                </>
            )
        }

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {previewUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Предпросмотр:</h4>
            <img src={previewUrl} alt="preview" style={{
                maxWidth:'100%',
                height:'160px',
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
          {isLoading ? 'Загрузка...' : 'Загрузить фото'}
        </button>
      )}

      {uploadedImage && (
        <div style={{ marginTop: '30px' }}>
            <img src={uploadedImage.url}  alt="uploaded" style={{
                maxWidth:'100%',
                height:'160px',
                objectFit:'cover',
                borderRadius:'10px',
            }}/>
          <div className="mt-4">
            <button 
              onClick={handleDelete} 
              disabled={isLoading}              
              className="button is-danger is-small"
            >
              {isLoading ? 'Удаление...' : 'Удалить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};